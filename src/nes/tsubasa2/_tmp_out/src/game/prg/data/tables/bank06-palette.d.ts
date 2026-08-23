/**
 * PALETTE_BANK_06 — bank06 调色板数据 (从 bank06 混合 bank 拆出)
 * @bank 06
 *
 * bank06 是混合 bank: 前 $1000 字节是脚本 (见 scripts-bank-06.ts),
 * $1000+ 是调色板数据。本文件单独导出调色板, 供 paletteLoadBG/paletteLoadSPR 读取。
 *
 * 来源: asm/bank06 $B000-$B0FF (BG) + $B300-$B3FF (SPR)
 *       即 bank06 内偏移 $1000 / $1300
 *   paletteLoadBG (GameSystemService $9AB8): 读 $B000+idx*16 → 16B BG 调色板
 *   paletteLoadSPR (GameSystemService $9ADA): 读 $B300+idx*16 → 16B SPR 调色板
 */
/** BG 调色板 8 组×16B=128B ($B000, paletteLoadBG 读取) */
export declare const PALETTE_BG_06: readonly (readonly number[])[];
/** SPR 调色板 8 组×16B=128B ($B300, paletteLoadSPR 读取) */
export declare const PALETTE_SPR_06: readonly (readonly number[])[];
/** 按 BG 索引查 16 字节调色板 (等价 paletteLoadBG: $B000+idx*16) */
export declare function getPaletteBG06(idx: number): readonly number[];
/** 按 SPR 索引查 16 字节调色板 (等价 paletteLoadSPR: $B300+idx*16) */
export declare function getPaletteSPR06(idx: number): readonly number[];
