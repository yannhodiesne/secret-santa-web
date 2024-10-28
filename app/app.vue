<script setup lang="ts">
const { loggedIn, user } = useUserSession();
const colorMode = useColorMode();
const selectedColorMode = colorMode.value;
const toggleColorMode = ref(selectedColorMode === "dark");

watch(toggleColorMode, () => {
  colorMode.preference = toggleColorMode.value ? "dark" : "light";
});

const firstLink = computed(() => loggedIn && user.value !== null ? {
  label: user.value.username,
  avatar: {
    src: `https://cdn.discordapp.com/avatars/${user.value.id}/${user.value.avatar}.png`
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
            <UIcon name="i-twemoji-santa-claus" />
            <h1>Secret Santa</h1>
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
