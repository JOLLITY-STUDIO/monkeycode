/**
 * 升级数据表 — 原 bank01 升级成长曲线（声明式表结构）
 *
 * V0.2 从 asm 提取（ram_0454+idx*2 经验/升级关联）。当前为空表（契约占位）。
 */
export interface LevelUpEntry {
  readonly level: number;
  readonly expRequired: number;
  readonly growth: ReadonlyArray<number>;
}

export const LEVEL_UP_TABLE: ReadonlyArray<LevelUpEntry> = [];

export function findLevelByExp(exp: number): number {
  let level = 1;
  for (const e of LEVEL_UP_TABLE) {
    if (exp >= e.expRequired) level = e.level;
    else break;
  }
  return level;
}
