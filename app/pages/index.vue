<script lang="ts" setup>
definePageMeta({
  auth: false
});

const { loggedIn, user, clear } = useUserSession();
</script>

<template>
  <div>
    <UCard v-if="loggedIn && user">
      <template #header>
        Mon profil
      </template>
      <DiscordProfile
        class="mx-auto"
        :discord-id="user.id"
        :username="user.username"
        :nick="user.nick"
        :avatar="user.avatar"
      />
      <template #footer>
        <div class="grid grid-flow-col gap-4 justify-center">
          <UButton
            icon="i-twemoji-santa-claus"
            color="white"
            to="/mine"
          >
            Voir le Secret Santa
          </UButton>
          <UButton
            icon="i-simple-line-icons-logout"
            class="dark:text-white bg-[#5865f2] dark:bg-[#5865f2] hover:bg-[#3949f0] hover:dark:bg-[#3949f0]"
            @click="clear"
          >
            Se déconnecter
          </UButton>
        </div>
      </template>
    </UCard>
    <UCard v-else>
      <template #header>
        Se connecter
      </template>
      <NuxtImg
        preload
        src="https://cdn.discordapp.com/embed/avatars/0.png?size=128"
        width="128"
        height="128"
        class="rounded-full mx-auto"
      />
      <template #footer>
        <div class="grid justify-center">
          <UButton
            to="/api/auth/discord"
            icon="i-simple-line-icons-login"
            external
            class="dark:text-white bg-[#5865f2] dark:bg-[#5865f2] hover:bg-[#3949f0] hover:dark:bg-[#3949f0]"
          >
            Se connecter avec Discord
          </UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>
