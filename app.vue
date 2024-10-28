<script setup lang="ts">
const colorMode = useColorMode();
const selectedColorMode = colorMode.value;
const toggleColorMode = ref(selectedColorMode === "dark");

watch(toggleColorMode, () => {
  colorMode.preference = toggleColorMode.value ? "dark" : "light";
});

const links = [{
    label: 'Mon profil',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 1,
    to: '/'
  },
  {
    label: 'Mes Secret Santa',
    icon: 'twemoji:wrapped-gift',
    to: '/secret-santa'
  }
];
</script>

<template>
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
      <UCard :ui="{
        body: {
          padding: 'p-2 sm:p-2'
        }
      }">
        <UVerticalNavigation :links="links" />
      </UCard>
      <NuxtPage />
    </div>
  </UContainer>
</template>
