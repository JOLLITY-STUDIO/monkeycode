/** CHR-ROM 聚合 — 16 × 8KB = 128KB (真实 ROM 字节) */
import CHR_BANK_00 from './chr-bank-00';
import CHR_BANK_01 from './chr-bank-01';
import CHR_BANK_02 from './chr-bank-02';
import CHR_BANK_03 from './chr-bank-03';
import CHR_BANK_04 from './chr-bank-04';
import CHR_BANK_05 from './chr-bank-05';
import CHR_BANK_06 from './chr-bank-06';
import CHR_BANK_07 from './chr-bank-07';
import CHR_BANK_08 from './chr-bank-08';
import CHR_BANK_09 from './chr-bank-09';
import CHR_BANK_10 from './chr-bank-10';
import CHR_BANK_11 from './chr-bank-11';
import CHR_BANK_12 from './chr-bank-12';
import CHR_BANK_13 from './chr-bank-13';
import CHR_BANK_14 from './chr-bank-14';
import CHR_BANK_15 from './chr-bank-15';

export const CHR_BANK_SIZE = 0x2000; // 8192
export const CHR_BANK_COUNT = 16;

/** CHR bank 表 (每个 8KB) */
export const CHR_BANKS: readonly (readonly number[])[] = [
  CHR_BANK_00, CHR_BANK_01, CHR_BANK_02, CHR_BANK_03,
  CHR_BANK_04, CHR_BANK_05, CHR_BANK_06, CHR_BANK_07,
  CHR_BANK_08, CHR_BANK_09, CHR_BANK_10, CHR_BANK_11,
  CHR_BANK_12, CHR_BANK_13, CHR_BANK_14, CHR_BANK_15,
];

/** 完整 CHR ROM (128KB Uint8Array, 供 core ROM.loadTs 直接加载) */
export const NES_CHR_ROM: Uint8Array = (() => {
  const rom = new Uint8Array(CHR_BANK_COUNT * CHR_BANK_SIZE);
  for (let b = 0; b < CHR_BANK_COUNT; b++) {
    const bank = CHR_BANKS[b];
    for (let i = 0; i < CHR_BANK_SIZE; i++) {
      rom[b * CHR_BANK_SIZE + i] = bank[i] ?? 0xff;
    }
  }
  return rom;
})();
