/**
 * Ball — 球實體
 *
 * 管理球的運行時狀態：
 *   - 座標與移動
 *   - 控球權歸屬
 *   - 高度（射門/爭頂的空中軌跡）
 */

// 從 domain 模型暫無 ball 專屬類型，先用輕量介面。
// 具體物理參數待解析原版 ROM 比賽邏輯後補齊。

/** 球狀態 */
export enum BallState {
  /** 地面自由球 */
  FREE_GROUND = 0,
  /** 空中自由球 */
  FREE_AIR    = 1,
  /** 被控球中 */
  HELD        = 2,
}

export interface BallSnapshot {
  /** 球場 X 座標 */
  x: number;
  /** 球場 Y 座標 */
  y: number;
  /** 離地高度（像素，0 = 地面） */
  height: number;
  /** X 軸速度 */
  vx: number;
  /** Y 軸速度 */
  vy: number;
  /** 當前狀態 */
  state: BallState;
  /** 控球者場上索引（state === HELD 時有效，-1 = 無） */
  holderIndex: number;
}

/** 創建初始球狀態（中圈開球點，場地中央） */
export function createBallSnapshot(fieldW: number, fieldH: number): BallSnapshot {
  return {
    x: Math.floor(fieldW / 2),
    y: Math.floor(fieldH / 2),
    height: 0,
    vx: 0,
    vy: 0,
    state: BallState.FREE_GROUND,
    holderIndex: -1,
  };
}
