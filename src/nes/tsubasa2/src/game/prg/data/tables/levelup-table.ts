/**
 * 升级数据表 — 具象化契约
 *
 * 数据来源（迁移完成后即可生效）：
 *   - bank08 $80xx 升级经验表（按等级）
 *   - bank18 $A0xx 成长属性表（射门/盘带/传球/铲断/速度/体力）
 *
 * 替换实现策略：
 *   - 每条 LevelUpEntry 声明式：等级、所需经验、6 项基础成长
 *   - findLevelByExp 在数据填充后能立即生效
 *   - 当前空表：findLevelByExp 永远返回 1（让调用方能编译通过，且不会无限升级）
 *
 * 禁止：禁止 lo/hi 拆字节拼 16-bit exp，禁止暴露 bank 地址
 */

export interface LevelUpEntry {
  /** 等级 1..N */
  readonly level: number;
  /** 升级到该等级所需累计经验 */
  readonly expRequired: number;
  /** 6 项基础成长 [shot, dribble, pass, tackle, speed, stamina] */
  readonly growth: ReadonlyArray<number>;
}

/** 升级表（按等级升序；V0.4 提取自 bank08/bank18 后填充） */
export const LEVEL_UP_TABLE: ReadonlyArray<LevelUpEntry> = [];

/**
 * 按累计经验查询等级
 * 数据空时返回 1（最低等级）；数据填充后返回对应等级
 */
export function findLevelByExp(exp: number): number {
  const target = Math.max(0, exp | 0);
  let level = 1;
  for (const e of LEVEL_UP_TABLE) {
    if (target >= e.expRequired) level = e.level;
    else break;
  }
  return level;
}
