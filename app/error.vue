<script setup lang="ts">
if (!import.meta.dev) {
  clearError({ redirect: '/' });
}

const error = useError();
</script>

<template>
  <div>{{ error?.message }}</div>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="error?.stack" />
  <UButton @click="clearError({ redirect: '/' })">
    Retour
  </UButton>
</template>
