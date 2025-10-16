<script setup lang="ts">
const { data: participants } = useFetch('/api/admin/participants');
const { data, refresh } = useFetch('/api/admin/conflicts');

type ExtractArrayType<T> = T extends Array<infer U> ? U : never;
type Constraint = ExtractArrayType<typeof data.value>;

const toast = useToast();

const firstSelected = ref();
const secondSelected = ref();

const selectables = computed(() => participants.value?.map(p => ({
  id: p.id,
  label: p.nick ?? p.username,
  avatar: { src: `https://cdn.discordapp.com/avatars/${p.id}/${p.avatar}.webp?size=32` }
})));

const add = async () => {
  await $fetch('/api/admin/conflicts', {
    body: {
      firstUser: firstSelected.value.id,
      secondUser: secondSelected.value.id
    },
    method: 'post'
  });

  await refresh();

  toast.add({
    id: `add_constraint_${firstSelected.value.id}_${secondSelected.value.id}`,
    description: `La contrainte pour ${firstSelected.value.label} et ${secondSelected.value.label} a bien été ajoutée`,
    color: 'success',
    avatar: { src: '/logo.webp' },
    duration: 10000
  });
};

const remove = async (firstId: string, secondId: string) => {
  await $fetch('/api/admin/conflicts', {
    body: {
      firstUser: firstId,
      secondUser: secondId
    },
    method: 'delete'
  });

  await refresh();

  toast.add({
    id: `remove_constraint_${firstSelected.value.id}_${secondSelected.value.id}`,
    description: `La contrainte pour ${firstSelected.value.label} et ${secondSelected.value.label} a bien été supprimée`,
    color: 'error',
    avatar: { src: '/logo.webp' },
    duration: 10000
  });
};

const removeConfirm = (constraint: Constraint) => useConfirm().confirm(
  `Supprimer la contrainte`,
  `Tu es sûr.e de vouloir supprimer la contrainte pour ${constraint.firstUser.nick ?? constraint.firstUser.username} et ${constraint.secondUser.nick ?? constraint.secondUser.username} ?`,
  'Oui',
  () => remove(constraint.firstUser.id, constraint.secondUser.id)
);

const columns = [
  {
    header: 'Participant 1',
    id: 'first',
    meta: {
      class: { td: 'text-right' }
    }
  },
  {
    header: 'Participant 2',
    id: 'second'
  },
  {
    header: '',
    id: 'action',
    meta: {
      class: { td: 'w-0' }
    }
  }
];
</script>

<template>
  <UCard>
    <template #header>
      Gestion des contraintes
    </template>
    <div class="grid gap-4">
      Nouvelle contrainte
      <div class="grid grid-cols-[1fr_1fr_auto] gap-8">
        <USelectMenu
          v-model="firstSelected"
          :items="selectables"
          searchable
          searchable-placeholder="Rechercher..."
        >
          <template #leading>
            <UAvatar
              v-if="firstSelected"
              :src="firstSelected?.avatar?.src"
              size="2xs"
            />
            <span v-else />
          </template>
        </USelectMenu>
        <USelectMenu
          v-model="secondSelected"
          :items="selectables"
          searchable
          searchable-placeholder="Rechercher..."
        >
          <template #leading>
            <UAvatar
              v-if="secondSelected"
              :src="secondSelected?.avatar?.src"
              size="2xs"
            />
            <span v-else />
          </template>
        </USelectMenu>
        <UButton
          :disabled="!firstSelected || !secondSelected || firstSelected.id == secondSelected.id"
          @click="add"
        >
          Ajouter
        </UButton>
      </div>
      <USeparator />
      <UTable
        :data="data"
        :columns
        :empty-state="{ icon: 'heroicons:document-solid', label: 'Aucune contrainte' }"
      >
        <template #first-cell="{ row }">
          <DiscordProfile
            :discord-id="row.original.firstUser.id"
            :username="row.original.firstUser.username"
            :nick="row.original.firstUser.nick"
            :avatar="row.original.firstUser.avatar ?? undefined"
            :size="32"
            text-small
            class="ml-auto"
          />
        </template>
        <template #second-cell="{ row }">
          <DiscordProfile
            :discord-id="row.original.secondUser.id"
            :username="row.original.secondUser.username"
            :nick="row.original.secondUser.nick"
            :avatar="row.original.secondUser.avatar ?? undefined"
            :size="32"
            text-small
          />
        </template>
        <template #action-cell="{ row }">
          <UButton
            color="error"
            @click="removeConfirm(row.original)"
          >
            <UIcon
              name="heroicons:trash-solid"
              class="text-xl"
            />
          </UButton>
        </template>
      </UTable>
    </div>
  </UCard>
</template>
