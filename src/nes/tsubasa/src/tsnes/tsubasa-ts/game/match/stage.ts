/**
 * Stage — 比賽流程編排
 *
 * 驅動一場完整比賽的生命週期：
 *   - 賽前準備（載入兩隊數據、陣型部署）
 *   - 上半場 → 中場休息 → 下半場
 *   - 傷停補時、結束結算
 *
 * 對接：
 *   - domain/team/Team.ts + domain/team/Formation.ts
 *   - domain/player/Player.ts
 *   - game/unit/Footballer.ts
 *   - game/unit/ball.ts
 *   - constants/scene_codes.ts (MATCH_STATE_* 子狀態)
 */

import { Player } from '../unit/player';
import { Team } from '../team/team';
import { Formation } from '../team/formation';
import type { BallSnapshot } from '../unit/ball';
import type { Footballer } from '../unit/footballer';

// ============================================================
// §1 比賽階段枚舉
// ============================================================

/** 比賽階段 */
export enum MatchPhase {
  /** 賽前準備 */
  PRELUDE      = 0,
  /** 上半場 */
  FIRST_HALF   = 1,
  /** 中場休息 */
  HALFTIME     = 2,
  /** 下半場 */
  SECOND_HALF  = 3,
  /** 傷停補時 */
  INJURY_TIME  = 4,
  /** 比賽結束 */
  FINISHED     = 5,
}

// ============================================================
// §2 比賽狀態
// ============================================================

export interface MatchSnapshot {
  /** 當前階段 */
  phase: MatchPhase;
  /** 主隊比分 */
  scoreHome: number;
  /** 客隊比分 */
  scoreAway: number;
  /** 比賽計時（秒，遊戲內時鐘） */
  gameTime: number;
  /** 半場時長（秒） */
  halfLength: number;
  /** 階段計時器（幀數） */
  phaseTimer: number;
  /** 控球方（0 = 主隊, 1 = 客隊） */
  possession: number;
}

// ============================================================
// §3 比賽編排（骨架）
// ============================================================

/**
 * MatchStage 編排一場比賽。
 *
 * 具體比賽物理、AI、碰撞判定等規則細節，
 * 待從原始 ROM 比賽 bank 解析後補齊。
 */
export class MatchStage {
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly homeFormation: Formation;
  readonly awayFormation: Formation;

  /** 場上雙方 Footballer 實例（22 人） */
  fieldPlayers: Footballer[] = [];

  /** 球狀態 */
  ball: BallSnapshot | null = null;

  /** 比賽快照 */
  state: MatchSnapshot;

  constructor(
    home: Team,
    away: Team,
    homeFm: Formation,
    awayFm: Formation,
    halfLenSec: number = 120,
  ) {
    this.homeTeam = home;
    this.awayTeam = away;
    this.homeFormation = homeFm;
    this.awayFormation = awayFm;
    this.state = {
      phase: MatchPhase.PRELUDE,
      scoreHome: 0,
      scoreAway: 0,
      gameTime: halfLenSec,
      halfLength: halfLenSec,
      phaseTimer: 0,
      possession: 0,
    };
  }

  // ---- 生命週期 ----

  /** 進入比賽（初始化陣型、創建 Footballer 實例） */
  enter(): void {
    this.state.phase = MatchPhase.PRELUDE;
    this.state.phaseTimer = 0;

    // 根據陣型計算並創建 22 名 Footballer
    // 具體座標由 Formation.slots 提供
    // this.deployPlayers();
  }

  /** 開始上半場 */
  kickoff(): void {
    this.state.phase = MatchPhase.FIRST_HALF;
    this.state.gameTime = this.state.halfLength;
    this.state.phaseTimer = 0;
  }

  /** 每幀更新（骨架，待填） */
  update(): void {
    switch (this.state.phase) {
      case MatchPhase.PRELUDE:
        // 等待賽前動畫結束
        this.state.phaseTimer++;
        break;
      case MatchPhase.FIRST_HALF:
      case MatchPhase.SECOND_HALF:
      case MatchPhase.INJURY_TIME:
        this.tickMatch();
        break;
      case MatchPhase.HALFTIME:
        // 中場休息倒計時
        this.state.phaseTimer++;
        break;
      case MatchPhase.FINISHED:
        break;
    }
  }

  private tickMatch(): void {
    // 比賽主邏輯（每幀）：
    // 1. 推進球員移動
    // 2. 更新球物理
    // 3. AI 決策
    // 4. 碰撞檢測
    // 5. 規則判定
    //
    // 以上待從 ROM 比賽 bank 解析後實現
  }

  // ---- 比分 ----

  goalScored(forHome: boolean): void {
    if (forHome) {
      this.state.scoreHome++;
    } else {
      this.state.scoreAway++;
    }
  }

  // ---- 換邊 ----

  switchSides(): void {
    // 下半場換邊（鏡像陣型）
  }

  // ---- 結束 ----

  isFinished(): boolean {
    return this.state.phase === MatchPhase.FINISHED;
  }
}
