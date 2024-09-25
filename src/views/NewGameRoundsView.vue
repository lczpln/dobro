<script setup lang="ts">
import ButtonGoBack from '@/components/ButtonGoBack.vue'
import ContentWrapper from '@/components/ContentWrapper.vue'
import PageTitle from '@/components/PageTitle.vue'
import PageWrapper from '@/components/PageWrapper.vue'
import Button from '@/components/ui/button/Button.vue'
import Slider from '@/components/ui/slider/Slider.vue'
import { config } from '@/constants/game'
import { useCoreStore } from '@/stores/core'

const coreStore = useCoreStore()
</script>

<template>
  <PageWrapper>
    <ContentWrapper>
      <PageTitle>Configurar Jogo</PageTitle>

      <div class="text-6xl font-bold mb-4">{{ coreStore.game.rounds }}</div>

      <div class="w-64 mb-8">
        <Slider
          :model-value="[coreStore.game.rounds]"
          @update:model-value="coreStore.setGameMaxRounds($event?.[0] || 0)"
          :min="config.minRounds"
          :max="config.maxRounds"
          :step="1"
          class="[&>span:first-child]:h-2 [&>span:first-child]:bg-gray-600"
        />
      </div>

      <div class="text-xl mb-8">Número de Rounds</div>

      <Button
        @click="coreStore.setStep('game')"
        class="w-64 h-14 text-xl font-bold mb-4"
        :class="{ 'box-shadow-ping-inverse-color': coreStore.game.players.length }"
        :disabled="!coreStore.game.players.length"
      >
        Iniciar Jogo
      </Button>

      <ButtonGoBack @click="coreStore.setStep('new-game-players')" />
    </ContentWrapper>
  </PageWrapper>
</template>
