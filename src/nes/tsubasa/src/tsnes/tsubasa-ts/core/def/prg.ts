/**
 * prg — PRG-ROM 数据访问工具函数
 */

import { PRG_BANK_SIZE, PRG_BANK_COUNT, PRG_BANK_META } from './bank';
import type { Bank } from './bank';

export { PRG_BANK_SIZE as BANK_SIZE, PRG_BANK_COUNT as TOTAL_BANKS, PRG_BANK_META };
export const TOTAL_SIZE = PRG_BANK_COUNT * PRG_BANK_SIZE;

/** 按用途分类查 bank */
export function getBanksByType(type: string): number[] {
  return PRG_BANK_META.filter(b => b.type === type).map(b => b.index);
}

export function getCodeBanks(): number[] { return getBanksByType('code'); }
export function getDataBanks(): number[] { return getBanksByType('data'); }

export function findBank(name: string): number {
  const b = PRG_BANK_META.find(b => b.name === name);
  return b ? b.index : -1;
}

/** 按 bank + offset 读一个字节 */
export function readByte(banks: Bank[], bankIdx: number, offset: number): number {
  const bank = banks[bankIdx];
  if (!bank || !bank.data) return 0;
  return bank.data[offset & (PRG_BANK_SIZE - 1)] ?? 0;
}

/** 读 16-bit word (小端) */
export function readWord(banks: Bank[], bankIdx: number, offset: number): number {
  const lo = readByte(banks, bankIdx, offset);
  const hi = readByte(banks, bankIdx, offset + 1);
  return lo | (hi << 8);
}

/** 读中断向量 (bank 31 末尾) */
export function readVectors(banks: Bank[]) {
  return {
    nmi:   readWord(banks, 31, 8186),
    reset: readWord(banks, 31, 8188),
    irq:   readWord(banks, 31, 8190),
  };
}

/** 校验 PRG bank 完整性 */
export function validateBanks(banks: Bank[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!banks || banks.length !== PRG_BANK_COUNT) {
    errors.push(`expected ${PRG_BANK_COUNT} banks, got ${banks ? banks.length : 0}`);
    return { valid: false, errors };
  }
  for (let i = 0; i < PRG_BANK_COUNT; i++) {
    const b = banks[i];
    if (!b || !b.data) {
      errors.push(`bank ${i}: missing data`);
    } else if (b.data.length !== PRG_BANK_SIZE) {
      errors.push(`bank ${i}: expected ${PRG_BANK_SIZE} bytes, got ${b.data.length}`);
    }
  }
  return { valid: errors.length === 0, errors };
}
