/**
 * 阵型定义
 *
 * ROM 中将阵型保存为 $0408 区（WRAM_FORMATION_BASE, 11 球员 × ? 字节），
 * 包含每名球员在球场上的相对坐标。
 */

import type { PlayerId } from '../player/Player';
import type { PlayerPosition } from '../player/PlayerPosition';

/** 阵型中的单球员槽位 */
export interface FormationSlot {
  /** 球员 ID（索引） */
  playerId: PlayerId;
  /** 球场 X 坐标 (0-255) */
  x: number;
  /** 球场 Y 坐标 (0-255) */
  y: number;
  /** 位置 GK/DF/MF/FW */
  position: PlayerPosition;
}

/** 已知阵型 ID */
export enum FormationId {
  /** 4-4-2 */
  F_4_4_2    = 0,
  /** 4-3-3 */
  F_4_3_3    = 1,
  /** 3-5-2 */
  F_3_5_2    = 2,
  /** 4-2-4 */
  F_4_2_4    = 3,
  /** 5-3-2 */
  F_5_3_2    = 4,
  /** 3-4-3 */
  F_3_4_3    = 5,
}

/** 阵型名称 */
export const FORMATION_NAMES: Record<FormationId, string> = {
  [FormationId.F_4_4_2]: '4-4-2',
  [FormationId.F_4_3_3]: '4-3-3',
  [FormationId.F_3_5_2]: '3-5-2',
  [FormationId.F_4_2_4]: '4-2-4',
  [FormationId.F_5_3_2]: '5-3-2',
  [FormationId.F_3_4_3]: '3-4-3',
};

export const PLAYERS_PER_TEAM = 11;

/**
 * 阵型类
 *
 * 存储 11 名球员在球场上的排布。
 * 后续从 ROM bank 数据中加载实际坐标。
 */
export class Formation {
  readonly id: FormationId;
  readonly slots: FormationSlot[];

  constructor(id: FormationId, slots: FormationSlot[] = []) {
    this.id = id;
    this.slots = slots;
  }

  /** 获取阵型名称 */
  get name(): string {
    return FORMATION_NAMES[this.id] ?? `Formation #${this.id}`;
  }

  /**
   * 创建默认 4-4-2 阵型
   */
  static default(): Formation {
    const yGk = 190; // GK 在下方
    const yDf = 160;
    const yMf = 110;
    const yFw = 60;

    const slots: FormationSlot[] = [
      { playerId: 0,  x: 128, y: yGk, position: 0 }, // GK
      { playerId: 1,  x:  50, y: yDf, position: 1 }, // DF
      { playerId: 2,  x: 100, y: yDf, position: 1 },
      { playerId: 3,  x: 155, y: yDf, position: 1 },
      { playerId: 4,  x: 205, y: yDf, position: 1 },
      { playerId: 5,  x:  60, y: yMf, position: 2 }, // MF
      { playerId: 6,  x: 110, y: yMf, position: 2 },
      { playerId: 7,  x: 145, y: yMf, position: 2 },
      { playerId: 8,  x: 195, y: yMf, position: 2 },
      { playerId: 9,  x:  95, y: yFw, position: 3 }, // FW
      { playerId: 10, x: 160, y: yFw, position: 3 },
    ];

    return new Formation(FormationId.F_4_4_2, slots);
  }
}
