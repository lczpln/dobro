<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { useCoreStore } from '@/stores/core'
import { Plus, Skull } from 'lucide-vue-next'
import PlayerList from '@/components/PlayerList.vue'
import PageTitle from '@/components/PageTitle.vue'
import ButtonGoBack from '@/components/ButtonGoBack.vue'
import ContentWrapper from '@/components/ContentWrapper.vue'
import PageWrapper from '@/components/PageWrapper.vue'
import { config } from '@/constants/game'

const coreStore = useCoreStore()

const playerInput = ref('')

const addNewPlayer = () => {
  const name = playerInput.value

  coreStore.addPlayer(name)
  playerInput.value = ''
}

const canGoNext = computed(() => coreStore.game.players.length >= config.minPlayers)
</script>

<template>
  <PageWrapper>
    <ContentWrapper>
      <PageTitle>Configurar Jogadores</PageTitle>

      <form
        @submit.prevent="addNewPlayer"
        class="flex items-center justify-center mb-8 w-full h-14"
      >
        <Input
          class="rounded-r-none text-black h-full text-lg"
          v-model="playerInput"
          placeholder="Fulano de tal"
        />
        <Button class="rounded-l-none h-full" type="submit"><Plus /></Button>
      </form>

      <PlayerList :list="coreStore.game.players">
        <template #default="{ player }">
          <Button
            @click="coreStore.removePlayer(player.name)"
            variant="outline"
            class="text-sm text-primary"
          >
            <Skull :size="15" />
          </Button>
        </template>
      </PlayerList>

      <Button
        @click="coreStore.setStep('new-game-rounds')"
        class="w-64 h-14 text-xl font-bold mb-4"
        :class="{ 'box-shadow-ping-inverse-color': canGoNext }"
        :disabled="!canGoNext"
      >
        Continuar
      </Button>

      <ButtonGoBack @click="coreStore.setStep('welcome')" />
    </ContentWrapper>
  </PageWrapper>
</template>
