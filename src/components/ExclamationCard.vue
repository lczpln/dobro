<template>
  <Button
    v-if="!disableFunction"
    class="flex items-center justify-center rounded-sm min-w-8 w-8 h-10 border-muted border transition-all p-0"
    :class="{
      'bg-secondary text-white hover:bg-secondary': coreStore.playerHasRedCard(playerName).value
    }"
    @click="coreStore.setPlayerRedCard(playerName)"
  >
    <AlertCircle :size="16" />
  </Button>

  <span
    v-else
    class="flex items-center justify-center rounded-sm min-w-8 w-8 h-10 border-muted border transition-all p-0 bg-secondary text-white hover:bg-secondary"
  >
    <AlertCircle :size="16" />
  </span>
</template>

<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import { useCoreStore } from '@/stores/core'
import Button from '@/components/ui/button/Button.vue'

defineProps<{
  playerName: string
  disableFunction?: boolean
}>()

const coreStore = useCoreStore()
</script>
