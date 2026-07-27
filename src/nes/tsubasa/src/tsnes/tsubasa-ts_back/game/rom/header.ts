/**
 * ROM 元数据 — 天使之翼 II 专用常量 + 构造器
 */

// ═══════════════ 本 ROM 固定值 ═══════════════

/** PRG-ROM: 32 个 8KB bank = 262144 字节 */
export const PRG_BANK_COUNT = 32;
export const PRG_BANK_SIZE  = 8192;
export const PRG_ROM_SIZE   = PRG_BANK_COUNT * PRG_BANK_SIZE;

/** CHR-ROM: 32 个 4KB vrom bank = 131072 字节 */
export const CHR_VROM_COUNT = 32;
export const CHR_VROM_SIZE  = 4096;
export const CHR_BANK_SIZE_8K = 8192;
export const CHR_BANK_COUNT_8K = 16;
export const CHR_ROM_SIZE   = CHR_VROM_COUNT * CHR_VROM_SIZE;

/** Mapper 编号 (MMC3) */
export const MAPPER_NUM = 4;

/** Mirroring: 水平 */
export const MIRRORING = 0;

/** 无 trainer、无电池 RAM */
export const HAS_TRAINER    = false;
export const HAS_BATTERY_RAM = false;

/** PRG-RAM / CHR-RAM = 0 */
export const PRG_RAM_SIZE = 0;
export const CHR_RAM_SIZE = 0;

/** NES 2.0 格式 */
export const IS_NES20 = true;

// ═══════════════ 构造器 ═══════════════

import { parseHeader } from '../../core/header';

/**
 * 构建天使之翼 II 的固定 RomHeader
 */
export function createTsubasaHeader() {
  return parseHeader([
    78, 69, 83, 26,   // NES\x1A
    16, 16,           // PRG=16 pages, CHR=16 pages
    64,               // flags6: mapper lo=4, mirror=0
    8,                // flags7: NES 2.0, mapper hi=0
    0, 0, 0, 0,       // NES 2.0 扩展
    0, 0,             // PRG-RAM, CHR-RAM
    0, 1,             // timing=NTSC, console=NES
  ]);
}
