/**
 * match-pattern-table.ts — 比赛精灵 pattern 数据 (PRG 物理 bank 18/19)
 * 来源: docs/roms/Captain Tsubasa II - Super Striker (Japan).nes
 *   PRG bank 18 = ROM 偏移 0x24010, bank 19 = 0x26010 (各 0x2000B)
 *
 * fn_85C2 (bank11) 原通过 MMC3 R7 切换 $A000 窗口为物理 bank 12/13 (即
 * PRG bank 18/19) 读取图案字节; H5 直读本表, 不再模拟 bank 切换。
 */
/** PRG bank 18 (MMC3 R7=0x12, fn_85C2 pattern 数据源) */
export declare const MATCH_PATTERN_BANK_18: readonly number[];
/** PRG bank 19 (MMC3 R7=0x13, fn_85C2 pattern 数据源) */
export declare const MATCH_PATTERN_BANK_19: readonly number[];
