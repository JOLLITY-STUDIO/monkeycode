/**
 * bank17 数据 — 原 bank17 纯数据 bank（$8000-$9FFF, 8KB）
 *
 * 数据组成（从 asm/bank17/*.s 提取）：
 * - data_tables.s：脚本段数据（$F0/$FB/$FC/$F9 标记的剧情脚本序列）
 * - data_maps.s：NT 地图数据（场景背景 tile 布局）
 * - data_tail.s：尾部脚本/精灵数据
 *
 * 翻译为声明式 TS 数组，禁止 PRG_BANK_17[addr] 索引。
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** bank17 data_tables 段（脚本序列数据） */
export const BANK17_DATA_TABLES: ReadonlyArray<number> = [
  // TODO B17: 从 asm/bank17/data_tables.s 提取 .byte 序列
  // 原 $8000 起始，含 $FB/$FC/$F9 标记的剧情脚本段
];

/** bank17 data_maps 段（NT 地图 tile 数据） */
export const BANK17_DATA_MAPS: ReadonlyArray<number> = [
  // TODO B17: 从 asm/bank17/data_maps.s 提取 .byte 序列
];

/** bank17 data_tail 段（尾部数据） */
export const BANK17_DATA_TAIL: ReadonlyArray<number> = [
  // TODO B17: 从 asm/bank17/data_tail.s 提取 .byte 序列
];

/** bank17 全量数据（按原始布局拼接） */
export const BANK17_FULL: ReadonlyArray<number> = [
  ...BANK17_DATA_TABLES,
  ...BANK17_DATA_MAPS,
  ...BANK17_DATA_TAIL,
];
