<script lang="ts" setup>
const { data, refresh } = await useFetch('/api/participant');

const { data: list, refresh: refreshList } = await useFetch('/api/participant/list');

const register = async () => {
  await $fetch('/api/participant', { method: 'post' });
  await Promise.all([refresh(), refreshList()]);
};

const leave = async () => {
  await $fetch('/api/participant', { method: 'delete' });
  await Promise.all([refresh(), refreshList()]);
};
</script>

<template>
  <UCard>
    Registered: {{ data?.registered }}
    <UButton @click="register">
      Register
    </UButton>
    <UButton
      color="red"
      @click="leave"
    >
      Leave
    </UButton>
    <template #footer>
      {{ list }}
    </template>
  </UCard>
</template>
