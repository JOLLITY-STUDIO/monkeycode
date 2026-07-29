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

import _PRG_BANK_00 from './prg_banks/prg_bank_00_dispatch_scene_engine';
import _PRG_BANK_01 from './prg_banks/prg_bank_01_match_jump';
import _PRG_BANK_02 from './prg_banks/prg_bank_02_nmi_renderer';
import _PRG_BANK_03 from './prg_banks/prg_bank_03_data';
import _PRG_BANK_04 from './prg_banks/prg_bank_04_data';
import _PRG_BANK_05 from './prg_banks/prg_bank_05_data';
import _PRG_BANK_06 from './prg_banks/prg_bank_06_palette_data';
import _PRG_BANK_07 from './prg_banks/prg_bank_07_sprite_data';
import _PRG_BANK_08 from './prg_banks/prg_bank_08_data';
import _PRG_BANK_09 from './prg_banks/prg_bank_09_data';
import _PRG_BANK_10 from './prg_banks/prg_bank_10_data';
import _PRG_BANK_11 from './prg_banks/prg_bank_11_background';
import _PRG_BANK_12 from './prg_banks/prg_bank_12_audio';
import _PRG_BANK_13 from './prg_banks/prg_bank_13_data';
import _PRG_BANK_14 from './prg_banks/prg_bank_14_data';
import _PRG_BANK_15 from './prg_banks/prg_bank_15_data';
import _PRG_BANK_16 from './prg_banks/prg_bank_16_scene_logic';
import _PRG_BANK_17 from './prg_banks/prg_bank_17_data';
import _PRG_BANK_18 from './prg_banks/prg_bank_18_data';
import _PRG_BANK_19 from './prg_banks/prg_bank_19_lookup_tables';
import _PRG_BANK_20 from './prg_banks/prg_bank_20_team_data';
import _PRG_BANK_21 from './prg_banks/prg_bank_21_data';
import _PRG_BANK_22 from './prg_banks/prg_bank_22_sprite_engine';
import _PRG_BANK_23 from './prg_banks/prg_bank_23_data';
import _PRG_BANK_24 from './prg_banks/prg_bank_24_cutscene';
import _PRG_BANK_25 from './prg_banks/prg_bank_25_data';
import _PRG_BANK_26 from './prg_banks/prg_bank_26_match_core';
import _PRG_BANK_27 from './prg_banks/prg_bank_27_player_data';
import _PRG_BANK_28 from './prg_banks/prg_bank_28_attributes';
import _PRG_BANK_29 from './prg_banks/prg_bank_29_data';
import _PRG_BANK_30 from './prg_banks/prg_bank_30_system_lib';
import _PRG_BANK_31 from './prg_banks/prg_bank_31_boot_vectors';

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

/** MMC3 PRG bank index → 源文件名 (用于调试交叉引用) */
export const PRG_BANK_FILE_NAMES: Record<number, string> = {
  0:  "prg_bank_00_dispatch_scene_engine.ts",
  1:  "prg_bank_01_match_jump.ts",
  2:  "prg_bank_02_nmi_renderer.ts",
  3:  "prg_bank_03_data.ts",
  4:  "prg_bank_04_data.ts",
  5:  "prg_bank_05_data.ts",
  6:  "prg_bank_06_palette_data.ts",
  7:  "prg_bank_07_sprite_data.ts",
  8:  "prg_bank_08_data.ts",
  9:  "prg_bank_09_data.ts",
  10: "prg_bank_10_data.ts",
  11: "prg_bank_11_background.ts",
  12: "prg_bank_12_audio.ts",
  13: "prg_bank_13_data.ts",
  14: "prg_bank_14_data.ts",
  15: "prg_bank_15_data.ts",
  16: "prg_bank_16_scene_logic.ts",
  17: "prg_bank_17_data.ts",
  18: "prg_bank_18_data.ts",
  19: "prg_bank_19_lookup_tables.ts",
  20: "prg_bank_20_team_data.ts",
  21: "prg_bank_21_data.ts",
  22: "prg_bank_22_sprite_engine.ts",
  23: "prg_bank_23_data.ts",
  24: "prg_bank_24_cutscene.ts",
  25: "prg_bank_25_data.ts",
  26: "prg_bank_26_match_core.ts",
  27: "prg_bank_27_player_data.ts",
  28: "prg_bank_28_attributes.ts",
  29: "prg_bank_29_data.ts",
  30: "prg_bank_30_system_lib.ts",
  31: "prg_bank_31_boot_vectors.ts",
};
