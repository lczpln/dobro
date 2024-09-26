import type { config } from "@/constants/game";
import type { Steps } from "./steps";

export type Game = {
  players: Player[];
  step: Steps;
  rounds: number;
  currentRound: number;
  hasGameChanged: boolean;
  hasAllPlayerScored: boolean;
  addPlayer: (player: Player) => void;
  setPlayers: (players: Player[]) => void;
  removePlayer: (playerName: string) => void;
  togglePlayerRedCard: (playerName: string, round?: number) => void;
  playerHasRedCard: (playerName: string, round?: number) => boolean;
  getPlayer: (playerName: string) => Player | undefined;
  playerExists: (playerName: string) => boolean;
  playersSortedByScore: Player[];
  previousRound: () => void;
  nextRound: () => void;
  isLastRound: boolean;
  normalizedCurrentRound: number;
  setStep: (step: Steps) => void;
} & GameConfig;

export type Player = {
  name: string;
  score: Score;
  avatar: string;
  redCards: RedCard;
  totalScore: number;
  totalRedCards: number;
  getScore: (round: number) => number;
  getRedCard: (round: number) => number;
  setRedCard: (round: number, value: number) => void;
  addScore: (round: number, score: number) => void;
  toggleRedCard: (round: number) => void;
  revokeRedCard: (round: number) => void;
};

export type GameConfig = typeof config;

export type Score = Record<number, number>;
export type RedCard = Record<number, number>;
