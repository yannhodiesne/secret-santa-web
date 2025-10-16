<script lang="ts" setup>
const { data, refresh } = await useFetch('/api/participant');

const toast = useToast();

const register = async () => {
  await $fetch('/api/participant', { method: 'post' });
  await refresh();

  toast.add({
    id: 'self_register',
    description: 'Tu es maintenant inscrit.e au Secret Santa de cette année 🎅🎉',
    color: 'success',
    avatar: { src: '/logo.webp' },
    duration: 10000
  });
};

const leave = async () => {
  await $fetch('/api/participant', { method: 'delete' });
  await refresh();

  toast.add({
    id: 'self_leave',
    description: 'Tu as bien été désinscrit.e du Secret Santa 😢',
    avatar: { src: '/logo.webp' },
    duration: 10000
  });
};

const confirmLeave = () => useConfirm().confirm(
  'Se désinscrire',
  'Tu es sûr.e de vouloir te désinscrire ?',
  'Me désinscrire',
  leave
);

const isBlurred = ref(true);
const reveal = (event: MouseEvent) => {
  isBlurred.value = !isBlurred.value;

  if (isBlurred.value)
    return;

  setTimeout(() => useConfetti({
    particleCount: 100,
    spread: 70,
    origin: { x: event.pageX / window.innerWidth, y: event.pageY / window.innerHeight }
  }), 500);
};
</script>

<template>
  <UCard>
    <template #header>
      Secret Santa {{ new Date().getFullYear() }}
    </template>
    <div class="grid gap-6">
      <div v-if="!data?.generated">
        <USeparator
          v-if="data?.registered"
        >
          <UButton
            class="mx-auto"
            icon="heroicons:x-circle-16-solid"
            color="error"
            @click="confirmLeave"
          >
            Se désinscrire
          </UButton>
        </USeparator>
        <div
          v-else
          class="flex flex-col items-center gap-3"
        >
          <div class="italic text-md">
            Les inscriptions sont encore ouvertes !
          </div>
          <UButton
            icon="heroicons:check-circle-16-solid"
            @click="register"
          >
            S'inscrire
          </UButton>
        </div>
      </div>

      <USeparator v-if="!data?.registered" />

      <div
        v-if="data?.registered"
        class="grid gap-6"
      >
        <div
          v-if="!data?.generated"
          class="text-center italic"
        >
          Les résultats ne sont pas encore là, reviens plus tard !
        </div>
        <div
          v-else
          class="text-center"
        >
          Tu es le Secret Santa de ...
        </div>
        <DiscordProfile
          v-if="!data?.generated"
          class="mx-auto blur-md"
          discord-id=""
          username="Senior"
          nick="Le best"
        />
        <DiscordProfile
          v-else-if="data.recipient"
          class="mx-auto cursor-pointer transition-all ease-in-out duration-700"
          :class="{ 'blur-md': isBlurred }"
          :discord-id="data.recipient?.id"
          :username="data.recipient?.username"
          :nick="data.recipient.nick"
          :avatar="data.recipient?.avatar ?? undefined"
          @click="reveal"
        />

        <USeparator />
      </div>

      <h1>Les inscrits de cette année :</h1>
      <div
        v-if="data?.list.length === 0"
        class="italic flex flex-col items-center"
      >
        Personne, pour l'instant !
      </div>
      <div class="w-full gap-4 grid grid-cols-1 md:flex md:flex-row md:flex-wrap">
        <DiscordProfile
          v-for="participant in data?.list"
          :key="participant.id"
          class="mx-auto md:mx-0"
          :discord-id="participant.id"
          :username="participant.username"
          :nick="participant.nick"
          :avatar="participant.avatar ?? undefined"
          :size="64"
        />
      </div>
    </div>
  </UCard>
</template>
