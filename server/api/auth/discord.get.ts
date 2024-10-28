export default defineOAuthDiscordEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, { user });
    return sendRedirect(event, '/');
  },
  onError(event, error) {
    console.error('Discord OAuth error:', error)
    return sendRedirect(event, '/')
  },
});
