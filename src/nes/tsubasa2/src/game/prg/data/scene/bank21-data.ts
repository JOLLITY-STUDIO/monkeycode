/**
 * bank21 数据 — 原 bank21 纯数据 bank（$8000-$9FFF, 8KB）
 *
 * 数据组成（从 asm/bank21/*.s 提取）：
 * - data_tables.s：NT 地图 tile 数据
 * - data_maps.s：NT 地图属性数据
 * - data_tail.s：尾部 tile 数据
 *
 * 翻译为声明式 TS 数组，禁止 PRG_BANK_21[addr] 索引。
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** bank21 data_tables 段 */
export const BANK21_DATA_TABLES: ReadonlyArray<number> = [
  // TODO B21: 从 asm/bank21/data_tables.s 提取 .byte 序列
];

/** bank21 data_maps 段 */
export const BANK21_DATA_MAPS: ReadonlyArray<number> = [
  // TODO B21: 从 asm/bank21/data_maps.s 提取 .byte 序列
];

/** bank21 data_tail 段 */
export const BANK21_DATA_TAIL: ReadonlyArray<number> = [
  // TODO B21: 从 asm/bank21/data_tail.s 提取 .byte 序列
];

/** bank21 全量数据（按原始布局拼接） */
export const BANK21_FULL: ReadonlyArray<number> = [
  ...BANK21_DATA_TABLES,
  ...BANK21_DATA_MAPS,
  ...BANK21_DATA_TAIL,
];
