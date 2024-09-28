import { config as defaultConfig } from "@/constants/game";
import { type Game, type GameConfig, type Player } from "@/types/game";
import type { Steps } from "@/types/steps";

export class GameFactory implements Game {
  step: Steps;
  players: Player[];
  currentRound: number;
  rounds: number;
  maxRounds: number;
  minRounds: number;
  minPlayers: number;

  constructor(config: GameConfig = defaultConfig) {
    this.step = "welcome";
    this.players = [];
    this.currentRound = 0;
    this.rounds = config.rounds;
    this.maxRounds = config.maxRounds;
    this.minRounds = config.minRounds;
    this.minPlayers = config.minPlayers;
  }

  addPlayer(player: Player): boolean {
    if (!player.name || !this.playerExists(player.name)) return false;
    this.players.push(player);
    return true;
  }

  setPlayers(players: Player[]): void {
    this.players = players;
  }

  togglePlayerRedCard(playerName: string, round?: number): void {
    round = round || this.currentRound;

    this.players.forEach((player) => {
      if (player.name === playerName) {
        this.getPlayer(playerName)?.toggleRedCard(round);
      } else {
        this.getPlayer(player.name)?.revokeRedCard(round);
      }
    });
  }

  playerHasRedCard(playerName: string, round?: number) {
    round = round || this.currentRound;
    return !!this.getPlayer(playerName)?.redCards[round];
  }

  removePlayer(playerName: string): void {
    this.players = this.players.filter((player) => player.name !== playerName);
  }

  playerExists(playerName: string): boolean {
    return this.players.some((player) => player.name === playerName);
  }

  getPlayer(playerName: string): Player | undefined {
    return this.players.find((player) => player.name === playerName);
  }

  normalizePlayersData(): void {
    this.players.forEach((player) => {
      player.normalizeScores(this.currentRound);
      player.normalizeRedCards(this.currentRound);
    });
  }

  get hasGameChanged(): boolean {
    return this.players.some(
      (player) => player.totalScore || player.totalRedCards
    );
  }

  get playersSortedByScore() {
    const players = this.players.map((player) => {
      const score = Object.values(player.score).reduce(
        (acc, cur) => acc + cur,
        0
      );
      const redCards = Object.values(player.redCards).reduce(
        (acc, cur) => acc + cur,
        0
      );

      return {
        ...player,
        totalScore: score + redCards,
        totalRedCards: redCards,
      };
    });

    return players.sort((a, b) => a.totalScore - b.totalScore);
  }

  get hasAllPlayerScored(): boolean {
    return this.players.every((player) => player.getScore(this.currentRound));
  }

  setGameMaxRounds(rounds: number = 0): void {
    rounds = rounds < this.minRounds ? this.minRounds : rounds;
    rounds = rounds > this.maxRounds ? this.maxRounds : rounds;
    this.rounds = rounds;
  }

  previousRound(): void {
    if (this.currentRound > 0) {
      this.currentRound--;
    } else {
      this.step = "new-game-rounds";
    }
  }

  nextRound(): void {
    if (this.currentRound < this.rounds - 1) {
      this.currentRound++;
      this.normalizePlayersData();
    } else {
      this.step = "game-over";
    }
  }

  get isLastRound(): boolean {
    return this.currentRound === this.rounds - 1;
  }

  get normalizedCurrentRound(): number {
    return this.currentRound + 1;
  }

  setStep(step: Steps): void {
    this.step = step;
    if (step === "game") {
      this.normalizePlayersData();
    }
  }
}
