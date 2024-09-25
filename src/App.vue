<script setup lang="ts">
import { useCoreStore } from "@/stores/core";

import WelcomeView from "@/views/WelcomeView.vue";
import NewGameRoundsView from "@/views/NewGameRoundsView.vue";
import GameView from "@/views/GameView.vue";
import NewGamePlayersView from "./views/NewGamePlayersView.vue";
import GameOverView from "./views/GameOverView.vue";

const coreStore = useCoreStore();
</script>

<template>
  <WelcomeView v-if="coreStore.game.step === 'welcome'" />
  <NewGamePlayersView v-else-if="coreStore.game.step === 'new-game-players'" />
  <NewGameRoundsView v-else-if="coreStore.game.step === 'new-game-rounds'" />
  <GameView v-else-if="coreStore.game.step === 'game'" />
  <GameOverView v-else-if="coreStore.game.step === 'game-over'" />
</template>
