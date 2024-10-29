export default defineOAuthDiscordEventHandler({
  async onSuccess(event, { user }) {
    const { adminIds } = useRuntimeConfig(event);

    await setUserSession(event,
    {
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        role: adminIds.split(',').includes(user.id) ? 'admin' : 'user'
      }
    });

    return sendRedirect(event, '/');
  },
  onError(event, error) {
    console.error('Discord OAuth error:', error)
    return sendRedirect(event, '/')
  },
});
