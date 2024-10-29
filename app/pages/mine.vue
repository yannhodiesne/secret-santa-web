<script lang="ts" setup>
const { data, refresh } = await useFetch("/api/participant");

const register = async () => {
  await $fetch("/api/participant", { method: "post" });
  await refresh();
};

const leave = async () => {
  await $fetch("/api/participant", { method: "delete" });
  await refresh();
};
</script>

<template>
  <UCard>
    <template #header>
      Mon Secret Santa
    </template>
    Registered: {{ data?.registered }}
    <UButton @click="register">Register</UButton>
    <UButton color="red" @click="leave">Leave</UButton>
  </UCard>
</template>
