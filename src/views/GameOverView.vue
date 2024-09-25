<template>
  <PageWrapper>
    <ContentWrapper>
      <PageTitle>Resultados</PageTitle>

      <PlayerList :list="coreStore.playersSortedByScore">
        <template #default="{ player, index }">
          <div class="flex items-center gap-8">
            <div class="flex gap-2 items-center w-12">
              <ExclamationCard :player-name="player.name" disable-function />
              <span class="text-xl font-bold">{{ player.totalRedCards }}</span>
            </div>

            <div class="flex gap-2 items-center justify-end w-12">
              <Medal
                class="flex items-center justify-center w-6"
                :class="winnersDecoration(index).value"
              />
              <span class="block text-xl text-center font-bold w-6">{{ player.totalScore }}</span>
            </div>
          </div>
        </template>
      </PlayerList>

      <Button
        @click="coreStore.newGame()"
        class="w-64 h-14 text-xl font-bold mb-4 box-shadow-ping-inverse-color"
      >
        Novo jogo
      </Button>
    </ContentWrapper>
  </PageWrapper>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import PlayerList from '@/components/PlayerList.vue'
import Button from '@/components/ui/button/Button.vue'
import { useCoreStore } from '@/stores/core'
import { Medal } from 'lucide-vue-next'
import confetti from 'canvas-confetti'
import PageWrapper from '@/components/PageWrapper.vue'
import ContentWrapper from '@/components/ContentWrapper.vue'
import PageTitle from '@/components/PageTitle.vue'
import ExclamationCard from '@/components/ExclamationCard.vue'

const coreStore = useCoreStore()
const interval = ref<number | null>(null)

const winnersDecoration = (index: number) =>
  computed(() => {
    const config = {
      0: 'stroke-yellow-400',
      1: 'stroke-gray-400',
      2: 'stroke-orange-400'
    } as Record<number, string>

    return config[index] || ''
  })

onMounted(() => {
  startConfetti()
})

onBeforeUnmount(() => {
  if (interval.value) {
    clearInterval(interval.value)
  }
})

const startConfetti = () => {
  var duration = 15 * 1000
  var animationEnd = Date.now() + duration
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  interval.value = setInterval(function () {
    var timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0 && interval.value) {
      return clearInterval(interval.value)
    }

    var particleCount = 50 * (timeLeft / duration)
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    })
  }, 250)
}
</script>
