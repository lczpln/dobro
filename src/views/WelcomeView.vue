<template>
  <div
    class="flex flex-col items-center justify-between min-h-dvh py-12 px-4 sm:px-6 lg:px-8 dobro-bg bg-secondary bg-contain bg-no-repeat bg-center"
  >
    <Button
      class="fixed bottom-[15%] md:bottom-[50%] md:translate-y-1/2 h-20 w-20 box-shadow-ping"
      @click="coreStore.setStep('new-game-players')"
    >
      <ArrowRightCircle :size="200" />
    </Button>
    <footer class="fixed bottom-4 text-center text-sm text-muted">
      Dobro é um jogo da editora ©
      <a class="underline" href="https://grokgames.com.br/" target="_blank">Grok Games</a>.
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import DobroBgAsset from '@/assets/dobro.png'
import { useCoreStore } from '@/stores/core'
import { ArrowRightCircle } from 'lucide-vue-next'

const coreStore = useCoreStore()
const dobroBg = computed(() => `url(${DobroBgAsset})`)
</script>

<style scoped>
.dobro-bg {
  background-image: v-bind(dobroBg);
}
</style>
