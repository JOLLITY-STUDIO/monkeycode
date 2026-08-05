/**
 * PRG Bank 数据加载器 (自动生成)
 * 从prg_bulk.json的base64数据初始化解码
 */

export const PRG_BANK_COUNT = 8;
export const PRG_BANK_SIZE = 16384;

const _banks: Uint8Array[] = [];

/** 获取PRG Bank原始数据 */
export function getPrgBank(bankId: number): Uint8Array | null {
  return _banks[bankId] ?? null;
}

/** 读取PRG Bank中指定偏移的字节 */
export function prgBankRead(bankId: number, offset: number): number {
  const bank = _banks[bankId];
  return bank?.[offset & 0x3FFF] ?? 0;
}

/** 读取16位值 (little-endian) */
export function prgBankRead16(bankId: number, offset: number): number {
  const lo = prgBankRead(bankId, offset);
  const hi = prgBankRead(bankId, offset + 1);
  return lo | (hi << 8);
}

/** 从CPU地址读取 (Bank 7 @ $C000-$FFFF) */
export function prgCpuRead(bankId: number, cpuAddr: number): number {
  const offset = cpuAddr & 0x3FFF;
  return prgBankRead(bankId, cpuAddr >= 0xC000 ? cpuAddr - 0x8000 : cpuAddr - 0x8000);
}

/** 初始化PRG数据 (从base64解码) */
export function initPrgBanks(banks: { bankId: number; base64: string }[]): void {
  for (const entry of banks) {
    const binary = atob(entry.base64);
    const data = new Uint8Array(entry.size);
    for (let i = 0; i < entry.size; i++) {
      data[i] = binary.charCodeAt(i);
    }
    _banks[entry.bankId] = data;
  }
}
