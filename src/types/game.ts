export type Game = {
  players: Player[]
  rounds: number
  currentRound: number
}

export type Player = {
  name: string
  score: Score
  avatar: string
  redCards: RedCard
  totalScore?: number
  totalRedCards?: number
}

export type Score = Record<number, number>
export type RedCard = Record<number, number>
