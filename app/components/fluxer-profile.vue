<script lang="ts" setup>
const props = defineProps<{
  fluxerId: string;
  avatar?: string | null;
  username: string;
  nick: string | null;
  size?: number;
  textSmall?: boolean;
}>();

const { fluxerMediaUrl } = useRuntimeConfig().public;

const normalizedSize = props.size ? 1 << 31 - Math.clz32(props.size * 2) : 128;

const defaultUrl = '/fluxer.svg';

const fetchError = ref<boolean>(false);

const avatarUrl = computed(() => !fetchError.value && props.fluxerId && props.avatar
  ? `${fluxerMediaUrl}/avatars/${props.fluxerId}/${props.avatar}.webp?size=${normalizedSize * 2}`
  : defaultUrl
);
</script>

<template>
  <div
    class="w-fit bg-[#4641D9] rounded-xl text-white flex items-center shadow-sm shadow-black py-4 px-8"
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
