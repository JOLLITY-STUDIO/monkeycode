/**
 * bank23 数据 — 原 bank23 纯数据 bank（$8000-$9FFF, 8KB）
 *
 * 数据组成（从 asm/bank23/*.s 提取）：
 * - data_tables.s：NT 地图 tile 数据
 * - data_maps.s：NT 地图属性数据
 * - data_tail.s：尾部 tile 数据
 *
 * 翻译为声明式 TS 数组，禁止 PRG_BANK_23[addr] 索引。
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** bank23 data_tables 段 */
export const BANK23_DATA_TABLES: ReadonlyArray<number> = [
  // TODO B23: 从 asm/bank23/data_tables.s 提取 .byte 序列
];

/** bank23 data_maps 段 */
export const BANK23_DATA_MAPS: ReadonlyArray<number> = [
  // TODO B23: 从 asm/bank23/data_maps.s 提取 .byte 序列
];

/** bank23 data_tail 段 */
export const BANK23_DATA_TAIL: ReadonlyArray<number> = [
  // TODO B23: 从 asm/bank23/data_tail.s 提取 .byte 序列
];

/** bank23 全量数据（按原始布局拼接） */
export const BANK23_FULL: ReadonlyArray<number> = [
  ...BANK23_DATA_TABLES,
  ...BANK23_DATA_MAPS,
  ...BANK23_DATA_TAIL,
];
