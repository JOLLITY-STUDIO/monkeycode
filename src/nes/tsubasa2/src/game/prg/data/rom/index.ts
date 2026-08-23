/** PRG-ROM 聚合 — 32 × 8KB = 256KB（真实 ROM 字节，供 $C8FB 队列流解析等） */
import PRG_BANK_00 from './prg-bank-00';
import PRG_BANK_01 from './prg-bank-01';
import PRG_BANK_02 from './prg-bank-02';
import PRG_BANK_03 from './prg-bank-03';
import PRG_BANK_04 from './prg-bank-04';
import PRG_BANK_05 from './prg-bank-05';
import PRG_BANK_06 from './prg-bank-06';
import PRG_BANK_07 from './prg-bank-07';
import PRG_BANK_08 from './prg-bank-08';
import PRG_BANK_09 from './prg-bank-09';
import PRG_BANK_10 from './prg-bank-10';
import PRG_BANK_11 from './prg-bank-11';
import PRG_BANK_12 from './prg-bank-12';
import PRG_BANK_13 from './prg-bank-13';
import PRG_BANK_14 from './prg-bank-14';
import PRG_BANK_15 from './prg-bank-15';
import PRG_BANK_16 from './prg-bank-16';
import PRG_BANK_17 from './prg-bank-17';
import PRG_BANK_18 from './prg-bank-18';
import PRG_BANK_19 from './prg-bank-19';
import PRG_BANK_20 from './prg-bank-20';
import PRG_BANK_21 from './prg-bank-21';
import PRG_BANK_22 from './prg-bank-22';
import PRG_BANK_23 from './prg-bank-23';
import PRG_BANK_24 from './prg-bank-24';
import PRG_BANK_25 from './prg-bank-25';
import PRG_BANK_26 from './prg-bank-26';
import PRG_BANK_27 from './prg-bank-27';
import PRG_BANK_28 from './prg-bank-28';
import PRG_BANK_29 from './prg-bank-29';
import PRG_BANK_30 from './prg-bank-30';
import PRG_BANK_31 from './prg-bank-31';

export const PRG_BANK_SIZE = 0x2000; // 8192
export const PRG_BANK_COUNT = 32;

/** PRG bank 表（每个 8KB） */
export const PRG_BANKS: readonly (readonly number[])[] = [
  PRG_BANK_00, PRG_BANK_01, PRG_BANK_02, PRG_BANK_03, PRG_BANK_04, PRG_BANK_05, PRG_BANK_06, PRG_BANK_07, PRG_BANK_08, PRG_BANK_09, PRG_BANK_10, PRG_BANK_11, PRG_BANK_12, PRG_BANK_13, PRG_BANK_14, PRG_BANK_15, PRG_BANK_16, PRG_BANK_17, PRG_BANK_18, PRG_BANK_19, PRG_BANK_20, PRG_BANK_21, PRG_BANK_22, PRG_BANK_23, PRG_BANK_24, PRG_BANK_25, PRG_BANK_26, PRG_BANK_27, PRG_BANK_28, PRG_BANK_29, PRG_BANK_30, PRG_BANK_31
];

/** 完整 PRG ROM (256KB Uint8Array) */
export const NES_PRG_ROM: Uint8Array = (() => {
  const rom = new Uint8Array(PRG_BANK_COUNT * PRG_BANK_SIZE);
  for (let b = 0; b < PRG_BANK_COUNT; b++) {
    const bank = PRG_BANKS[b];
    for (let i = 0; i < PRG_BANK_SIZE; i++) rom[b * PRG_BANK_SIZE + i] = bank[i] ?? 0xff;
  }
  return rom;
})();
