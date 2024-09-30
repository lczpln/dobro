import { type Player, type RedCard, type Score } from "@/types/game";

export class PlayerFactory implements Player {
  name: string;
  score: Score;
  redCards: RedCard;
  avatar: string;

  constructor(name: string) {
    this.name = name.trim();
    this.score = {};
    this.redCards = {};
    this.avatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${this.name}`;
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

  normalizeScores(round: number): void {
    if (!this.score[round]) {
      this.addScore(round, 0);
    } else {
      Object.values(this.score).forEach((_, index) => {
        if (index > round) {
          delete this.score[index];
        }
      });
    }
  }

  normalizeRedCards(round: number): void {
    if (!this.redCards[round]) {
      this.setRedCard(round, 0);
    } else {
      Object.values(this.redCards).forEach((_, index) => {
        if (index > round) {
          delete this.redCards[index];
        }
      });
    }
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
