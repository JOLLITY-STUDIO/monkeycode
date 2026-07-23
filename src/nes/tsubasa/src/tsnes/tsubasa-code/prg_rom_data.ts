/**
 * PRG-ROM 数据 — 由 tools/export_prg_rom.mjs 自动生成
 * 
 * 原始文件: rom.nes
 * Mapper: 4 (MMC3)
 * PRG-ROM: 16 个 16KB bank → 32 个 8KB MMC3 bank
 * 
 * PRG_ROM_BANKS: Uint8Array[] 共 16 个
 * 数据源: prg_banks/bank_N.ts
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

// ---------- 预构建 Uint8Array[] ----------

/** 全部 PRG-ROM 16KB bank（预构建，初次 import 即就绪） */
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
  _PRG_BANK_15
].map(arr => new Uint8Array(arr));

// ---------- MMC3 Bank 读取 ----------

/** PRG-ROM 总 8KB bank 数量 */
export const PRG_8K_BANK_COUNT = 32;

/** MMC3 初始 8KB bank 映射 */
export const MMC3_INIT_MAP: Record<number, number> = {
  0x8000: 0,   // 第一个 8KB
  0xA000: 1,// 第二个 8KB
  0xC000: 30,// 倒数第二个 8KB (固定)
  0xE000: 31,   // 最后一个 8KB (固定)
};

/**
 * 从 PRG-ROM 读取 1 字节 (MMC3 映射)
 * @param addr CPU 地址 (0x4020 ~ 0xFFFF)
 * @param banks PRG-ROM 16KB bank 数组
 * @param map8k 当前 8KB bank 映射表 (key=窗口基地址, value=8KB bank 索引)
 */
export function readPrgRom(
  addr: number,
  banks: Uint8Array[],
  map8k: Record<number, number>,
): number {
  // 确定属于哪个 8KB 窗口
  const windowBase = addr & 0xE000; // 0x8000, 0xA000, 0xC000, or 0xE000
  const offset = addr & 0x1FFF;     // 0x0000 ~ 0x1FFF

  if (addr < 0x8000) {
    // 0x4020-0x5FFF: 通常为 PRG-RAM / mapper 寄存器区
    // 0x6000-0x7FFF: SRAM / Save RAM (MMC3)
    // 返回 0 (open bus 模拟)
    return 0;
  }

  const bank8k = map8k[windowBase] ?? 0;
  const bank16k = bank8k >> 1;
  const bankOffset = (bank8k & 1) * 0x2000;

  if (bank16k >= banks.length) return 0;
  return banks[bank16k][bankOffset + offset];
}
