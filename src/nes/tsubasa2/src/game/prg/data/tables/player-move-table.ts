/**
 * 球员移动数据表 — 原 bank22 移动/AI 数据（声明式表结构）
 *
 * 从 asm/bank22/data_tables.s + data_tail.s 提取。
 * bank22 含：移动指针表（大量 $8xxx 指针）、方向表、移动模式。
 *
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** 移动表条目 */
export interface PlayerMoveEntry {
  readonly moveId: number;
  readonly pattern: ReadonlyArray<number>;
  readonly speed: number;
  readonly duration: number;
}

/** 移动指针表（原 bank22 data_tables 起始的指针序列） */
export const BANK22_MOVE_TABLE: ReadonlyArray<PlayerMoveEntry> = [
  // TODO B22: 从 asm/bank22/data_tables.s 提取移动模式
];

/** 方向表（原 bank22 方向计算用） */
export const BANK22_DIRECTION_TABLE: ReadonlyArray<number> = [
  // TODO B22: 从 asm/bank22/code_main.s 提取方向值
];

/** 按 ID 查询移动 */
export function findMoveById(moveId: number): PlayerMoveEntry | null {
  for (const m of BANK22_MOVE_TABLE) {
    if (m.moveId === moveId) return m;
  }
  return null;
}
