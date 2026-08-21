/**
 * 字符双 tile 映射表 $8A14 — ROM 字符编码 → 双 tile 图案 (文本渲染)
 *
 * 说明: 原表 $8A14 位于 bank0, 被 $88CA 字符处理子程以
 *   `LDA $8A14,Y` (Y = 字符码 0xA0-0xFF) 索引, 返回第二 tile 图案。
 * 该表与 bank0 代码区交错, 反汇编未能单独标出, 由文本渲染场景
 * (opening/title/story) 提供真实图案数据。此处为结构占位。
 *
 * 字形约定 (bank0 文本 tile 集):
 *   字符码 < 0xA0: 单 tile (tile = 字符码, 直接写)
 *   字符码 >= 0xA0: 双 tile (第一 tile 0x94 或 0x95, 第二 tile 查本表)
 */
export const CHAR_MAP_DOUBLE: Record<number, readonly number[]> = {};

/** 单 tile 字符边界 (>= 此值进入双 tile 分支) */
export const DOUBLE_TILE_THRESHOLD = 0xa0;

/** 双 tile 第一 tile 基址: 字符码 < 0xC8 用 0x94, >= 0xC8 用 0x95 */
export const DOUBLE_TILE_BASE = 0x94;

/** 双 tile 范围 */
export const DOUBLE_TILE_COUNT = 0x60;
