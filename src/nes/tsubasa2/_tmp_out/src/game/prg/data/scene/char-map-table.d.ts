/**
 * char-map-table — bank03-06 剧情脚本文本字符映射表 ($00-$D7)
 *
 * 说明: bank03-06 纯脚本数据 bank (CPU $A000-$BFFF), 文本字节为
 *   - $00-$9F 单 tile (直接写 tile = 字符码)
 *   - $A0-$D7 双 tile (第一 tile $94 或 $95, 第二 tile 查表)
 *
 * 字符编码约定 (从 CHR bank0 tile 渲染 + 脚本文本反推):
 *   - $00        空格
 *   - $01-$2E    片假名 ア〜ン (aiueo 行顺)
 *   - $2F-$32    标点/小记号
 *   - $33-$3C    数字 0-9
 *   - $3D-$40    符号
 *   - $41-$5A    ASCII 大写 A-Z
 *   - $5B-$7F    符号/标点
 *   - $80-$9F    片假名浊音/特殊
 *   - $A0-$B3    双 tile 浊音片假名 ガギグゲゴ ザジズゼゾ ダヂヅデド バビブベボ
 *   - $B4-$D7    双 tile 特殊/大写 ASCII (hi tile $95)
 *
 * 这是脚本翻译层最终产物, 禁止对 PRG_BANK 原始字节随机访问。
 */
/** 单 tile 字符边界 (>= 此值进入双 tile 分支) */
export declare const DOUBLE_TILE_THRESHOLD = 160;
/** 双 tile 第一 tile 基址: 字符码 < 0xC8 用 0x94, >= 0xC8 用 0x95 */
export declare const DOUBLE_TILE_BASE = 148;
/** 双 tile 范围 */
export declare const DOUBLE_TILE_COUNT = 96;
/**
 * 单 tile 字符映射表 (字符码 $00-$9F → 可读字符)
 * 由 CHR bank0 tile 渲染识别: $01-$2E 片假名, $33-$3C 数字, $41-$5A A-Z。
 */
export declare const CHAR_MAP_SINGLE: Record<number, string>;
/**
 * 双 tile 字符映射表 (字符码 $A0-$D7 → 第二 tile 图案)
 * 第一 tile 由 CharMap.decode 依据字符码判定 ($94 或 $95)。
 * 图案 = 第二 tile 序号 (单元素数组, 与渲染层约定一致)。
 */
export declare const CHAR_MAP_DOUBLE: Record<number, readonly number[]>;
/**
 * 完整字符映射表 ($00-$D7 → 可读字符)。
 * 用于 textscript 文本解码: 单 tile 查 CHAR_MAP_SINGLE, 双 tile 查 CHAR_MAP_DOUBLE_CHAR。
 */
export declare const CHAR_MAP_FULL: Record<number, string>;
/** 双 tile 可读字符子表 ($A0-$D7) */
export declare const CHAR_MAP_DOUBLE_CHAR: Record<number, string>;
/** 双 tile 条目类型 (供外部引用) */
export interface CharMapDoubleEntry {
    /** 双 tile 第二 tile 序号 */
    loTile: number;
    /** 可读字符 (可空) */
    char?: string;
}
