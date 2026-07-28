/**
 * ROM 数据层 — 对应 tsubasa-hex2asm/prg_rom_data.ts
 *
 * 聚合 32 个 MMC3 PRG-ROM bank (8KB each)。
 * 数据直接引用上游 prg_banks/*.ts 的 Uint8Array 导出。
 */

import _PRG_BANK_00 from '../../tsubasa-hex2asm/prg_banks/prg_bank_00_dispatch_scene_engine';
import _PRG_BANK_01 from '../../tsubasa-hex2asm/prg_banks/prg_bank_01_match_jump';
import _PRG_BANK_02 from '../../tsubasa-hex2asm/prg_banks/prg_bank_02_nmi_renderer';
import _PRG_BANK_03 from '../../tsubasa-hex2asm/prg_banks/prg_bank_03_data';
import _PRG_BANK_04 from '../../tsubasa-hex2asm/prg_banks/prg_bank_04_data';
import _PRG_BANK_05 from '../../tsubasa-hex2asm/prg_banks/prg_bank_05_data';
import _PRG_BANK_06 from '../../tsubasa-hex2asm/prg_banks/prg_bank_06_palette_data';
import _PRG_BANK_07 from '../../tsubasa-hex2asm/prg_banks/prg_bank_07_sprite_data';
import _PRG_BANK_08 from '../../tsubasa-hex2asm/prg_banks/prg_bank_08_data';
import _PRG_BANK_09 from '../../tsubasa-hex2asm/prg_banks/prg_bank_09_data';
import _PRG_BANK_10 from '../../tsubasa-hex2asm/prg_banks/prg_bank_10_data';
import _PRG_BANK_11 from '../../tsubasa-hex2asm/prg_banks/prg_bank_11_background';
import _PRG_BANK_12 from '../../tsubasa-hex2asm/prg_banks/prg_bank_12_audio';
import _PRG_BANK_13 from '../../tsubasa-hex2asm/prg_banks/prg_bank_13_data';
import _PRG_BANK_14 from '../../tsubasa-hex2asm/prg_banks/prg_bank_14_data';
import _PRG_BANK_15 from '../../tsubasa-hex2asm/prg_banks/prg_bank_15_data';
import _PRG_BANK_16 from '../../tsubasa-hex2asm/prg_banks/prg_bank_16_scene_logic';
import _PRG_BANK_17 from '../../tsubasa-hex2asm/prg_banks/prg_bank_17_data';
import _PRG_BANK_18 from '../../tsubasa-hex2asm/prg_banks/prg_bank_18_data';
import _PRG_BANK_19 from '../../tsubasa-hex2asm/prg_banks/prg_bank_19_lookup_tables';
import _PRG_BANK_20 from '../../tsubasa-hex2asm/prg_banks/prg_bank_20_team_data';
import _PRG_BANK_21 from '../../tsubasa-hex2asm/prg_banks/prg_bank_21_data';
import _PRG_BANK_22 from '../../tsubasa-hex2asm/prg_banks/prg_bank_22_sprite_engine';
import _PRG_BANK_23 from '../../tsubasa-hex2asm/prg_banks/prg_bank_23_data';
import _PRG_BANK_24 from '../../tsubasa-hex2asm/prg_banks/prg_bank_24_cutscene';
import _PRG_BANK_25 from '../../tsubasa-hex2asm/prg_banks/prg_bank_25_data';
import _PRG_BANK_26 from '../../tsubasa-hex2asm/prg_banks/prg_bank_26_match_core';
import _PRG_BANK_27 from '../../tsubasa-hex2asm/prg_banks/prg_bank_27_player_data';
import _PRG_BANK_28 from '../../tsubasa-hex2asm/prg_banks/prg_bank_28_attributes';
import _PRG_BANK_29 from '../../tsubasa-hex2asm/prg_banks/prg_bank_29_data';
import _PRG_BANK_30 from '../../tsubasa-hex2asm/prg_banks/prg_bank_30_system_lib';
import _PRG_BANK_31 from '../../tsubasa-hex2asm/prg_banks/prg_bank_31_boot_vectors';

/** 全部 PRG-ROM 8KB MMC3 bank（预构建） */
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

export const PRG_8K_BANK_COUNT = 32;

/** MMC3 初始 8KB bank 映射 */
export const MMC3_INIT_MAP: Record<number, number> = {
  0x8000: 0,   // bank 00 (dispatch/scene engine)
  0xA000: 1,   // bank 01 (match jump)
  0xC000: 30,  // bank 30 (system library — 倒数第二固定)
  0xE000: 31,  // bank 31 (boot vectors — 最后固定)
};

export function readPrgRom(
  addr: number,
  banks: Uint8Array[],
  map8k: Record<number, number>,
): number {
  const windowBase = addr & 0xE000;
  const offset = addr & 0x1FFF;
  if (addr < 0x8000) return 0;
  const bank8k = map8k[windowBase] ?? 0;
  return banks[bank8k]?.[offset] ?? 0;
}
