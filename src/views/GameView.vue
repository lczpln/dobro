<template>
  <PageWrapper>
    <ContentWrapper>
      <PageTitle>
        Rodada {{ coreStore.normalizedCurrentRound }} de {{ coreStore.game.rounds }}
      </PageTitle>

      <PlayerList :list="coreStore.game.players">
        <template #default="{ player }">
          <ExclamationCard :player-name="player.name" />

          <NumberField
            v-model="player.score[coreStore.game.currentRound]"
            :id="`${player.name}-score`"
            class="text-black w-24"
            :default-value="0"
            :step="1"
            :min="0"
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </template>
      </PlayerList>

      <Button
        @click="coreStore.nextRound()"
        class="w-64 h-14 text-xl font-bold mb-4"
        :class="{
          'box-shadow-ping-inverse-color': coreStore.hasAllPlayerScored
        }"
        :disabled="!coreStore.hasAllPlayerScored"
      >
        {{ coreStore.isLastRound ? 'Finalizar jogo' : 'Próxima rodada' }}
      </Button>

      <ButtonGoBack @click="coreStore.previousRound()" />
    </ContentWrapper>
  </PageWrapper>
</template>

<script setup lang="ts">
import ButtonGoBack from '@/components/ButtonGoBack.vue'
import ContentWrapper from '@/components/ContentWrapper.vue'
import ExclamationCard from '@/components/ExclamationCard.vue'
import PageTitle from '@/components/PageTitle.vue'
import PageWrapper from '@/components/PageWrapper.vue'
import PlayerList from '@/components/PlayerList.vue'
import Button from '@/components/ui/button/Button.vue'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import { useCoreStore } from '@/stores/core'

const coreStore = useCoreStore()
</script>
