/**
 * BitField — 语义化位操作工具 (替代裸 >> & << 位运算)
 *
 * 把 `(value >> 7) & 1` 改成 `bit.get(value, 7)` 或语义化方法,
 * 把 `value & 3` 改成 `bit.lowBits(value, 2)` 等。
 *
 * NES PPU/APU 寄存器是按位编码的标志字节, 此工具提供清晰命名。
 */

/** 读取指定 bit 位 (0/1) */
export function getBit(value: number, bit: number): number {
  return (value >> bit) & 1;
}

/** 设置指定 bit 位 (返回新值, 不修改原值) */
export function setBit(value: number, bit: number, on: boolean): number {
  const mask = 1 << bit;
  return on ? (value | mask) : (value & ~mask);
}

/** 读取低 N 位 */
export function lowBits(value: number, count: number): number {
  const mask = (1 << count) - 1;
  return value & mask;
}

/** 读取从 startBit 开始的 N 位 */
export function bits(value: number, startBit: number, count: number): number {
  const mask = (1 << count) - 1;
  return (value >> startBit) & mask;
}

/** 读取 bit7 (最高位), 常用于 NMI enable / 显示开关 */
export function bit7(value: number): boolean {
  return (value & 0x80) !== 0;
}

/** 读取 bit6 */
export function bit6(value: number): boolean {
  return (value & 0x40) !== 0;
}

/** 读取 bit5 */
export function bit5(value: number): boolean {
  return (value & 0x20) !== 0;
}

/** 读取 bit4 */
export function bit4(value: number): boolean {
  return (value & 0x10) !== 0;
}

/** 读取 bit3 */
export function bit3(value: number): boolean {
  return (value & 0x08) !== 0;
}

/** 读取 bit2 */
export function bit2(value: number): boolean {
  return (value & 0x04) !== 0;
}

/** 读取 bit1 */
export function bit1(value: number): boolean {
  return (value & 0x02) !== 0;
}

/** 读取 bit0 (最低位) */
export function bit0(value: number): boolean {
  return (value & 0x01) !== 0;
}

/** 8 位回绕 (替代 & 0xFF) */
export function wrap8(value: number): number {
  return value & 0xFF;
}

/** 11 位回绕 (VRAM 地址, 替代 & 0x7FF) */
export function wrap11(value: number): number {
  return value & 0x7FF;
}

/** 14 位回绕 (VRAM 全地址, 替代 & 0x3FFF) */
export function wrap14(value: number): number {
  return value & 0x3FFF;
}

/** 13 位回绕 (NT 地址, 替代 & 0x1FFF) */
export function wrap13(value: number): number {
  return value & 0x1FFF;
}

/** 拼接高低字节为 16 位地址 */
export function toAddr16(hi: number, lo: number): number {
  return ((hi << 8) | lo) & 0xFFFF;
}

/** 取高字节 */
export function hiByte(value: number): number {
  return (value >> 8) & 0xFF;
}

/** 取低字节 */
export function loByte(value: number): number {
  return value & 0xFF;
}
