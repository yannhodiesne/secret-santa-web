<script setup lang="ts">
const { data, refresh } = useFetch('/api/admin/generate');

const toast = useToast();

const generate = async () => {
  try {
    await $fetch('/api/admin/generate', { method: 'post' });
    await refresh();

    toast.add({
      id: `generate`,
      description: `Le Secret Santa ${new Date().getFullYear()} a bien été généré !`,
      color: 'green',
      avatar: { src: '/logo.webp' },
      timeout: 10000
    });
  }
  catch {
    toast.add({
      id: `generate_error`,
      title: 'Une erreur est survenue',
      description: `Impossible de générer le Secret Santa, veuillez retirer des contraintes de génération.`,
      color: 'red',
      avatar: { src: '/logo.webp' },
      timeout: 10000
    });
  }
};

const confirmGenerate = () => useConfirm().confirm(
  `Générer le Secret Santa`,
  `Les participants ne pourront plus s'incrire ou quitter le Secret Santa.\nTu es sûr.e de vouloir générer le Secret Santa ${new Date().getFullYear()} ?`,
  'Oui',
  generate
);

const copyLink = async () => {
  const url = useRequestURL();

  await navigator.clipboard.writeText(url.origin);

  toast.add({
    id: 'copy',
    description: 'Le lien a été copié dans ton presse-papier',
    color: 'green',
    avatar: { src: '/logo.webp' },
    timeout: 10000
  });
};
</script>

<template>
  <UCard>
    <template #header>
      Génération
    </template>
    <div class="w-fit flex flex-row gap-2 mx-auto">
      État du Secret Santa :
      <UBadge
        v-if="data?.error"
        color="red"
        size="md"
      >
        Erreur interne
      </UBadge>
      <UBadge
        v-else-if="data?.generated"
        color="green"
        size="md"
      >
        Généré et prêt à être partagé
      </UBadge>
      <UBadge
        v-else
        color="amber"
        size="md"
      >
        En attente de génération
      </UBadge>
    </div>
    <template #footer>
      <div class="w-fit flex flex-row gap-4 mx-auto">
        <UButton
          icon="heroicons:link"
          @click="copyLink"
        >
          Copier le lien de partage
        </UButton>
        <UButton
          v-if="!data?.generated"
          icon="heroicons:cog"
          color="green"
          @click="confirmGenerate"
        >
          Lancer la génération
        </UButton>
      </div>
    </template>
  </UCard>
</template>
