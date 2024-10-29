<script setup lang="ts">
const colorMode = useColorMode();
const toggleColorMode = ref(colorMode.value === "dark");

watch(colorMode, () => {
  toggleColorMode.value = colorMode.value === "dark";
});

watch(toggleColorMode, () => {
  colorMode.preference = toggleColorMode.value ? "dark" : "light";
});

useHead({
  htmlAttrs: { lang: "fr" },
  link: [{ rel: 'icon', href: '/self.jpeg' }],
  title: "Secret Santa 🎅 ✨"
});

useSeoMeta({
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  title: 'Secret Santa 🎅 ✨',
  ogTitle: 'Secret Santa 🎅 ✨',
  ogImage: '/self.jpeg',
  twitterImage: '/self.jpeg',
  twitterCard: 'summary'
});

const { loggedIn, user } = useUserSession();

const firstLink = computed(() => loggedIn && user.value !== null ? {
  label: user.value.username,
  avatar: {
    src: `https://cdn.discordapp.com/avatars/${user.value.id}/${user.value.avatar}.png?size=32`
  },
  to: '/'
} : {
  label: 'Se connecter',
  icon: 'i-simple-icons-discord',
  to: '/',
  badge: 1,
});

const links = computed(() => [firstLink.value,
  {
    label: 'Mon Secret Santa',
    icon: 'twemoji:wrapped-gift',
    to: '/mine'
  }
]);
</script>

<template>
  <div>
    <UContainer>
      <UCard class="mt-10">
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <UAvatar
              src="/self.jpeg"
            />
            <h1>Secret Santa</h1>
            <UIcon name="i-twemoji-santa-claus" />
            <UIcon name="twemoji-sparkles" />
          </div>
            <div class="flex gap-2 items-center">
            <ColorScheme>
              <UIcon name="i-twemoji-sun" />
              <UToggle v-model="toggleColorMode" />
              <UIcon name="i-twemoji-new-moon" />
            </ColorScheme>
          </div>
        </div>
      </UCard>

      <div class="mt-4 grid gap-4 grid-cols-[auto_1fr]">
        <UCard class="h-fit" :ui="{
          body: {
            padding: 'p-2 sm:p-2'
          }
        }">
          <UVerticalNavigation :links />
        </UCard>
        <NuxtPage />
      </div>
    </UContainer>
    <UNotifications />
  </div>
</template>

<style lang="postcss">
body {
  @apply font-sans text-gray-950 bg-gray-50 dark:bg-gray-950 dark:text-gray-50;
}
</style>
