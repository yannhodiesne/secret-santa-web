export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.auth === false)
    return;

  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    return navigateTo('/');
  }
});
