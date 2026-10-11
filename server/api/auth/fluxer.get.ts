import { randomBytes } from 'node:crypto';

export default eventHandler(async (event) => {
  const { adminIds, guildId, fluxerApiUrl, fluxer } = useRuntimeConfig(event);
  const { clientId, clientSecret } = fluxer;

  const query = getQuery(event);
  if (!clientId || !clientSecret || query.error) {
    return sendRedirect(event, '/');
  }

  const requestURL = getRequestURL(event);
  const redirectUrl = `${requestURL.protocol}//${requestURL.host}${requestURL.pathname}`;

  const state = getCookie(event, 'nuxt-auth-state');
  if (!query.code) {
    const newState = randomBytes(32).toString('base64url');
    setCookie(event, 'nuxt-auth-state', newState, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 10,
      path: '/'
    });
    return sendRedirect(event, `${fluxerApiUrl}/oauth2/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUrl,
      scope: 'identify guilds',
      state: newState
    })}`);
  }

  if (!state || query.state !== state) {
    console.error('Fluxer OAuth: state mismatch, dropping the auth request');
    deleteCookie(event, 'nuxt-auth-state', { path: '/' });
    return sendRedirect(event, '/');
  }
  deleteCookie(event, 'nuxt-auth-state', { path: '/' });

  const tokens = await $fetch<{ access_token: string; error?: string; code?: string }>(
    `${fluxerApiUrl}/oauth2/token`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: query.code as string,
        redirect_uri: redirectUrl,
        client_id: clientId,
        client_secret: clientSecret
      }).toString()
    }
  ).catch((error) => error.data);

  // Fluxer errors use either `error` (standard) or `code` (instance format)
  if (!tokens || !tokens.access_token || 'error' in tokens || 'code' in tokens) {
    console.error('Fluxer OAuth: token exchange failed', tokens);
    return sendRedirect(event, '/');
  }

  try {
    const headers = {
      'user-agent': 'Secret Santa Web',
      authorization: `Bearer ${tokens.access_token}`
    };
    const [user, guilds] = await Promise.all([
      $fetch<{
        id: string;
        username: string;
        global_name?: string | null;
        avatar?: string | null
      }>(`${fluxerApiUrl}/oauth2/userinfo`, { headers }),
      $fetch<Array<{ id: string }>>(`${fluxerApiUrl}/users/@me/guilds`, { headers })
    ]);

    // The guild member endpoint rejects OAuth2 bearers, so membership is
    // checked with the guild list from the `guilds` scope
    if (!guilds.some(g => g.id === guildId)) {
      console.error('Fluxer OAuth: user is not a member of the guild', guildId, guilds.map(g => g.id));
      return sendRedirect(event, '/');
    }

    const db = useDB(event);

    await Promise.all([
      setUserSession(event,
        {
          user: {
            id: user.id,
            username: user.username,
            avatar: user.avatar ?? '',
            nick: user.global_name ?? null,
            role: adminIds.split(',').includes(user.id) ? 'admin' : 'user'
          }
        }),
      db.update(tables.users).set({
        nick: user.global_name ?? null,
        avatar: user.avatar ?? null
      }).where(eq(tables.users.fluxerId, user.id))
    ]);

    return sendRedirect(event, '/mine');
  }
  catch (error) {
    // Redirect without creating a user session
    console.error('Fluxer OAuth error:', error);
    return sendRedirect(event, '/');
  }
});
