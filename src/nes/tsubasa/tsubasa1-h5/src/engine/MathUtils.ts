/**
 * 天使之翼1 — 数学工具
 * 对应原 Bank 0: $84F9 (Multiply16), $8528 (Divide16)
 * 
 * 16位算术运算，原6502通过循环移位实现
 */

/**
 * 16位乘法 (无符号)
 * 对应原始: $84F9 Multiply16
 * 
 * 原始输入:
 *   ram_004F-0050: 被乘数 (16位, little-endian)
 *   ram_0051-0052: 乘数 (16位, little-endian)
 * 输出:
 *   ram_0053-0056: 乘积 (32位, little-endian)
 * 
 * 原始算法: 移位相加法
 *   for each bit in multiplier:
 *     if bit == 1: result += multiplicand << position
 */
export function multiply16(a: number, b: number): number {
  // 限制在16位范围内
  const A = a & 0xFFFF;
  const B = b & 0xFFFF;
  
  let result = 0;
  let multiplicand = A;
  let multiplier = B;
  
  for (let i = 0; i < 16; i++) {
    if (multiplier & 1) {
      result = (result + multiplicand) & 0xFFFFFFFF;
    }
    multiplicand = (multiplicand << 1) & 0xFFFFFFFF;
    multiplier >>= 1;
  }
  
  return result;
}

/**
 * 16位除法 (无符号)
 * 对应原始: $8528 Divide16
 * 
 * 原始输入:
 *   ram_0057-0058: 被除数 (16位)
 *   ram_0059-005A: 除数 (16位)
 * 输出:
 *   ram_005D-005E: 商 (16位)
 *   ram_005B-005C: 余数 (16位)
 * 
 * 原始算法: 恢复余数法
 */
export function divide16(dividend: number, divisor: number): { quotient: number; remainder: number } {
  const D = dividend & 0xFFFF;
  const d = divisor & 0xFFFF;
  
  if (d === 0) {
    return { quotient: 0xFFFF, remainder: 0 }; // 除零: 返回最大值
  }
  
  let remainder = 0;
  let quotient = 0;
  
  for (let i = 0; i < 16; i++) {
    remainder = (remainder << 1) | ((D >> (15 - i)) & 1);
    
    if (remainder >= d) {
      remainder -= d;
      quotient = (quotient << 1) | 1;
    } else {
      quotient <<= 1;
    }
  }
  
  return {
    quotient: quotient & 0xFFFF,
    remainder: remainder & 0xFFFF,
  };
}

/**
 * 8位乘法
 * 原始: 快速8位乘法 (A × Y → 结果在A, X)
 */
export function multiply8(a: number, b: number): number {
  return (a * b) & 0xFF;
}

/**
 * 计算百分比 (a / total × 100)
 * 用于体力等百分比计算
 */
export function percent16(value: number, total: number): number {
  if (total === 0) return 0;
  return multiply16(value, 100) / total;
}

/**
 * 6502风格的ROL (循环左移, 带进位)
 */
export function rol(val: number, carry: boolean): { result: number; newCarry: boolean } {
  const newCarry = (val & 0x80) !== 0;
  const result = ((val << 1) & 0xFF) | (carry ? 1 : 0);
  return { result, newCarry };
}

/**
 * 6502风格的ROR (循环右移, 带进位)
 */
export function ror(val: number, carry: boolean): { result: number; newCarry: boolean } {
  const newCarry = (val & 1) !== 0;
  const result = ((val >> 1) & 0xFF) | (carry ? 0x80 : 0);
  return { result, newCarry };
}

/**
 * 6502风格的ASL (算术左移)
 */
export function asl(val: number): { result: number; carry: boolean } {
  return {
    result: (val << 1) & 0xFF,
    carry: (val & 0x80) !== 0,
  };
}

/**
 * 6502风格的LSR (逻辑右移)
 */
export function lsr(val: number): { result: number; carry: boolean } {
  return {
    result: (val >> 1) & 0xFF,
    carry: (val & 1) !== 0,
  };
}

/**
 * 限制值在[a, b]范围内
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * 将值限制在字节范围 [0, 255]
 */
export function clampByte(val: number): number {
  return val & 0xFF;
}

/**
 * 有符号8位值 → 有符号整数
 */
export function sbyte(val: number): number {
  return (val & 0x80) ? (val | 0xFFFFFF00) : (val & 0x7F);
}
