/**
 * Footballer — 場上球員 runtime 實體
 *
 * 封裝一場比賽中球員的即時狀態：
 *   - 場上座標與移動向量
 *   - 動畫幀與方向
 *   - 控球、射門、鏟球等動作狀態
 *   - 精靈屬性（OAM 相關）
 *
 * 對應原始 ROM 中 FIELD_PLAYER_BUF ($0446) 區的運行時數據，
 * 但用 Player domain 模型表示屬性，分離靜態數據與運行時狀態。
 */

import { Player } from './player';
import type { PlayerPosition } from './player';

// ============================================================
// §1 場上球員動作狀態
// ============================================================

/** 球員動作枚舉 */
export enum FbAction {
  /** 空閒 / 原地站立 */
  IDLE          = 0,
  /** 跑動 */
  RUNNING       = 1,
  /** 帶球 */
  DRIBBLING     = 2,
  /** 鏟球 */
  TACKLING      = 3,
  /** 射門 */
  SHOOTING      = 4,
  /** 傳球 */
  PASSING       = 5,
  /** 跳起爭頂 */
  JUMPING       = 6,
  /** 被絆倒 / 跌倒 */
  FALLEN        = 7,
  /** 必殺技發動中 */
  SPECIAL_MOVE  = 8,
  /** 阻擋射門 (GK) */
  CATCHING      = 9,
  /** 截球 */
  INTERCEPTING  = 10,
}

/** 方向枚舉（NES 慣例） */
export enum FbDirection {
  UP           = 0,
  DOWN         = 1,
  LEFT         = 2,
  RIGHT        = 3,
  UP_LEFT      = 4,
  UP_RIGHT     = 5,
  DOWN_LEFT    = 6,
  DOWN_RIGHT   = 7,
}

// ============================================================
// §2 球場尺寸常量
// ============================================================

/** 球場邏輯寬度（像素） */
export const FIELD_W = 512;
/** 球場邏輯高度（像素） */
export const FIELD_H = 240;
/** 球門寬度 */
export const GOAL_W = 48;
/** 球門高度 */
export const GOAL_H = 80;

/** NES 畫面可視寬度 */
export const VIEWPORT_W = 256;
/** NES 畫面可視高度 */
export const VIEWPORT_H = 240;

/** 球員基礎移動速度 */
export const PLAYER_BASE_SPEED = 2;
/** 帶球減速因子 */
export const DRIBBLE_SPEED_FACTOR = 0.7;

// ============================================================
// §3 運行時狀態介面
// ============================================================

export interface FbRuntime {
  /** 場上 X 座標（球場坐標系） */
  x: number;
  /** 場上 Y 座標（球場坐標系） */
  y: number;
  /** X 軸移動向量 */
  vx: number;
  /** Y 軸移動向量 */
  vy: number;
  /** 面向方向 */
  dir: FbDirection;
  /** 當前動作 */
  action: FbAction;
  /** 動作計時器（剩餘幀數） */
  actionTimer: number;
  /** 動畫幀索引 */
  animFrame: number;
  /** 動畫計時器 */
  animTimer: number;
  /** 是否控球 */
  hasBall: boolean;
  /** 是否離地（跳躍/爭頂中） */
  inAir: boolean;
  /** 離地高度（像素） */
  airHeight: number;
}

// ============================================================
// §4 移動方向 → 向量查找表
// ============================================================

const DIR_VECTORS: Record<FbDirection, { dx: number; dy: number }> = {
  [FbDirection.UP]:         { dx:  0, dy: -1 },
  [FbDirection.DOWN]:       { dx:  0, dy:  1 },
  [FbDirection.LEFT]:       { dx: -1, dy:  0 },
  [FbDirection.RIGHT]:      { dx:  1, dy:  0 },
  [FbDirection.UP_LEFT]:    { dx: -1, dy: -1 },
  [FbDirection.UP_RIGHT]:   { dx:  1, dy: -1 },
  [FbDirection.DOWN_LEFT]:  { dx: -1, dy:  1 },
  [FbDirection.DOWN_RIGHT]: { dx:  1, dy:  1 },
};

/** 從輸入 d-pad 解析方向 */
export function inputToDirection(up: boolean, down: boolean, left: boolean, right: boolean): FbDirection {
  if (up && left)     return FbDirection.UP_LEFT;
  if (up && right)    return FbDirection.UP_RIGHT;
  if (down && left)   return FbDirection.DOWN_LEFT;
  if (down && right)  return FbDirection.DOWN_RIGHT;
  if (up)             return FbDirection.UP;
  if (down)           return FbDirection.DOWN;
  if (left)           return FbDirection.LEFT;
  if (right)          return FbDirection.RIGHT;
  return FbDirection.DOWN; // 默認朝下
}

// ============================================================
// §5 Footballer 類
// ============================================================

export class Footballer {
  /** 關聯的領域 Player */
  readonly player: Player;
  /** 場上索引（0-10, 11-21 對應客隊） */
  readonly fieldIndex: number;
  /** 運行時狀態 */
  rt: FbRuntime;

  constructor(player: Player, fieldIndex: number, x: number, y: number) {
    this.player = player;
    this.fieldIndex = fieldIndex;
    this.rt = {
      x, y,
      vx: 0, vy: 0,
      dir: fieldIndex >= 11 ? FbDirection.UP : FbDirection.DOWN,
      action: FbAction.IDLE,
      actionTimer: 0,
      animFrame: 0,
      animTimer: 0,
      hasBall: false,
      inAir: false,
      airHeight: 0,
    };
  }

