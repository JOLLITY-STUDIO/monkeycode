/**
 * mini-audio 精简 ROM 数据 — 逐个砍 bank 版本
 * 
 * 当前保留 8 个 PRG bank — 精简到音频核心:
 *   00-03, 07  — 初始化
 *   12         — 音频引擎入口
 *   15         — BGM 数据(开场动画)
 *   30-31      — 固定 bank (向量)
 */

import _prg00 from '../../rom-data/prg-bank-00';
import _prg01 from '../../rom-data/prg-bank-01';
import _prg02 from '../../rom-data/prg-bank-02';
import _prg03 from '../../rom-data/prg-bank-03';
import _prg07 from '../../rom-data/prg-bank-07';
import _prg12 from '../../rom-data/prg-bank-12';
// import _prg13 from '../../rom-data/prg-bank-13';
// import _prg14 from '../../rom-data/prg-bank-14';
import _prg15 from '../../rom-data/prg-bank-15';
import _prg30 from '../../rom-data/prg-bank-30';
import _prg31 from '../../rom-data/prg-bank-31';

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
  0:  _prg00, 1:  _prg01, 2:  _prg02, 3:  _prg03,
  // 4-6 砍掉
  7:  _prg07,
  12: _prg12,
  // 13-14 砍掉
  15: _prg15,
  30: _prg30, 31: _prg31,
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
