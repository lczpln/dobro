<script setup lang="ts">
import { computed, ref } from "vue";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import { useCoreStore } from "@/stores/core";
import {
  AlertCircle,
  ArrowRight,
  UserRoundMinus,
  UserRoundPlus,
} from "lucide-vue-next";
import PlayerList from "@/components/PlayerList.vue";
import PageTitle from "@/components/PageTitle.vue";
import ButtonGoBack from "@/components/ButtonGoBack.vue";
import ContentWrapper from "@/components/ContentWrapper.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import { PlayerFactory } from "@/utils/playerFactory";

const coreStore = useCoreStore();

const playerInput = ref("");

const addNewPlayer = () => {
  const ok = coreStore.game.addPlayer(new PlayerFactory(playerInput.value));
  if (!ok) return;
  playerInput.value = "";
};

const canGoNext = computed(
  () => coreStore.game.players.length >= coreStore.game.minPlayers
);
</script>

<template>
  <PageWrapper>
    <ContentWrapper>
      <PageTitle>Configurar Jogadores</PageTitle>

      <form @submit.prevent="addNewPlayer" class="flex flex-col mb-8 w-full">
        <div class="flex items-center h-14 w-full mb-2">
          <Input
            class="rounded-r-none text-black text-lg h-full"
            v-model="playerInput"
            placeholder="Fulano de tal"
          />
          <Button class="rounded-l-none h-full" type="submit"
            ><UserRoundPlus
          /></Button>
        </div>

        <small class="flex items-center gap-1 text-zinc-500 text-left text-xs"
          ><AlertCircle :size="12" /> Dobro requer pelo menos
          {{ coreStore.game.minPlayers }} jogadores.</small
        >
      </form>

      <PlayerList :list="coreStore.game.players">
        <template #default="{ player }">
          <Button
            @click="coreStore.game.removePlayer(player.name)"
            variant="secondary"
            class="text-sm text-primary-foreground"
          >
            <UserRoundMinus :size="15" />
          </Button>
        </template>
      </PlayerList>

      <Button
        @click="coreStore.game.setStep('new-game-rounds')"
        class="w-64 h-14 text-xl font-bold mb-4"
        :class="{ 'box-shadow-ping-inverse-color': canGoNext }"
        :disabled="!canGoNext"
      >
        Próximo <ArrowRight class="ml-2" />
      </Button>

      <ButtonGoBack @click="coreStore.game.setStep('welcome')" />
    </ContentWrapper>
  </PageWrapper>
</template>
