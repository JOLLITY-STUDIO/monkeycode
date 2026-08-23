/**
 * BitField — 语义化位操作工具 (替代裸 >> & << 位运算)
 *
 * 把 `(value >> 7) & 1` 改成 `bit.get(value, 7)` 或语义化方法,
 * 把 `value & 3` 改成 `bit.lowBits(value, 2)` 等。
 *
 * NES PPU/APU 寄存器是按位编码的标志字节, 此工具提供清晰命名。
 */
/** 读取指定 bit 位 (0/1) */
export declare function getBit(value: number, bit: number): number;
/** 设置指定 bit 位 (返回新值, 不修改原值) */
export declare function setBit(value: number, bit: number, on: boolean): number;
/**
 * `bit.get` 别名 — 等价于 getBit。
 *
 * 历史上 PPU/APU 代码大量使用 `bit.get(value, n)` 形式调用,
 * 此别名保持向后兼容, 避免逐处改写 PPU 调用点引入风险。
 */
export declare const get: typeof getBit;
/** `bit.set` 别名 — 等价于 setBit */
export declare const set: typeof setBit;
/** 读取低 N 位 */
export declare function lowBits(value: number, count: number): number;
/** 读取从 startBit 开始的 N 位 */
export declare function bits(value: number, startBit: number, count: number): number;
/** 读取 bit7 (最高位), 常用于 NMI enable / 显示开关 */
export declare function bit7(value: number): boolean;
/** 读取 bit6 */
export declare function bit6(value: number): boolean;
/** 读取 bit5 */
export declare function bit5(value: number): boolean;
/** 读取 bit4 */
export declare function bit4(value: number): boolean;
/** 读取 bit3 */
export declare function bit3(value: number): boolean;
/** 读取 bit2 */
export declare function bit2(value: number): boolean;
/** 读取 bit1 */
export declare function bit1(value: number): boolean;
/** 读取 bit0 (最低位) */
export declare function bit0(value: number): boolean;
/** 8 位回绕 (替代 & 0xFF) */
export declare function wrap8(value: number): number;
/** 11 位回绕 (VRAM 地址, 替代 & 0x7FF) */
export declare function wrap11(value: number): number;
/** 14 位回绕 (VRAM 全地址, 替代 & 0x3FFF) */
export declare function wrap14(value: number): number;
/** 13 位回绕 (NT 地址, 替代 & 0x1FFF) */
export declare function wrap13(value: number): number;
/** 拼接高低字节为 16 位地址 */
export declare function toAddr16(hi: number, lo: number): number;
/** 取高字节 */
export declare function hiByte(value: number): number;
/** 取低字节 */
export declare function loByte(value: number): number;
