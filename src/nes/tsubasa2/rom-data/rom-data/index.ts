/**
 * ROM 数据聚合 — 从原始 .nes 文件自动生成
 * 来源: Captain Tsubasa II - Super Striker (Japan)
 * Mapper: 4 (MMC3)
 * PRG: 32 × 8KB, CHR: 16 × 8KB
 * 自动生成，请勿手动编辑。
 */

import _prg00 from './prg-bank-00';
import _prg01 from './prg-bank-01';
import _prg02 from './prg-bank-02';
import _prg03 from './prg-bank-03';
import _prg04 from './prg-bank-04';
import _prg05 from './prg-bank-05';
import _prg06 from './prg-bank-06';
import _prg07 from './prg-bank-07';
import _prg08 from './prg-bank-08';
import _prg09 from './prg-bank-09';
import _prg10 from './prg-bank-10';
import _prg11 from './prg-bank-11';
import _prg12 from './prg-bank-12';
import _prg13 from './prg-bank-13';
import _prg14 from './prg-bank-14';
import _prg15 from './prg-bank-15';
import _prg16 from './prg-bank-16';
import _prg17 from './prg-bank-17';
import _prg18 from './prg-bank-18';
import _prg19 from './prg-bank-19';
import _prg20 from './prg-bank-20';
import _prg21 from './prg-bank-21';
import _prg22 from './prg-bank-22';
import _prg23 from './prg-bank-23';
import _prg24 from './prg-bank-24';
import _prg25 from './prg-bank-25';
import _prg26 from './prg-bank-26';
import _prg27 from './prg-bank-27';
import _prg28 from './prg-bank-28';
import _prg29 from './prg-bank-29';
import _prg30 from './prg-bank-30';
import _prg31 from './prg-bank-31';

import _chr00 from './chr-bank-00';
import _chr01 from './chr-bank-01';
import _chr02 from './chr-bank-02';
import _chr03 from './chr-bank-03';
import _chr04 from './chr-bank-04';
import _chr05 from './chr-bank-05';
import _chr06 from './chr-bank-06';
import _chr07 from './chr-bank-07';
import _chr08 from './chr-bank-08';
import _chr09 from './chr-bank-09';
import _chr10 from './chr-bank-10';
import _chr11 from './chr-bank-11';
import _chr12 from './chr-bank-12';
import _chr13 from './chr-bank-13';
import _chr14 from './chr-bank-14';
import _chr15 from './chr-bank-15';

/** 完整 PRG-ROM (32 × 8KB = 262144 bytes) */
export const NES_PRG_ROM: readonly number[] = [
  ..._prg00,
  ..._prg01,
  ..._prg02,
  ..._prg03,
  ..._prg04,
  ..._prg05,
  ..._prg06,
  ..._prg07,
  ..._prg08,
  ..._prg09,
  ..._prg10,
  ..._prg11,
  ..._prg12,
  ..._prg13,
  ..._prg14,
  ..._prg15,
  ..._prg16,
  ..._prg17,
  ..._prg18,
  ..._prg19,
  ..._prg20,
  ..._prg21,
  ..._prg22,
  ..._prg23,
  ..._prg24,
  ..._prg25,
  ..._prg26,
  ..._prg27,
  ..._prg28,
  ..._prg29,
  ..._prg30,
  ..._prg31,
];

/** 完整 CHR-ROM (16 × 8KB = 131072 bytes) */
export const NES_CHR_ROM: readonly number[] = [
  ..._chr00,
  ..._chr01,
  ..._chr02,
  ..._chr03,
  ..._chr04,
  ..._chr05,
  ..._chr06,
  ..._chr07,
  ..._chr08,
  ..._chr09,
  ..._chr10,
  ..._chr11,
  ..._chr12,
  ..._chr13,
  ..._chr14,
  ..._chr15,
];

/** PRG-ROM 总大小 (bytes) */
export const PRG_ROM_SIZE = 262144;

/** CHR-ROM 总大小 (bytes) */
export const CHR_ROM_SIZE = 131072;

/** Mapper 编号 */
export const NES_MAPPER = 4;
