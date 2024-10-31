<script setup lang="ts">
const { data, refresh } = useFetch('/api/admin/participants');
const { data: generation } = useFetch('/api/admin/generate');

const remove = async (id: string) => {
  await $fetch(`/api/admin/participants/${id}`, { method: 'delete' });
  await refresh();
};

const removeConfirm = (username: string, id: string) => useConfirm().confirm(
  `Désinscrire ${username}`,
  `Tu es sûr.e de vouloir désinscrire ${username} ?`,
  'Oui',
  () => remove(id)
);
</script>

<template>
  <UCard>
    <template #header>
      Gestion des participants
    </template>
    <div class="grid gap-6">
      <h1 v-if="!generation?.generated">
        Les inscrits de cette année :
      </h1>
      <h1 v-else>
        Le Secret Santa a déjà été généré, il n'est plus possible de le modifier cette année.
      </h1>
      <div
        v-if="data?.length === 0"
        class="italic"
      >
        Personne (pour l'instant !)
      </div>
      <div
        v-if="!generation?.generated"
        class="w-full flex flex-row flex-wrap gap-4"
      >
        <div
          v-for="participant in data"
          :key="participant.id"
          class="flex flex-row"
        >
          <DiscordProfile
            :discord-id="participant.id"
            :username="participant.username"
            :nick="participant.nick"
            :avatar="participant.avatar ?? undefined"
            :size="64"
            :padding="2"
            class="rounded-r-none"
          />
          <UButton
            color="red"
            class="rounded-l-none"
            @click="removeConfirm(participant.username, participant.id)"
          >
            <UIcon
              name="heroicons:trash-solid"
              class="text-xl"
            />
          </UButton>
        </div>
      </div>
      <div
        v-else
        class="w-full flex flex-row flex-wrap gap-4"
      >
        <div
          v-for="participant in data"
          :key="participant.id"
          class="flex flex-row"
        >
          <DiscordProfile
            :discord-id="participant.id"
            :username="participant.username"
            :nick="participant.nick"
            :avatar="participant.avatar ?? undefined"
            :size="64"
            :padding="2"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>
