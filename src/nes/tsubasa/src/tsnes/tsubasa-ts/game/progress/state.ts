/**
 * 游戏进度状态 — class ProgressState
 */

import type { TeamId } from '../team/team';
import { SEASONS, TOTAL_STAGES } from './season';

/** 当前所在赛季 ID（0-3） */
export type SeasonId = number;

/** 当前关卡（1-32） */
export type StageNum = number;

export interface ProgressSnapshot {
  seasonId: SeasonId;
  stage: StageNum;
  unlockedTeams: TeamId[];
  unlockedPlayers: number[];
  wins: number;
  draws: number;
  losses: number;
  totalMatches: number;
}

export class ProgressState {
  seasonId: SeasonId = 0;
  stage: StageNum = 1;
  unlockedTeams: TeamId[] = [];
  unlockedPlayers: number[] = [];
  wins: number = 0;
  draws: number = 0;
  losses: number = 0;

  get seasonName(): string {
    return SEASONS[this.seasonId]?.name ?? '??';
  }

  get isCleared(): boolean {
    return this.stage > TOTAL_STAGES;
  }

  get totalMatches(): number {
    return this.wins + this.draws + this.losses;
  }

  reset(): void {
    this.seasonId = 0;
    this.stage    = 1;
    this.unlockedTeams    = [];
    this.unlockedPlayers  = [];
    this.wins   = 0;
    this.draws  = 0;
    this.losses = 0;
  }

  snapshot(): ProgressSnapshot {
    return {
      seasonId:        this.seasonId,
      stage:           this.stage,
      unlockedTeams:   [...this.unlockedTeams],
      unlockedPlayers: [...this.unlockedPlayers],
      wins:            this.wins,
      draws:           this.draws,
      losses:          this.losses,
      totalMatches:    this.totalMatches,
    };
  }
}
