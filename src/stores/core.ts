import { ref } from "vue";
import { defineStore } from "pinia";
import { PlayerFactory } from "@/utils/playerFactory";
import { GameFactory } from "@/utils/gameFactory";
import type { Steps } from "@/types/steps";

export const useCoreStore = defineStore("core", () => {
  const game = ref(new GameFactory());

  const newGame = (step: Steps = "new-game-players") => {
    const newPlayers = game.value.players.map(
      (player) => new PlayerFactory(player.name)
    );
    game.value = new GameFactory();
    game.value.setPlayers(newPlayers);
    game.value.step = step;
  };

  return {
    game,
    newGame,
  };
});
