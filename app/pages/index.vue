<script lang="ts" setup>
definePageMeta({
  auth: false,
});

const { loggedIn, user, session, clear } = useUserSession();

</script>

<template>
  <div>
    <UCard v-if="loggedIn">
      <h1>{{ user?.username }}</h1>
      <br />
      <UButton icon="i-simple-line-icons-logout" @click="clear">Logout</UButton>
    </UCard>
    <UCard v-else>
      <h1>Se connecter</h1>
      <NuxtImg
        preload
        src="https://cdn.discordapp.com/embed/avatars/0.png?size=128"
        width="128"
        height="128"
        class="rounded-full"
      />
      <UButton
        to="/api/auth/discord"
        icon="i-simple-line-icons-login"
        external
        class="dark:text-white bg-[#5865f2] dark:bg-[#5865f2] hover:bg-[#3949f0] hover:dark:bg-[#3949f0]"
      >
        Se connecter avec Discord
      </UButton>
    </UCard>
  </div>
</template>
