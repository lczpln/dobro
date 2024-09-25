import type { Game } from '@/types/game'

export const initialGame: Game = {
  players: [],
  rounds: 3,
  currentRound: 0
}

export const config = {
  maxRounds: 10,
  minRounds: 1,
  minPlayers: 2
}
