/**
 * 游戏进度状态
 *
 * 封装通关进度、解锁内容等持久化数据。
 * 对应密码系统和存档功能。
 */

import type { TeamId } from '../team/Team';

/** 阶段 / 赛事 */
export enum Stage {
  /** 南葛中学（日本高中） */
  HIGH_SCHOOL    = 0,
  /** 巴西联赛（圣保罗） */
  BRAZIL_LEAGUE  = 1,
  /** 日本杯 */
  JAPAN_CUP      = 2,
  /** 世青赛 */
  WORLD_YOUTH    = 3,
  /** 通关 */
  CLEAR          = 4,
}

/** 进度状态 */
export interface ProgressSnapshot {
  /** 当前阶段 */
  stage: Stage;
  /** 当前关卡（巴西联赛为节，世青赛为对手编号） */
  level: number;
  /** 已解锁队伍 */
  unlockedTeams: TeamId[];
  /** 已解锁球员 */
  unlockedPlayers: number[];
  /** 胜/平/负 */
  wins: number;
  draws: number;
  losses: number;
  /** 总比赛场次 */
  totalMatches: number;
}

/**
 * ProgressState 进度管理
 */
export class ProgressState {
  stage: Stage = Stage.HIGH_SCHOOL;
  level: number = 0;
  unlockedTeams: TeamId[] = [];
  unlockedPlayers: number[] = [];
  wins: number = 0;
  draws: number = 0;
  losses: number = 0;

  /** 总比赛场次 */
  get totalMatches(): number {
    return this.wins + this.draws + this.losses;
  }

  /** 重置为新游戏 */
  reset(): void {
    this.stage  = Stage.HIGH_SCHOOL;
    this.level  = 0;
    this.unlockedTeams    = [];
    this.unlockedPlayers  = [];
    this.wins   = 0;
    this.draws  = 0;
    this.losses = 0;
  }

  /** 快照 */
  snapshot(): ProgressSnapshot {
    return {
      stage:          this.stage,
      level:          this.level,
      unlockedTeams:  [...this.unlockedTeams],
      unlockedPlayers: [...this.unlockedPlayers],
      wins:           this.wins,
      draws:          this.draws,
      losses:         this.losses,
      totalMatches:   this.totalMatches,
    };
  }
}
