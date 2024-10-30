export default defineNuxtRouteMiddleware((to) => {
  if (to.meta.auth === false)
    return;

  const { loggedIn } = useUserSession();

  if (!loggedIn.value) {
    const toast = useToast();
    toast.add({
      id: 'must_login',
      title: 'Attends un peu !',
      description: 'Connecte toi avec ton compte Discord pour participer au Secret Santa',
      color: 'red',
      avatar: { src: '/self.jpeg' },
      timeout: 10000
    });

    return navigateTo('/');
  }
});
