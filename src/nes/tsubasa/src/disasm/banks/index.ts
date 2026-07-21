/**
 * Bank 统一导出模块 — 15 代码 banks + 33 数据 banks (工厂生成)
 *
 * 代码 bank 有各自独特后缀描述功能:
 *   _dispatch  _match    _nmi     _bg      _audio
 *   _scene     _lookup   _team    _sprite  _cutscene
 *   _matchcore _player   _attr    _sys     _boot
 *
 * 数据 bank (03~10,13~15,17~18,21,23,25,29,32~47):
 *   由 _romdata/ 工厂函数动态生成, 无需独立壳文件
 */

import type { BankModule, BankRomSlice } from './_bank_types';
import { registerBank } from './_crossbank';

// ── 代码 bank imports ──
import { bank_00 } from './bank_00_dispatch';
import { bank_01 } from './bank_01_match';
import { bank_02 } from './bank_02_nmi';
import { bank_11 } from './bank_11_bg';
import { bank_12 } from './bank_12_audio';
import { bank_16 } from './bank_16_scene';
import { bank_19 } from './bank_19_lookup';
import { bank_20 } from './bank_20_team';
import { bank_22 } from './bank_22_sprite';
import { bank_24 } from './bank_24_cutscene';
import { bank_26 } from './bank_26_matchcore';
import { bank_27 } from './bank_27_player';
import { bank_28 } from './bank_28_attr';
import { bank_30 } from './bank_30_sys';
import { bank_31 } from './bank_31_boot';

// ── ROM data imports (for data-only bank stubs) ──
import { ROM as _r03 } from './_romdata/bank_03_data';
import { ROM as _r04 } from './_romdata/bank_04_data';
import { ROM as _r05 } from './_romdata/bank_05_data';
import { ROM as _r06 } from './_romdata/bank_06_data';
import { ROM as _r07 } from './_romdata/bank_07_data';
import { ROM as _r08 } from './_romdata/bank_08_data';
import { ROM as _r09 } from './_romdata/bank_09_data';
import { ROM as _r10 } from './_romdata/bank_10_data';
import { ROM as _r13 } from './_romdata/bank_13_data';
import { ROM as _r14 } from './_romdata/bank_14_data';
import { ROM as _r15 } from './_romdata/bank_15_data';
import { ROM as _r17 } from './_romdata/bank_17_data';
import { ROM as _r18 } from './_romdata/bank_18_data';
import { ROM as _r21 } from './_romdata/bank_21_data';
import { ROM as _r23 } from './_romdata/bank_23_data';
import { ROM as _r25 } from './_romdata/bank_25_data';
import { ROM as _r29 } from './_romdata/bank_29_data';
import { ROM as _r32 } from './_romdata/bank_32_data';
import { ROM as _r33 } from './_romdata/bank_33_data';
import { ROM as _r34 } from './_romdata/bank_34_data';
import { ROM as _r35 } from './_romdata/bank_35_data';
import { ROM as _r36 } from './_romdata/bank_36_data';
import { ROM as _r37 } from './_romdata/bank_37_data';
import { ROM as _r38 } from './_romdata/bank_38_data';
import { ROM as _r39 } from './_romdata/bank_39_data';
import { ROM as _r40 } from './_romdata/bank_40_data';
import { ROM as _r41 } from './_romdata/bank_41_data';
import { ROM as _r42 } from './_romdata/bank_42_data';
import { ROM as _r43 } from './_romdata/bank_43_data';
import { ROM as _r44 } from './_romdata/bank_44_data';
import { ROM as _r45 } from './_romdata/bank_45_data';
import { ROM as _r46 } from './_romdata/bank_46_data';
import { ROM as _r47 } from './_romdata/bank_47_data';
const _DATA_BANK_ROMS: Record<number, Uint8Array> = {
  3: _r03,   4: _r04,   5: _r05,   6: _r06,   7: _r07,
  8: _r08,   9: _r09,  10: _r10,  13: _r13,  14: _r14,
  15: _r15, 17: _r17, 18: _r18, 21: _r21, 23: _r23,
  25: _r25, 29: _r29, 32: _r32, 33: _r33, 34: _r34,
  35: _r35, 36: _r36, 37: _r37, 38: _r38, 39: _r39,
  40: _r40, 41: _r41, 42: _r42, 43: _r43, 44: _r44,
  45: _r45, 46: _r46, 47: _r47,
};

// ── Data bank 工厂 ──
const _emptyDispatch = () => {};
const _emptyFns: Record<string, never> = {};

function _mkDataBank(rom: Uint8Array, bankNum: number): BankModule {
  const data = rom;
  return {
    rom: {
      u8(offset: number) { return data[offset] ?? 0; },
      u16le(offset: number) { return (data[offset] ?? 0) | ((data[offset + 1] ?? 0) << 8); },
      data,
      romBase: bankNum * 0x2000 + 0x10,
    },
    dispatch: _emptyDispatch,
    fns: _emptyFns,
  };
}

// ── allBanks (48 entries) ──
export const allBanks: Record<number, BankModule> = {
  // code banks
  0:  bank_00,
  1:  bank_01,
  2:  bank_02,
  11: bank_11,
  12: bank_12,
  16: bank_16,
  19: bank_19,
  20: bank_20,
  22: bank_22,
  24: bank_24,
  26: bank_26,
  27: bank_27,
  28: bank_28,
  30: bank_30,
  31: bank_31,
  // data banks (generated)
  3:  _mkDataBank(_r03, 3),
  4:  _mkDataBank(_r04, 4),
  5:  _mkDataBank(_r05, 5),
  6:  _mkDataBank(_r06, 6),
  7:  _mkDataBank(_r07, 7),
  8:  _mkDataBank(_r08, 8),
  9:  _mkDataBank(_r09, 9),
  10: _mkDataBank(_r10, 10),
  13: _mkDataBank(_r13, 13),
  14: _mkDataBank(_r14, 14),
  15: _mkDataBank(_r15, 15),
  17: _mkDataBank(_r17, 17),
  18: _mkDataBank(_r18, 18),
  21: _mkDataBank(_r21, 21),
  23: _mkDataBank(_r23, 23),
  25: _mkDataBank(_r25, 25),
  29: _mkDataBank(_r29, 29),
  32: _mkDataBank(_r32, 32),
  33: _mkDataBank(_r33, 33),
  34: _mkDataBank(_r34, 34),
  35: _mkDataBank(_r35, 35),
  36: _mkDataBank(_r36, 36),
  37: _mkDataBank(_r37, 37),
  38: _mkDataBank(_r38, 38),
  39: _mkDataBank(_r39, 39),
  40: _mkDataBank(_r40, 40),
  41: _mkDataBank(_r41, 41),
  42: _mkDataBank(_r42, 42),
  43: _mkDataBank(_r43, 43),
  44: _mkDataBank(_r44, 44),
  45: _mkDataBank(_r45, 45),
  46: _mkDataBank(_r46, 46),
  47: _mkDataBank(_r47, 47),
};

// Register all banks for cross-bank dispatch
for (let i = 0; i < 48; i++) {
  registerBank(i, allBanks[i]);
}

export type { BankModule, BankFn, BankRomSlice, RomReader, BankSection, SectionType } from './_bank_types';
export { VECTORS } from './bank_31_boot';
