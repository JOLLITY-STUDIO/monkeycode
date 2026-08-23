/**
 * 球员名字数据表 — 原 bank27 名字/文本数据（声明式表结构）
 *
 * 从 asm/bank27/data_tables.s + data_tail.s 提取。
 * bank27 起始：大量文本编码（$B6/$A0/$CC 等字符）。
 * bank27 $8104+：文本解析器（ram_062A → $A1DC 索引表 → 查表）。
 * bank27 $814D+：名字段装载（$A6AE 表）。
 *
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** 名字表条目 */
export interface PlayerNameEntry {
  readonly playerId: number;
  readonly name: string;
  readonly shortName: string;
  readonly teamId: number;
}

/** 球员名字表 */
export const BANK27_NAME_TABLE: ReadonlyArray<PlayerNameEntry> = [
  // TODO B27: 从 asm/bank27/data_tables.s 提取名字编码并解码
];

/** 文本段表（原 bank27 $8000 起始文本数据） */
export const BANK27_TEXT_TABLE: ReadonlyArray<string> = [
  // TODO B27: 从 asm/bank27/data_tables.s 提取文本段
];

/** 字符映射表（原 bank27 $A1DC 索引表） */
export const BANK27_CHAR_MAP: ReadonlyArray<number> = [
  // TODO B27: 从 asm/bank27/code_main.s $A1DC 提取
];

/** 名字地址表（原 bank27 $A6AE 表） */
export const BANK27_NAME_ADDR_TABLE: ReadonlyArray<{ readonly lo: number; readonly hi: number }> = [
  // TODO B27: 从 asm/bank27/code_main.s $A6AE 提取
];

/** 按 ID 查询名字 */
export function findNameByPlayerId(playerId: number): PlayerNameEntry | null {
  for (const n of BANK27_NAME_TABLE) {
    if (n.playerId === playerId) return n;
  }
  return null;
}
