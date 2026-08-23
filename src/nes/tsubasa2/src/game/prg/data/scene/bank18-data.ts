/**
 * bank18 数据 — 原 bank18 纯数据 bank（$8000-$9FFF, 8KB）
 *
 * 数据组成（从 asm/bank18/*.s 提取）：
 * - data_tables.s：NT 地图 tile 数据（场景背景）
 * - data_maps.s：NT 地图属性/调色板数据
 * - data_tail.s：尾部 tile 数据
 *
 * 翻译为声明式 TS 数组，禁止 PRG_BANK_18[addr] 索引。
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** bank18 data_tables 段（NT 地图 tile 数据） */
export const BANK18_DATA_TABLES: ReadonlyArray<number> = [
  // TODO B18: 从 asm/bank18/data_tables.s 提取 .byte 序列
];

/** bank18 data_maps 段（NT 地图属性数据） */
export const BANK18_DATA_MAPS: ReadonlyArray<number> = [
  // TODO B18: 从 asm/bank18/data_maps.s 提取 .byte 序列
];

/** bank18 data_tail 段（尾部 tile 数据） */
export const BANK18_DATA_TAIL: ReadonlyArray<number> = [
  // TODO B18: 从 asm/bank18/data_tail.s 提取 .byte 序列
];

/** bank18 全量数据（按原始布局拼接） */
export const BANK18_FULL: ReadonlyArray<number> = [
  ...BANK18_DATA_TABLES,
  ...BANK18_DATA_MAPS,
  ...BANK18_DATA_TAIL,
];
