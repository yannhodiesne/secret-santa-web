<script lang="ts" setup>
const { data, refresh, status } = await useFetch('/api/participant');

const register = async () => {
  await $fetch('/api/participant', { method: 'post' });
  await refresh();
};

const leave = async () => {
  await $fetch('/api/participant', { method: 'delete' });
  await refresh();
};
</script>

<template>
  <UCard>
    <div class="mx-auto w-fit">
      <UButton
        v-if="data?.registered"
        icon="heroicons:x-circle-16-solid"
        color="red"
        @click="leave"
      >
        Se désinscrire
      </UButton>
      <UButton
        v-else
        icon="heroicons:check-circle-16-solid"
        @click="register"
      >
        S'inscrire
      </UButton>
    </div>

    <UTable
      :columns="[{ key: 'avatar', class: $style.avatar }, { key: 'username', direction: 'asc' }]"
      :rows="data?.list"
      :loading="status === 'pending'"
      :empty-state="{ label: 'Aucun inscrit', icon: 'heroicons:user' }"
    >
      <template #avatar-data="{ row }">
        <UAvatar :src="`https://cdn.discordapp.com/avatars/${row.id}/${row.avatar}.png?size=32`" />
      </template>
    </UTable>
  </UCard>
</template>

<style lang="postcss" module>
.avatar {
  @apply w-0;
}
</style>
