export default defineOAuthDiscordEventHandler({
  config: {
    scope: ['identify', 'guilds.members.read']
  },
  async onSuccess(event, { user, tokens }) {
    const { adminIds, guildId } = useRuntimeConfig(event);

    try {
      const result = await $fetch<{
        pending: boolean;
        flags: number;
        nick: string | undefined;
      }>(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
        headers: {
          'user-agent': 'Secret Santa Web guild membership check',
          'Authorization': `Bearer ${tokens.access_token}`
        }
      });

      if (result.pending || result.flags & 1 << 4)
        throw 'Pending or guest';

      const db = useDB(event);

      await Promise.all([
        setUserSession(event,
          {
            user: {
              id: user.id,
              username: user.username,
              avatar: user.avatar,
              nick: result.nick ?? user.global_name ?? null,
              role: adminIds.split(',').includes(user.id) ? 'admin' : 'user'
            }
          }),
        db.update(tables.users).set({ nick: result.nick ?? user.global_name ?? null }).where(eq(tables.users.discordId, user.id))
      ]);

      return sendRedirect(event, '/');
    }
    catch {
      // Redirect without creating a user session
      return sendRedirect(event, '/');
    }
  },
  onError(event, error) {
    console.error('Discord OAuth error:', error);
    return sendRedirect(event, '/');
  }
});
