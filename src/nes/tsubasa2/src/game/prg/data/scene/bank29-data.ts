/**
 * bank29 数据 — 原 bank29 纯数据 bank（$8000-$9FFF, 8KB）
 *
 * 数据组成（从 asm/bank29/*.s 提取）：
 * - data_tables.s：NT 地图 tile 数据（场景名/菜单文本 tile）
 * - data_maps.s：NT 地图属性数据
 * - data_tail.s：尾部 tile 数据
 *
 * 翻译为声明式 TS 数组，禁止 PRG_BANK_29[addr] 索引。
 * 当前为 stub（契约占位），逐段提取覆盖。
 */

/** bank29 data_tables 段 */
export const BANK29_DATA_TABLES: ReadonlyArray<number> = [
  // TODO B29: 从 asm/bank29/data_tables.s 提取 .byte 序列
];

/** bank29 data_maps 段 */
export const BANK29_DATA_MAPS: ReadonlyArray<number> = [
  // TODO B29: 从 asm/bank29/data_maps.s 提取 .byte 序列
];

/** bank29 data_tail 段 */
export const BANK29_DATA_TAIL: ReadonlyArray<number> = [
  // TODO B29: 从 asm/bank29/data_tail.s 提取 .byte 序列
];

/** bank29 全量数据（按原始布局拼接） */
export const BANK29_FULL: ReadonlyArray<number> = [
  ...BANK29_DATA_TABLES,
  ...BANK29_DATA_MAPS,
  ...BANK29_DATA_TAIL,
];
