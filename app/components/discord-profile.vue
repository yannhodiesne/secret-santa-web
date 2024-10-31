<script lang="ts" setup>
const props = defineProps<{
  discordId: string;
  username: string;
  nick: string | null;
  avatar?: string;
  size?: number;
  padding?: number;
  textSmall?: boolean;
}>();

const normalizedSize = props.size ? 1 << 31 - Math.clz32(props.size) : 128;

const avatarUrl = (
  props.discordId && props.avatar
    ? `https://cdn.discordapp.com/avatars/${props.discordId}/${props.avatar}.png?size=${normalizedSize}`
    : `https://cdn.discordapp.com/embed/avatars/0.png?size=${normalizedSize}`
);
</script>

<template>
  <div
    class="w-fit bg-[#5865f2] rounded-xl text-white flex items-center shadow-sm shadow-black"
    :class="`py-${padding ?? 4} px-${(padding ?? 4) * 2}`"
  >
    <NuxtImg
      preload
      :src="avatarUrl"
      :width="size ?? 128"
      :height="size ?? 128"
      class="rounded-full shadow-sm shadow-black bg-slate-50"
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
