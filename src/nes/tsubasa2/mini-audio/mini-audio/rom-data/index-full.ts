/**
 * mini-audio ROM 数据 — 完整版 (32 PRG + 16 CHR bank)
 * 
 * 包含所有 bank，保留 DMC 样本数据和战斗音效。
 * 切换：将 game-audio.ts 的 import 从 './index' 改为 './index-full'
 */
import _prg00 from '../../rom-data/prg-bank-00';
import _prg01 from '../../rom-data/prg-bank-01';
import _prg02 from '../../rom-data/prg-bank-02';
import _prg03 from '../../rom-data/prg-bank-03';
import _prg04 from '../../rom-data/prg-bank-04';
import _prg05 from '../../rom-data/prg-bank-05';
import _prg06 from '../../rom-data/prg-bank-06';
import _prg07 from '../../rom-data/prg-bank-07';
import _prg08 from '../../rom-data/prg-bank-08';
import _prg09 from '../../rom-data/prg-bank-09';
import _prg10 from '../../rom-data/prg-bank-10';
import _prg11 from '../../rom-data/prg-bank-11';
import _prg12 from '../../rom-data/prg-bank-12';
import _prg13 from '../../rom-data/prg-bank-13';
import _prg14 from '../../rom-data/prg-bank-14';
import _prg15 from '../../rom-data/prg-bank-15';
import _prg16 from '../../rom-data/prg-bank-16';
import _prg17 from '../../rom-data/prg-bank-17';
import _prg18 from '../../rom-data/prg-bank-18';
import _prg19 from '../../rom-data/prg-bank-19';
import _prg20 from '../../rom-data/prg-bank-20';
import _prg21 from '../../rom-data/prg-bank-21';
import _prg22 from '../../rom-data/prg-bank-22';
import _prg23 from '../../rom-data/prg-bank-23';
import _prg24 from '../../rom-data/prg-bank-24';
import _prg25 from '../../rom-data/prg-bank-25';
import _prg26 from '../../rom-data/prg-bank-26';
import _prg27 from '../../rom-data/prg-bank-27';
import _prg28 from '../../rom-data/prg-bank-28';
import _prg29 from '../../rom-data/prg-bank-29';
import _prg30 from '../../rom-data/prg-bank-30';
import _prg31 from '../../rom-data/prg-bank-31';

import _chr00 from '../../rom-data/chr-bank-00';
import _chr01 from '../../rom-data/chr-bank-01';
import _chr02 from '../../rom-data/chr-bank-02';
import _chr03 from '../../rom-data/chr-bank-03';
import _chr04 from '../../rom-data/chr-bank-04';
import _chr05 from '../../rom-data/chr-bank-05';
import _chr06 from '../../rom-data/chr-bank-06';
import _chr07 from '../../rom-data/chr-bank-07';
import _chr08 from '../../rom-data/chr-bank-08';
import _chr09 from '../../rom-data/chr-bank-09';
import _chr10 from '../../rom-data/chr-bank-10';
import _chr11 from '../../rom-data/chr-bank-11';
import _chr12 from '../../rom-data/chr-bank-12';
import _chr13 from '../../rom-data/chr-bank-13';
import _chr14 from '../../rom-data/chr-bank-14';
import _chr15 from '../../rom-data/chr-bank-15';

const BANK_8K = 8192;
const TOTAL_PRG_BANKS = 32;
const TOTAL_CHR_BANKS = 16;

const ALL_PRG_BANKS: readonly number[][] = [
  _prg00, _prg01, _prg02, _prg03, _prg04, _prg05, _prg06, _prg07,
  _prg08, _prg09, _prg10, _prg11, _prg12, _prg13, _prg14, _prg15,
  _prg16, _prg17, _prg18, _prg19, _prg20, _prg21, _prg22, _prg23,
  _prg24, _prg25, _prg26, _prg27, _prg28, _prg29, _prg30, _prg31,
];

const ALL_CHR_BANKS: readonly number[][] = [
  _chr00, _chr01, _chr02, _chr03, _chr04, _chr05, _chr06, _chr07,
  _chr08, _chr09, _chr10, _chr11, _chr12, _chr13, _chr14, _chr15,
];

/** 完整 PRG-ROM (32 × 8KB = 262144 bytes) */
export const NES_PRG_ROM: readonly number[] = ([] as number[]).concat(...ALL_PRG_BANKS);

/** 完整 CHR-ROM (16 × 8KB = 131072 bytes) */
export const NES_CHR_ROM: readonly number[] = ([] as number[]).concat(...ALL_CHR_BANKS);

/** 所有 bank ID (0-31) */
export const AUDIO_BANK_IDS = Array.from({ length: TOTAL_PRG_BANKS }, (_, i) => i);

export const PRG_ROM_SIZE = TOTAL_PRG_BANKS * BANK_8K;
export const CHR_ROM_SIZE = TOTAL_CHR_BANKS * BANK_8K;
export const NES_MAPPER = 4;
