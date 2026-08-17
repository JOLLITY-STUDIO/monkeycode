/**
 * mini-audio 精简 ROM 数据 — 3 bank 版
 * 12, 15, 31-minimal
 * 外围 RAM 初始化由 JS 驱动层在 loadROMArrays 后完成
 */
import _prg12 from './prg-bank-12';
import _prg15 from './prg-bank-15';
import _prg31 from './prg-bank-31-minimal';

const BANK_8K = 8192;
const TOTAL_BANKS = 32;

function stubBank(): readonly number[] {
  const b = new Array<number>(BANK_8K).fill(0xEA);
  b[0] = 0x60; b[1] = 0x60;
  for (const off of [0x10, 0x20, 0x40, 0x80, 0x100, 0x200, 0x400, 0x1000]) {
    if (off < BANK_8K) b[off] = 0x60;
  }
  return b;
}

const STUB = stubBank();

const REAL_BANKS: Record<number, readonly number[]> = {
  12: _prg12,
  15: _prg15,
  31: _prg31,
};

export const AUDIO_BANK_IDS = Object.keys(REAL_BANKS).map(Number).sort((a, b) => a - b);

function buildPRG(): readonly number[] {
  const result: number[] = [];
  for (let i = 0; i < TOTAL_BANKS; i++) {
    const data = REAL_BANKS[i] ?? STUB;
    for (let j = 0; j < BANK_8K; j++) result.push(data[j]);
  }
  return result;
}

export const NES_PRG_ROM: readonly number[] = buildPRG();
export const NES_CHR_ROM: readonly number[] = [];
export const PRG_ROM_SIZE = TOTAL_BANKS * BANK_8K;
export const CHR_ROM_SIZE = 0;
export const NES_MAPPER = 4;
