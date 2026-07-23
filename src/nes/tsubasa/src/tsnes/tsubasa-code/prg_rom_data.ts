/**
 * PRG-ROM 数据索引 — 由 tools/split_prg_banks.mjs 拆分
 *
 * 原始文件: rom.nes
 * Mapper: 4 (MMC3)
 * PRG-ROM: 16 个 16KB bank → 32 个 8KB MMC3 bank
 *
 * PRG_ROM_BANKS: Uint8Array[] 共 16 个
 */

import _PRG_BANK_0 from './prg_banks/bank_0';
import _PRG_BANK_1 from './prg_banks/bank_1';
import _PRG_BANK_2 from './prg_banks/bank_2';
import _PRG_BANK_3 from './prg_banks/bank_3';
import _PRG_BANK_4 from './prg_banks/bank_4';
import _PRG_BANK_5 from './prg_banks/bank_5';
import _PRG_BANK_6 from './prg_banks/bank_6';
import _PRG_BANK_7 from './prg_banks/bank_7';
import _PRG_BANK_8 from './prg_banks/bank_8';
import _PRG_BANK_9 from './prg_banks/bank_9';
import _PRG_BANK_10 from './prg_banks/bank_10';
import _PRG_BANK_11 from './prg_banks/bank_11';
import _PRG_BANK_12 from './prg_banks/bank_12';
import _PRG_BANK_13 from './prg_banks/bank_13';
import _PRG_BANK_14 from './prg_banks/bank_14';
import _PRG_BANK_15 from './prg_banks/bank_15';
import _PRG_BANK_TEST from './prg_banks/bank_test';

/** 全部 PRG-ROM 16KB bank（预构建 Uint8Array） */
export const PRG_ROM_BANKS: readonly Uint8Array[] = [
  _PRG_BANK_0,
  _PRG_BANK_1,
  _PRG_BANK_2,
  _PRG_BANK_3,
  _PRG_BANK_4,
  _PRG_BANK_5,
  _PRG_BANK_6,
  _PRG_BANK_7,
  _PRG_BANK_8,
  _PRG_BANK_9,
  _PRG_BANK_10,
  _PRG_BANK_11,
  _PRG_BANK_12,
  _PRG_BANK_13,
  _PRG_BANK_14,
  _PRG_BANK_15,
].map(arr => new Uint8Array(arr));

/** 测试版：bank_15 替换为全 $02 → RESET=$FFF0 处非法指令立即崩溃 */
export const PRG_ROM_BANKS_TEST: readonly Uint8Array[] = [
  _PRG_BANK_0,
  _PRG_BANK_1,
  _PRG_BANK_2,
  _PRG_BANK_3,
  _PRG_BANK_4,
  _PRG_BANK_5,
  _PRG_BANK_6,
  _PRG_BANK_7,
  _PRG_BANK_8,
  _PRG_BANK_9,
  _PRG_BANK_10,
  _PRG_BANK_11,
  _PRG_BANK_12,
  _PRG_BANK_13,
  _PRG_BANK_14,
  _PRG_BANK_TEST,
].map(arr => new Uint8Array(arr));

// ---------- MMC3 Bank 读取 ----------

/** PRG-ROM 总 8KB bank 数量 */
export const PRG_8K_BANK_COUNT = 32;

/** MMC3 初始 8KB bank 映射 */
export const MMC3_INIT_MAP: Record<number, number> = {
  0x8000: 0,
  0xA000: 1,
  0xC000: 30,
  0xE000: 31,
};

/**
 * 从 PRG-ROM 读取 1 字节 (MMC3 映射)
 */
export function readPrgRom(
  addr: number,
  banks: Uint8Array[],
  map8k: Record<number, number>,
): number {
  const windowBase = addr & 0xE000;
  const offset = addr & 0x1FFF;
  if (addr < 0x8000) return 0;
  const bank8k = map8k[windowBase] ?? 0;
  const bank16k = bank8k >> 1;
  const bankOffset = (bank8k & 1) * 0x2000;
  if (bank16k >= banks.length) return 0;
  return banks[bank16k][bankOffset + offset];
}