  // ---- 移動 ----

  /** 按方向設定移動速度 */
  setMove(dir: FbDirection): void {
    const vec = DIR_VECTORS[dir];
    const speed = this.computeSpeed();
    this.rt.vx = vec.dx * speed;
    this.rt.vy = vec.dy * speed;
    this.rt.dir = dir;
    this.rt.action = this.rt.hasBall ? FbAction.DRIBBLING : FbAction.RUNNING;
  }

  /** 停止移動 */
  stopMove(): void {
    this.rt.vx = 0;
    this.rt.vy = 0;
    if (this.rt.action === FbAction.RUNNING || this.rt.action === FbAction.DRIBBLING) {
      this.rt.action = FbAction.IDLE;
    }
  }

  /** 計算當前移動速度 */
  private computeSpeed(): number {
    let spd = PLAYER_BASE_SPEED + Math.floor(this.player.stats.speed / 32);
    if (this.rt.hasBall) {
      spd = Math.floor(spd * DRIBBLE_SPEED_FACTOR);
    }
    return Math.max(1, spd);
  }

  /** 每幀物理更新 */
  tick(): void {
    // 動畫更新
    this.tickAnimation();

    // 動作計時器
    if (this.rt.actionTimer > 0) {
      this.rt.actionTimer--;
      if (this.rt.actionTimer <= 0) {
        this.onActionEnd();
      }
    }

    // 移動
    if (this.rt.vx !== 0 || this.rt.vy !== 0) {
      this.rt.x += this.rt.vx;
      this.rt.y += this.rt.vy;
      this.clampToField();
    }

    // 空中重力
    if (this.rt.inAir && this.rt.airHeight > 0) {
      this.rt.airHeight = Math.max(0, this.rt.airHeight - 2);
      if (this.rt.airHeight <= 0) {
        this.rt.inAir = false;
      }
    }

    // 體力自然衰減
    if (this.rt.vx !== 0 || this.rt.vy !== 0) {
      // 每 4 幀減 1 體力
      if (this.rt.animFrame % 4 === 0) {
        this.player.consumeStamina(1);
      }
    }
  }

  // ---- 動畫 ----

  private tickAnimation(): void {
    this.rt.animTimer++;
    const frameRate = this.getAnimFrameRate();
    if (this.rt.animTimer >= frameRate) {
      this.rt.animTimer = 0;
      this.rt.animFrame = (this.rt.animFrame + 1) % this.getAnimFrameCount();
    }
  }

  private getAnimFrameRate(): number {
    switch (this.rt.action) {
      case FbAction.RUNNING:
      case FbAction.DRIBBLING:  return 4;
      case FbAction.SHOOTING:
      case FbAction.SPECIAL_MOVE: return 3;
      default: return 6;
    }
  }

  private getAnimFrameCount(): number {
    switch (this.rt.action) {
      case FbAction.RUNNING:
      case FbAction.DRIBBLING: return 4;
      case FbAction.IDLE:      return 2;
      default: return 1;
    }
  }

  // ---- 動作 ----

  /** 發起動作 */
  setAction(action: FbAction, duration: number = 0): void {
    this.rt.action = action;
    this.rt.actionTimer = duration;
    this.rt.animFrame = 0;
    this.rt.animTimer = 0;

    // 動作預設持續時間
    if (duration <= 0) {
      this.rt.actionTimer = this.defaultActionDuration(action);
    }
  }

  private defaultActionDuration(action: FbAction): number {
    switch (action) {
      case FbAction.SHOOTING:       return 20;
      case FbAction.TACKLING:       return 12;
      case FbAction.PASSING:        return 8;
      case FbAction.JUMPING:        return 15;
      case FbAction.FALLEN:         return 30;
      case FbAction.SPECIAL_MOVE:   return 40;
      case FbAction.INTERCEPTING:   return 10;
      default: return 0;
    }
  }

  private onActionEnd(): void {
    switch (this.rt.action) {
      case FbAction.SHOOTING:
      case FbAction.PASSING:
      case FbAction.TACKLING:
      case FbAction.SPECIAL_MOVE:
      case FbAction.INTERCEPTING:
        // 動作結束回 idle
        this.rt.action = FbAction.IDLE;
        this.rt.animFrame = 0;
        break;
      case FbAction.FALLEN:
        // 起身
        this.rt.action = FbAction.IDLE;
        this.rt.animFrame = 0;
        break;
    }
  }

  // ---- 球場邊界 ----

  private clampToField(): void {
    this.rt.x = Math.max(0, Math.min(FIELD_W - 1, this.rt.x));
    this.rt.y = Math.max(0, Math.min(FIELD_H - 1, this.rt.y));
  }

  // ---- 螢幕座標轉換 ----

  /** 球場座標 → 螢幕座標（減去卷軸偏移） */
  screenX(scrollX: number): number {
    return Math.round(this.rt.x - scrollX);
  }

  screenY(): number {
    return Math.round(this.rt.y);
  }

  /** 是否在螢幕可視範圍內 */
  isOnScreen(scrollX: number): boolean {
    const sx = this.screenX(scrollX);
    const sy = this.screenY();
    return sx >= -16 && sx < VIEWPORT_W && sy >= -16 && sy < VIEWPORT_H;
  }

  // ---- 便捷查詢 ----

  get name(): string { return this.player.nameIdx.toString(); }
  get number(): number { return this.player.number; }
  get isGoalkeeper(): boolean { return this.player.position === 0; }
}
