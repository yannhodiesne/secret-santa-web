<script setup lang="ts">
const colorMode = useColorMode();
const toggleColorMode = ref(colorMode.value === 'dark');

watch(colorMode, () => {
  toggleColorMode.value = colorMode.value === 'dark';
});

watch(toggleColorMode, () => {
  colorMode.preference = toggleColorMode.value ? 'dark' : 'light';
});

useHead({
  htmlAttrs: { lang: 'fr' },
  link: [{ rel: 'icon', href: '/logo.webp' }],
  title: 'Secret Santa 🎅 ✨'
});

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  title: 'Secret Santa 🎅 ✨',
  ogTitle: 'Secret Santa 🎅 ✨',
  ogImage: '/logo.webp',
  twitterImage: '/logo.webp',
  twitterCard: 'summary'
});

const { loggedIn, user } = useUserSession();
const { isMobile } = useDevice();

const links = [
  [
    ...(loggedIn && !!user.value
      ? [{
          label: user.value.username,
          avatar: {
            src: `https://cdn.discordapp.com/avatars/${user.value.id}/${user.value.avatar}.webp?size=32`
          },
          to: '/'
        }]
      : []),
    ...(!loggedIn || !user.value
      ? [{
          label: 'Se connecter',
          icon: 'i-simple-icons-discord',
          to: '/',
          badge: 1
        }]
      : []),
    {
      label: 'Mon Secret Santa',
      icon: 'twemoji:wrapped-gift',
      to: '/mine'
    }
  ],
  (loggedIn && user.value?.role === 'admin' && !isMobile
    ? [
        {
          label: 'Participants',
          icon: 'heroicons:user-circle-solid',
          to: '/admin/participants'
        },
        {
          label: 'Contraintes',
          icon: 'heroicons:document-minus-solid',
          to: '/admin/constraints'
        },
        {
          label: 'Génération',
          icon: 'heroicons:arrow-path-rounded-square',
          to: '/admin/generate'
        }
      ]
    : [])
];
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <ConfirmModal />
    <UContainer class="grid gap-2">
      <div class="mt-10">
        <div class="flex justify-between">
          <div class="flex gap-5 items-center">
            <UAvatar
              src="/logo.webp"
              size="3xl"
            />
            <div class="flex flex-row gap-3 mr-4 items-center">
              <h1 :class="$style.title">
                Secret Santa
              </h1>
              <div class="text-3xl flex gap-2">
                <UIcon name="i-twemoji-santa-claus" />
                <UIcon name="twemoji-sparkles" />
              </div>
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <ColorScheme>
              <template #placeholder>
                <UToggle
                  loading
                  size="xl"
                />
              </template>
              <UToggle
                v-model="toggleColorMode"
                off-icon="twemoji:sun"
                on-icon="twemoji:first-quarter-moon"
                size="xl"
              />
            </ColorScheme>
          </div>
        </div>
      </div>
      <UDivider />
      <UHorizontalNavigation
        class="mx-auto mb-2"
        :links
      />
      <NuxtPage />
    </UContainer>
    <UNotifications />
  </div>
</template>

<style lang="postcss">
body {
  @apply text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

<style lang="postcss" module>
.title {
  @apply text-4xl;
  font-family: 'Henny Penny';
}
</style>
