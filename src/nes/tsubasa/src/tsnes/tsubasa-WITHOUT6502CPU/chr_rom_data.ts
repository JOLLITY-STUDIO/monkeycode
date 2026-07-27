/**
 * CHR-ROM 数据 (Pattern Tables) — 由 tools/export_rom_meta.mjs 自动生成
 * 手动拆分后变为索引文件，实际数据在 chr_banks/ 和 vrom_banks/ 中
 *
 * 原始文件: rom.nes
 * Mapper: 4 (MMC3)
 * CHR-ROM: 16 个 8KB bank → 8192 个 tile
 *
 * 每个 tile = 16 bytes (2 bitplane × 8 scanlines)
 * 每个 8KB bank = 512 个 8×8 tile
 *
 * CHR_ROM_BANKS: Uint8Array[] 共 16 个 (8KB each)
 * CHR_VROM_BANKS: Uint8Array[] 共 32 个 (4KB each, 兼容 rom.ts 格式)
 */

import _CHR_BANK_0 from './chr_banks/bank_0_8k';
import _CHR_BANK_1 from './chr_banks/bank_1_8k';
import _CHR_BANK_2 from './chr_banks/bank_2_8k';
import _CHR_BANK_3 from './chr_banks/bank_3_8k';
import _CHR_BANK_4 from './chr_banks/bank_4_8k';
import _CHR_BANK_5 from './chr_banks/bank_5_8k';
import _CHR_BANK_6 from './chr_banks/bank_6_8k';
import _CHR_BANK_7 from './chr_banks/bank_7_8k';
import _CHR_BANK_8 from './chr_banks/bank_8_8k';
import _CHR_BANK_9 from './chr_banks/bank_9_8k';
import _CHR_BANK_10 from './chr_banks/bank_10_8k';
import _CHR_BANK_11 from './chr_banks/bank_11_8k';
import _CHR_BANK_12 from './chr_banks/bank_12_8k';
import _CHR_BANK_13 from './chr_banks/bank_13_8k';
import _CHR_BANK_14 from './chr_banks/bank_14_8k';
import _CHR_BANK_15 from './chr_banks/bank_15_8k';

import _VROM_BANK_0 from './vrom_banks/bank_0_4k';
import _VROM_BANK_1 from './vrom_banks/bank_1_4k';
import _VROM_BANK_2 from './vrom_banks/bank_2_4k';
import _VROM_BANK_3 from './vrom_banks/bank_3_4k';
import _VROM_BANK_4 from './vrom_banks/bank_4_4k';
import _VROM_BANK_5 from './vrom_banks/bank_5_4k';
import _VROM_BANK_6 from './vrom_banks/bank_6_4k';
import _VROM_BANK_7 from './vrom_banks/bank_7_4k';
import _VROM_BANK_8 from './vrom_banks/bank_8_4k';
import _VROM_BANK_9 from './vrom_banks/bank_9_4k';
import _VROM_BANK_10 from './vrom_banks/bank_10_4k';
import _VROM_BANK_11 from './vrom_banks/bank_11_4k';
import _VROM_BANK_12 from './vrom_banks/bank_12_4k';
import _VROM_BANK_13 from './vrom_banks/bank_13_4k';
import _VROM_BANK_14 from './vrom_banks/bank_14_4k';
import _VROM_BANK_15 from './vrom_banks/bank_15_4k';
import _VROM_BANK_16 from './vrom_banks/bank_16_4k';
import _VROM_BANK_17 from './vrom_banks/bank_17_4k';
import _VROM_BANK_18 from './vrom_banks/bank_18_4k';
import _VROM_BANK_19 from './vrom_banks/bank_19_4k';
import _VROM_BANK_20 from './vrom_banks/bank_20_4k';
import _VROM_BANK_21 from './vrom_banks/bank_21_4k';
import _VROM_BANK_22 from './vrom_banks/bank_22_4k';
import _VROM_BANK_23 from './vrom_banks/bank_23_4k';
import _VROM_BANK_24 from './vrom_banks/bank_24_4k';
import _VROM_BANK_25 from './vrom_banks/bank_25_4k';
import _VROM_BANK_26 from './vrom_banks/bank_26_4k';
import _VROM_BANK_27 from './vrom_banks/bank_27_4k';
import _VROM_BANK_28 from './vrom_banks/bank_28_4k';
import _VROM_BANK_29 from './vrom_banks/bank_29_4k';
import _VROM_BANK_30 from './vrom_banks/bank_30_4k';
import _VROM_BANK_31 from './vrom_banks/bank_31_4k';

// ---------- 预构建 Uint8Array[] ----------

/** 全部 CHR-ROM 8KB bank（预构建） */
export const CHR_ROM_BANKS: readonly Uint8Array[] = [
  _CHR_BANK_0,
  _CHR_BANK_1,
  _CHR_BANK_2,
  _CHR_BANK_3,
  _CHR_BANK_4,
  _CHR_BANK_5,
  _CHR_BANK_6,
  _CHR_BANK_7,
  _CHR_BANK_8,
  _CHR_BANK_9,
  _CHR_BANK_10,
  _CHR_BANK_11,
  _CHR_BANK_12,
  _CHR_BANK_13,
  _CHR_BANK_14,
  _CHR_BANK_15
].map(arr => new Uint8Array(arr));

/** 全部 CHR-ROM 4KB bank（兼容 rom.ts vrom 格式，预构建） */
export const CHR_VROM_BANKS: readonly Uint8Array[] = [
  _VROM_BANK_0,
  _VROM_BANK_1,
  _VROM_BANK_2,
  _VROM_BANK_3,
  _VROM_BANK_4,
  _VROM_BANK_5,
  _VROM_BANK_6,
  _VROM_BANK_7,
  _VROM_BANK_8,
  _VROM_BANK_9,
  _VROM_BANK_10,
  _VROM_BANK_11,
  _VROM_BANK_12,
  _VROM_BANK_13,
  _VROM_BANK_14,
  _VROM_BANK_15,
  _VROM_BANK_16,
  _VROM_BANK_17,
  _VROM_BANK_18,
  _VROM_BANK_19,
  _VROM_BANK_20,
  _VROM_BANK_21,
  _VROM_BANK_22,
  _VROM_BANK_23,
  _VROM_BANK_24,
  _VROM_BANK_25,
  _VROM_BANK_26,
  _VROM_BANK_27,
  _VROM_BANK_28,
  _VROM_BANK_29,
  _VROM_BANK_30,
  _VROM_BANK_31
].map(slice => new Uint8Array(slice));

/** CHR-ROM 数据总大小 (bytes) */
export const CHR_ROM_SIZE = 131072;

/** CHR-ROM 8KB bank 数量 */
export const CHR_BANK_COUNT = 16;

/** CHR-ROM 4KB vrom bank 数量 */
export const CHR_VROM_COUNT = 32;
