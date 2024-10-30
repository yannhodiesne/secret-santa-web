<script lang="ts" setup>
const { data, refresh } = await useFetch('/api/participant');

const { user } = useUserSession();
const toast = useToast();

const register = async () => {
  await $fetch('/api/participant', { method: 'post' });
  await refresh();

  toast.add({
    id: 'self_register',
    description: 'Tu es maintenant inscrit au Secret Santa de cette année 🎅🎉',
    color: 'green',
    avatar: { src: '/self.jpeg' },
    timeout: 10000
  });
};

const leave = async () => {
  await $fetch('/api/participant', { method: 'delete' });
  await refresh();

  toast.add({
    id: 'self_leave',
    description: 'Tu as bien été désinscrit du Secret Santa 😢',
    avatar: { src: '/self.jpeg' },
    timeout: 10000
  });
};

const confirmLeave = () => useConfirm().confirm(
  'Se désinscrire',
  'Tu es sûr.e de vouloir te désinscrire du Secret Santa de cette année ?',
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
      <UIcon name="i-twemoji-santa-claus" /> Secret Santa {{ new Date().getFullYear() }}
    </template>
    <div class="grid gap-6">
      <div v-if="!data?.generated">
        <div
          v-if="data?.registered"
          class="flex flex-row items-center gap-3"
        >
          <UButton
            icon="heroicons:x-circle-16-solid"
            color="red"
            @click="confirmLeave"
          >
            Se désinscrire
          </UButton>
        </div>
        <div
          v-else
          class="flex flex-row items-center gap-3"
        >
          <UButton
            icon="heroicons:check-circle-16-solid"
            @click="register"
          >
            S'inscrire
          </UButton>
          <div>Les inscriptions sont encore ouvertes !</div>
        </div>
      </div>

      <UDivider v-if="!data?.generated" />

      <div
        v-if="data?.registered"
        class="grid gap-6"
      >
        <div
          v-if="!data?.generated"
          class="text-center"
        >
          Reviens plus tard pour savoir de qui tu es le Secret Santa !
        </div>
        <div
          v-else
          class="text-center"
        >
          Tu es le Secret Santa de ...
        </div>
        <div
          v-if="!data?.generated"
          class="blur-md"
        >
          <div class="w-full text-center text-lg size-10">
            Senior !!!
          </div>
          <NuxtImg
            preload
            src="https://cdn.discordapp.com/embed/avatars/0.png?size=128"
            width="128"
            height="128"
            class="rounded-full mx-auto"
          />
        </div>
        <div
          v-else
          :class="{ 'blur-md': isBlurred }"
          class="w-fit mx-auto cursor-pointer transition-all ease-in-out duration-700"
          @click="reveal"
        >
          <div class="w-full text-center text-lg size-10">
            {{ data.recipient?.username }}
          </div>
          <NuxtImg
            preload
            :src="`https://cdn.discordapp.com/avatars/${data.recipient?.id}/${data.recipient?.avatar}.png?size=128`"
            width="128"
            height="128"
            class="rounded-full mx-auto"
          />
        </div>

        <UDivider />
      </div>

      <h1>Les inscrits de cette année :</h1>
      <div
        v-if="data?.list.length === 0"
        class="italic"
      >
        Personne (pour l'instant !)
      </div>
      <div class="w-full flex flex-row flex-wrap">
        <UBadge
          v-for="participant in data?.list"
          :key="participant.id"
          :ui="{ rounded: 'rounded-full' }"
          :color="user?.id === participant.id ? 'amber' : 'emerald'"
        >
          <UAvatar :src="`https://cdn.discordapp.com/avatars/${participant.id}/${participant.avatar}.png?size=32`" />
          <div class="mx-2 text-sm">
            {{ participant.username }}
          </div>
        </UBadge>
      </div>
    </div>
  </UCard>
</template>
