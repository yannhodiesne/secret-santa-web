<script setup lang="ts">
const colorMode = useColorMode();
const selectedColorMode = colorMode.value;
const toggleColorMode = ref(selectedColorMode === "dark");

watch(toggleColorMode, () => {
  colorMode.preference = toggleColorMode.value ? "dark" : "light";
});
</script>

<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
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
              <UIcon name="i-twemoji-waning-crescent-moon" />
            </ColorScheme>
          </div>
        </div>
      </template>

      <NuxtPage />

      <template #footer>
        <UButton icon="i-heroicons-book-open" to="https://ui.nuxt.com" target="_blank">Open Nuxt UI Documentation</UButton>
      </template>
    </UCard>
  </UContainer>
</template>
