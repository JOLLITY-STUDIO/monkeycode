/**
 * PRG-ROM 数据 — 由 tools/export_prg_rom.mjs 自动生成
 * 
 * 原始文件: rom.nes
 * Mapper: 4 (MMC3)
 * PRG-ROM: 32 个 8KB MMC3 bank
 * 
 * PRG_ROM_BANKS: Uint8Array[] 共 32 个 (每项 8KB)
 * 数据源: prg_banks/bank_NN.ts
 */

import _PRG_BANK_00 from './prg_banks/bank_00';
import _PRG_BANK_01 from './prg_banks/bank_01';
import _PRG_BANK_02 from './prg_banks/bank_02';
import _PRG_BANK_03 from './prg_banks/bank_03';
import _PRG_BANK_04 from './prg_banks/bank_04';
import _PRG_BANK_05 from './prg_banks/bank_05';
import _PRG_BANK_06 from './prg_banks/bank_06';
import _PRG_BANK_07 from './prg_banks/bank_07';
import _PRG_BANK_08 from './prg_banks/bank_08';
import _PRG_BANK_09 from './prg_banks/bank_09';
import _PRG_BANK_10 from './prg_banks/bank_10';
import _PRG_BANK_11 from './prg_banks/bank_11';
import _PRG_BANK_12 from './prg_banks/bank_12';
import _PRG_BANK_13 from './prg_banks/bank_13';
import _PRG_BANK_14 from './prg_banks/bank_14';
import _PRG_BANK_15 from './prg_banks/bank_15';
import _PRG_BANK_16 from './prg_banks/bank_16';
import _PRG_BANK_17 from './prg_banks/bank_17';
import _PRG_BANK_18 from './prg_banks/bank_18';
import _PRG_BANK_19 from './prg_banks/bank_19';
import _PRG_BANK_20 from './prg_banks/bank_20';
import _PRG_BANK_21 from './prg_banks/bank_21';
import _PRG_BANK_22 from './prg_banks/bank_22';
import _PRG_BANK_23 from './prg_banks/bank_23';
import _PRG_BANK_24 from './prg_banks/bank_24';
import _PRG_BANK_25 from './prg_banks/bank_25';
import _PRG_BANK_26 from './prg_banks/bank_26';
import _PRG_BANK_27 from './prg_banks/bank_27';
import _PRG_BANK_28 from './prg_banks/bank_28';
import _PRG_BANK_29 from './prg_banks/bank_29';
import _PRG_BANK_30 from './prg_banks/bank_30';
import _PRG_BANK_31 from './prg_banks/bank_31';

// ---------- 预构建 Uint8Array[] ----------

/** 全部 PRG-ROM 8KB MMC3 bank（预构建，初次 import 即就绪） */
export const PRG_ROM_BANKS: readonly Uint8Array[] = [
  _PRG_BANK_00, _PRG_BANK_01, _PRG_BANK_02, _PRG_BANK_03,
  _PRG_BANK_04, _PRG_BANK_05, _PRG_BANK_06, _PRG_BANK_07,
  _PRG_BANK_08, _PRG_BANK_09, _PRG_BANK_10, _PRG_BANK_11,
  _PRG_BANK_12, _PRG_BANK_13, _PRG_BANK_14, _PRG_BANK_15,
  _PRG_BANK_16, _PRG_BANK_17, _PRG_BANK_18, _PRG_BANK_19,
  _PRG_BANK_20, _PRG_BANK_21, _PRG_BANK_22, _PRG_BANK_23,
  _PRG_BANK_24, _PRG_BANK_25, _PRG_BANK_26, _PRG_BANK_27,
  _PRG_BANK_28, _PRG_BANK_29, _PRG_BANK_30, _PRG_BANK_31,
].map(arr => new Uint8Array(arr));

// ---------- MMC3 Bank 读取 ----------

/** PRG-ROM 总 8KB bank 数量 */
export const PRG_8K_BANK_COUNT = 32;

/** MMC3 初始 8KB bank 映射 */
export const MMC3_INIT_MAP: Record<number, number> = {
  0x8000: 0,   // 第一个 8KB
  0xA000: 1,   // 第二个 8KB
  0xC000: 30,  // 倒数第二个 8KB (固定)
  0xE000: 31,  // 最后一个 8KB (固定)
};

/**
 * 从 PRG-ROM 读取 1 字节 (MMC3 映射)
 * @param addr CPU 地址 (0x4020 ~ 0xFFFF)
 * @param banks PRG-ROM 8KB bank 数组 (长度 = PRG_8K_BANK_COUNT)
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
  return banks[bank8k]?.[offset] ?? 0;
}
