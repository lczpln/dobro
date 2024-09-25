import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { type Game } from '@/types/game'
import { type Steps } from '@/types/steps'
import { newGameFactory } from '@/utils/newGame'

export const useCoreStore = defineStore('core', () => {
  const currentStep = ref<Steps>('welcome')
  const game = ref<Game>({ ...newGameFactory() })

  watch(currentStep, () => {
    if (currentStep.value === 'game') {
      game.value.players.forEach((player) => {
        if (!Object.values(player.score).length) {
          Array(game.value.rounds)
            .fill(0)
            .forEach((_, index) => {
              player.score[index] = 0
              player.redCards[index] = 0
            })
        }
      })
    }
  })

  const newGame = () => {
    const newPlayers = game.value.players.map((player) => ({
      ...player,
      score: [],
      redCards: []
    }))

    game.value = {
      ...newGameFactory(),
      players: newPlayers
    }

    currentStep.value = 'new-game-players'
  }

  const hasAllPlayerScored = computed(() => {
    return game.value.players.every((player) => Number(player.score[game.value.currentRound]) > 0)
  })

  const hasPlayer = (playerName: string) => {
    return game.value.players.some((player) => player.name === playerName)
  }

  const playersSortedByScore = computed(() => {
    const players = game.value.players.map((player) => {
      const score = Object.values(player.score).reduce((acc, cur) => acc + cur, 0)
      const redCards = Object.values(player.redCards).reduce((acc, cur) => acc + cur, 0)

      return {
        ...player,
        totalScore: score + redCards,
        totalRedCards: redCards
      }
    })

    return players.sort((a, b) => a.totalScore - b.totalScore)
  })

  const playerHasRedCard = (playerName: string) =>
    computed(() => {
      return game.value.players.some(
        (player) => player.name === playerName && player.redCards[game.value.currentRound] === 1
      )
    })

  const setPlayerRedCard = (playerName: string) => {
    const player = game.value.players.find((player) => player.name === playerName)

    if (player) {
      player.redCards[game.value.currentRound] = playerHasRedCard(playerName).value ? 0 : 1

      game.value.players
        .filter((p) => p.name !== playerName)
        .forEach((p) => {
          p.redCards[game.value.currentRound] = 0
        })
    }
  }

  const normalizedCurrentRound = computed(() => game.value.currentRound + 1)
  const isLastRound = computed(() => game.value.currentRound === game.value.rounds - 1)

  const nextRound = () => {
    if (game.value.currentRound < game.value.rounds - 1) {
      game.value.currentRound++
    } else {
      currentStep.value = 'game-over'
    }
  }

  const previousRound = () => {
    if (game.value.currentRound > 0) {
      game.value.currentRound--
    } else {
      currentStep.value = 'new-game-rounds'
    }
  }

  const getPlayerCurrentScore = (playerName: string) => {
    const player = game.value.players.find((player) => player.name === playerName)

    if (player) {
      return player.score[game.value.currentRound]
    }

    return 0
  }

  const getPlayerScore = (playerName: string, round: number) =>
    computed(() => {
      const player = game.value.players.find((player) => player.name === playerName)

      if (player) {
        return player.score[round]
      }

      return 0
    })

  const setPlayerScore = (playerName: string, score: number) => {
    const player = game.value.players.find((player) => player.name === playerName)

    if (player) {
      player.score[game.value.currentRound] = Number(score)
    }
  }

  const addPlayer = (playerName: string) => {
    if (!playerName || hasPlayer(playerName)) {
      return
    }

    game.value.players.push({
      name: playerName,
      score: [],
      avatar: `https://api.dicebear.com/9.x/adventurer/svg?seed=${playerName}`,
      redCards: []
    })
  }

  const removePlayer = (playerName: string) => {
    const playerIndex = game.value.players.findIndex((player) => player.name === playerName)

    if (playerIndex !== -1) {
      game.value.players.splice(playerIndex, 1)
    }
  }

  const setStep = (step: Steps) => {
    currentStep.value = step
  }

  const setGameMaxRounds = (rounds: number) => {
    game.value.rounds = rounds
  }

  const setGameCurrentRound = (round: number) => {
    game.value.currentRound = round
  }

  return {
    currentStep,
    game,
    hasAllPlayerScored,
    playersSortedByScore,
    normalizedCurrentRound,
    isLastRound,
    newGame,
    nextRound,
    previousRound,
    playerHasRedCard,
    setPlayerRedCard,
    getPlayerScore,
    getPlayerCurrentScore,
    setPlayerScore,
    addPlayer,
    removePlayer,
    setStep,
    setGameMaxRounds,
    setGameCurrentRound
  }
})
