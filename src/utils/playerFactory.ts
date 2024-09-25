import { type Player, type RedCard, type Score } from "@/types/game";

export class PlayerFactory implements Player {
  name: string;
  score: Score;
  redCards: RedCard;
  avatar: string;

  constructor(name: string) {
    this.name = name;
    this.score = {};
    this.redCards = {};
    this.avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${name}`;
  }

  getScore(round: number): number {
    return this.score[round] || 0;
  }

  getRedCard(round: number): number {
    return this.redCards[round] || 0;
  }

  setRedCard(round: number, value: number): void {
    this.redCards[round] = value;
  }

  toggleRedCard(round: number): void {
    this.redCards[round] = this.redCards[round] ? 0 : 1;
  }

  revokeRedCard(round: number): void {
    this.redCards[round] = 0;
  }

  addScore(round: number, score: number): void {
    this.score[round] = score;
  }

  get totalScore() {
    return Object.values(this.score).reduce(
      (acc: number, cur: number) => acc + cur,
      0
    );
  }

  get totalRedCards() {
    return Object.values(this.redCards).reduce(
      (acc: number, cur: number) => acc + cur,
      0
    );
  }
}
