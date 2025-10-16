<script lang="ts" setup>
const { confirming, params } = useConfirm();

const lines = computed(() => params.value.message.split('\n'));
</script>

<template>
  <UModal
    v-model:open="confirming"
  >
    <template #content>
      <UCard>
        <div class="font-semibold mb-2">
          {{ params.title }}
        </div>
        <div
          v-for="line in lines"
          :key="line"
          class="pt-2"
        >
          {{ line }}
        </div>
        <template #footer>
          <div class="flex justify-end space-x-2">
            <u-button
              color="neutral"
              @click="confirming = false"
            >
              Annuler
            </u-button>
            <u-button
              color="error"
              variant="solid"
              @click="params.action"
            >
              {{ params.label }}
            </u-button>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
