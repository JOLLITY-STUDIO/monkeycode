/**
 * ROM 数据聚合导出（本地副本）
 *
 * 替代已移除的外部 `rom-data` 目录：使用 src/game/data 下已内联的
 * PRG/CHR bank 副本拼装出完整的 NES_PRG_ROM / NES_CHR_ROM。
 *
 * 仅用于 bankpage 调试页浏览原始 ROM；游戏引擎本身直接 import
 * 各 bank 的本地副本，无需此聚合。
 */

// ── PRG Banks (全部 32 个本地副本, 已与 ROM 逐字节校验一致) ──
import PRG_BANK_00 from '../prg-bank-00';
import PRG_BANK_01 from '../prg-bank-01';
import PRG_BANK_02 from '../prg-bank-02';
import PRG_BANK_03 from '../prg-bank-03';
import PRG_BANK_04 from '../prg-bank-04';
import PRG_BANK_05 from '../prg-bank-05';
import PRG_BANK_06 from '../prg-bank-06';
import PRG_BANK_07 from '../prg-bank-07';
import PRG_BANK_08 from '../prg-bank-08';
import PRG_BANK_09 from '../prg-bank-09';
import PRG_BANK_10 from '../prg-bank-10';
import PRG_BANK_11 from '../prg-bank-11';
import PRG_BANK_12 from '../prg-bank-12';
import PRG_BANK_13 from '../prg-bank-13';
import PRG_BANK_14 from '../prg-bank-14';
import PRG_BANK_15 from '../prg-bank-15';
import PRG_BANK_16 from '../prg-bank-16';
import PRG_BANK_17 from '../prg-bank-17';
import PRG_BANK_18 from '../prg-bank-18';
import PRG_BANK_19 from '../prg-bank-19';
import PRG_BANK_20 from '../prg-bank-20';
import PRG_BANK_21 from '../prg-bank-21';
import PRG_BANK_22 from '../prg-bank-22';
import PRG_BANK_23 from '../prg-bank-23';
import PRG_BANK_24 from '../prg-bank-24';
import PRG_BANK_25 from '../prg-bank-25';
import PRG_BANK_26 from '../prg-bank-26';
import PRG_BANK_27 from '../prg-bank-27';
import PRG_BANK_28 from '../prg-bank-28';
import PRG_BANK_29 from '../prg-bank-29';
import PRG_BANK_30 from '../prg-bank-30';
import PRG_BANK_31 from '../prg-bank-31';

// ── CHR Banks (全部 16 个本地副本) ──
import CHR_00 from '../ppu/tile/chr/chr-bank-00';
import CHR_01 from '../ppu/tile/chr/chr-bank-01';
import CHR_02 from '../ppu/tile/chr/chr-bank-02';
import CHR_03 from '../ppu/tile/chr/chr-bank-03';
import CHR_04 from '../ppu/tile/chr/chr-bank-04';
import CHR_05 from '../ppu/tile/chr/chr-bank-05';
import CHR_06 from '../ppu/tile/chr/chr-bank-06';
import CHR_07 from '../ppu/tile/chr/chr-bank-07';
import CHR_08 from '../ppu/tile/chr/chr-bank-08';
import CHR_09 from '../ppu/tile/chr/chr-bank-09';
import CHR_10 from '../ppu/tile/chr/chr-bank-10';
import CHR_11 from '../ppu/tile/chr/chr-bank-11';
import CHR_12 from '../ppu/tile/chr/chr-bank-12';
import CHR_13 from '../ppu/tile/chr/chr-bank-13';
import CHR_14 from '../ppu/tile/chr/chr-bank-14';
import CHR_15 from '../ppu/tile/chr/chr-bank-15';

export const PRG_BANK_SIZE = 0x2000; // 8192
export const CHR_BANK_SIZE = 0x2000; // 8192

/** 本地 PRG bank 副本表（bank 数据为 readonly number[]，拼装时转 number[]） */
const PRG_COPIES: Record<number, number[]> = {
  0: [...PRG_BANK_00], 1: [...PRG_BANK_01], 2: [...PRG_BANK_02], 3: [...PRG_BANK_03],
  4: [...PRG_BANK_04], 5: [...PRG_BANK_05], 6: [...PRG_BANK_06], 7: [...PRG_BANK_07],
  8: [...PRG_BANK_08], 9: [...PRG_BANK_09], 10: [...PRG_BANK_10], 11: [...PRG_BANK_11],
  12: [...PRG_BANK_12], 13: [...PRG_BANK_13], 14: [...PRG_BANK_14], 15: [...PRG_BANK_15],
  16: [...PRG_BANK_16], 17: [...PRG_BANK_17], 18: [...PRG_BANK_18], 19: [...PRG_BANK_19],
  20: [...PRG_BANK_20], 21: [...PRG_BANK_21], 22: [...PRG_BANK_22], 23: [...PRG_BANK_23],
  24: [...PRG_BANK_24], 25: [...PRG_BANK_25], 26: [...PRG_BANK_26], 27: [...PRG_BANK_27],
  28: [...PRG_BANK_28], 29: [...PRG_BANK_29], 30: [...PRG_BANK_30], 31: [...PRG_BANK_31],
};

/** CHR bank 副本表（16 个全量） */
const CHR_COPIES: number[][] = [
  [...CHR_00], [...CHR_01], [...CHR_02], [...CHR_03], [...CHR_04], [...CHR_05], [...CHR_06], [...CHR_07],
  [...CHR_08], [...CHR_09], [...CHR_10], [...CHR_11], [...CHR_12], [...CHR_13], [...CHR_14], [...CHR_15],
];

/**
 * 拼装完整 PRG ROM (32 × 8192 = 256KB)。全部 32 个 bank 均有本地副本。
 */
export const NES_PRG_ROM: number[] = (() => {
  const rom = new Array(32 * PRG_BANK_SIZE).fill(0xFF);
  for (const idStr of Object.keys(PRG_COPIES)) {
    const id = Number(idStr);
    const bank = PRG_COPIES[id];
    for (let i = 0; i < PRG_BANK_SIZE && i < bank.length; i++) {
      rom[id * PRG_BANK_SIZE + i] = bank[i];
    }
  }
  return rom;
})();

/** 拼装完整 CHR ROM (16 × 8192 = 128KB) */
export const NES_CHR_ROM: number[] = (() => {
  const rom = new Array(16 * CHR_BANK_SIZE).fill(0xFF);
  for (let id = 0; id < 16; id++) {
    const bank = CHR_COPIES[id];
    if (!bank) continue;
    for (let i = 0; i < CHR_BANK_SIZE && i < bank.length; i++) {
      rom[id * CHR_BANK_SIZE + i] = bank[i];
    }
  }
  return rom;
})();

export const PRG_ROM_SIZE = NES_PRG_ROM.length; // 262144
export const CHR_ROM_SIZE = NES_CHR_ROM.length; // 131072
