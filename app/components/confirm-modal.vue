<script lang="ts" setup>
const { confirming, params } = useConfirm();
</script>

<template>
  <UModal
    v-model="confirming"
    :ui="{ width: 'sm:max-w-sm' }"
  >
    <UCard>
      <div class="font-semibold mb-2">
        {{ params.title }}
      </div>
      <div>
        {{ params.message }}
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <u-button
            color="white"
            @click="confirming = false"
          >
            Annuler
          </u-button>
          <u-button
            color="red"
            variant="solid"
            @click="params.action"
          >
            {{ params.label }}
          </u-button>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
