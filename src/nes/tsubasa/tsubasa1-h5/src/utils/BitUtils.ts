/**
 * 位操作工具函数
 */

export class BitUtils {
  /** 取 bit (0-7) */
  static getBit(value: number, bit: number): boolean {
    return ((value >> bit) & 0x01) !== 0;
  }

  /** 设置 bit */
  static setBit(value: number, bit: number, on: boolean): number {
    return on ? (value | (1 << bit)) : (value & ~(1 << bit));
  }

  /** 取多位 [high:low] */
  static getBits(value: number, high: number, low: number): number {
    const mask = ((1 << (high - low + 1)) - 1) << low;
    return (value & mask) >> low;
  }

  /** 设置多位 */
  static setBits(value: number, high: number, low: number, bits: number): number {
    const mask = ((1 << (high - low + 1)) - 1) << low;
    return (value & ~mask) | ((bits << low) & mask);
  }

  /** 合并高低字节为16位字 */
  static toWord(lo: number, hi: number): number {
    return ((hi & 0xFF) << 8) | (lo & 0xFF);
  }

  /** 拆分16位字 */
  static fromWord(word: number): [number, number] {
    return [word & 0xFF, (word >> 8) & 0xFF];
  }

  /** 16位加法 */
  static add16(a: number, b: number): number {
    return (a + b) & 0xFFFF;
  }

  /** 8位加法 (含进位) */
  static add8(a: number, b: number, carryIn: boolean): { result: number; carry: boolean } {
    const sum = a + b + (carryIn ? 1 : 0);
    return { result: sum & 0xFF, carry: sum > 0xFF };
  }

  /** 8位减法 (含借位) */
  static sub8(a: number, b: number, borrowIn: boolean): { result: number; borrow: boolean } {
    const diff = a - b - (borrowIn ? 1 : 0);
    return { result: diff & 0xFF, borrow: diff < 0 };
  }

  /** 逻辑左移 (ASL) */
  static asl(value: number): { result: number; carry: boolean } {
    const carry = (value & 0x80) !== 0;
    return { result: (value << 1) & 0xFF, carry };
  }

  /** 逻辑右移 (LSR) */
  static lsr(value: number): { result: number; carry: boolean } {
    const carry = (value & 0x01) !== 0;
    return { result: value >> 1, carry };
  }

  /** 循环左移 (ROL) */
  static rol(value: number, carryIn: boolean): { result: number; carry: boolean } {
    const carry = (value & 0x80) !== 0;
    return { result: ((value << 1) & 0xFF) | (carryIn ? 1 : 0), carry };
  }

  /** 循环右移 (ROR) */
  static ror(value: number, carryIn: boolean): { result: number; carry: boolean } {
    const carry = (value & 0x01) !== 0;
    return { result: (value >> 1) | (carryIn ? 0x80 : 0), carry };
  }

  /** NES 地址到名称表坐标 */
  static addrToNT(addr: number): { nt: number; x: number; y: number } {
    const nt = (addr >> 10) & 0x03;
    const offset = addr & 0x03FF;
    const y = Math.floor(offset / 32);
    const x = offset % 32;
    return { nt, x, y };
  }
}
