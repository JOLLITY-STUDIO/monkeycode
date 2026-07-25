/**
 * Frame — 游戏帧类型定义
 */

/** 一帧的系统快照 */
export interface Frame {
  /** 帧号 */
  number: number;
  /** 当前场景 ID */
  sceneId: number;
  /** 场景内分派索引 */
  dispatchIndex: number;
  /** 输入状态 (joypad bits) */
  input?: number;
  /** PPU 输出像素缓冲 (可选) */
  pixels?: number[];
}
