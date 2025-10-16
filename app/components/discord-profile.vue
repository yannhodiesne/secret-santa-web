<script lang="ts" setup>
const props = defineProps<{
  discordId: string;
  username: string;
  nick: string | null;
  avatar?: string;
  size?: number;
  textSmall?: boolean;
}>();

const normalizedSize = props.size ? 1 << 31 - Math.clz32(props.size * 2) : 128;

const defaultUrl = `https://cdn.discordapp.com/embed/avatars/0.png?size=${normalizedSize * 2}`;

const fetchError = ref<boolean>(false);

const avatarUrl = computed(() => !fetchError.value && props.discordId && props.avatar
  ? `https://cdn.discordapp.com/avatars/${props.discordId}/${props.avatar}.webp?size=${normalizedSize * 2}`
  : defaultUrl
);
</script>

<template>
  <div
    class="w-fit bg-[#5865f2] rounded-xl text-white flex items-center shadow-sm shadow-black py-4 px-8"
  >
    <NuxtImg
      preload
      :src="avatarUrl"
      :width="size ?? 128"
      :height="size ?? 128"
      class="rounded-full shadow-sm shadow-black bg-slate-50"
      @error="fetchError = true"
    />
    <div class="flex flex-col pl-4">
      <div :class="textSmall ? 'text-md' : 'text-lg'">
        {{ nick ?? username }}
      </div>
      <div
        v-if="nick"
        class="italic"
        :class="textSmall ? 'text-sm' : 'text-sm'"
      >
        {{ username }}
      </div>
    </div>
  </div>
</template>
