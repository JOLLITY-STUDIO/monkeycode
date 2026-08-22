"use strict";
/**
 * BitField — 语义化位操作工具 (替代裸 >> & << 位运算)
 *
 * 把 `(value >> 7) & 1` 改成 `bit.get(value, 7)` 或语义化方法,
 * 把 `value & 3` 改成 `bit.lowBits(value, 2)` 等。
 *
 * NES PPU/APU 寄存器是按位编码的标志字节, 此工具提供清晰命名。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.get = void 0;
exports.getBit = getBit;
exports.setBit = setBit;
exports.lowBits = lowBits;
exports.bits = bits;
exports.bit7 = bit7;
exports.bit6 = bit6;
exports.bit5 = bit5;
exports.bit4 = bit4;
exports.bit3 = bit3;
exports.bit2 = bit2;
exports.bit1 = bit1;
exports.bit0 = bit0;
exports.wrap8 = wrap8;
exports.wrap11 = wrap11;
exports.wrap14 = wrap14;
exports.wrap13 = wrap13;
exports.toAddr16 = toAddr16;
exports.hiByte = hiByte;
exports.loByte = loByte;
/** 读取指定 bit 位 (0/1) */
function getBit(value, bit) {
    return (value >> bit) & 1;
}
/** 设置指定 bit 位 (返回新值, 不修改原值) */
function setBit(value, bit, on) {
    const mask = 1 << bit;
    return on ? (value | mask) : (value & ~mask);
}
/**
 * `bit.get` 别名 — 等价于 getBit。
 *
 * 历史上 PPU/APU 代码大量使用 `bit.get(value, n)` 形式调用,
 * 此别名保持向后兼容, 避免逐处改写 PPU 调用点引入风险。
 */
exports.get = getBit;
/** `bit.set` 别名 — 等价于 setBit */
exports.set = setBit;
/** 读取低 N 位 */
function lowBits(value, count) {
    const mask = (1 << count) - 1;
    return value & mask;
}
/** 读取从 startBit 开始的 N 位 */
function bits(value, startBit, count) {
    const mask = (1 << count) - 1;
    return (value >> startBit) & mask;
}
/** 读取 bit7 (最高位), 常用于 NMI enable / 显示开关 */
function bit7(value) {
    return (value & 0x80) !== 0;
}
/** 读取 bit6 */
function bit6(value) {
    return (value & 0x40) !== 0;
}
/** 读取 bit5 */
function bit5(value) {
    return (value & 0x20) !== 0;
}
/** 读取 bit4 */
function bit4(value) {
    return (value & 0x10) !== 0;
}
/** 读取 bit3 */
function bit3(value) {
    return (value & 0x08) !== 0;
}
/** 读取 bit2 */
function bit2(value) {
    return (value & 0x04) !== 0;
}
/** 读取 bit1 */
function bit1(value) {
    return (value & 0x02) !== 0;
}
/** 读取 bit0 (最低位) */
function bit0(value) {
    return (value & 0x01) !== 0;
}
/** 8 位回绕 (替代 & 0xFF) */
function wrap8(value) {
    return value & 0xFF;
}
/** 11 位回绕 (VRAM 地址, 替代 & 0x7FF) */
function wrap11(value) {
    return value & 0x7FF;
}
/** 14 位回绕 (VRAM 全地址, 替代 & 0x3FFF) */
function wrap14(value) {
    return value & 0x3FFF;
}
/** 13 位回绕 (NT 地址, 替代 & 0x1FFF) */
function wrap13(value) {
    return value & 0x1FFF;
}
/** 拼接高低字节为 16 位地址 */
function toAddr16(hi, lo) {
    return ((hi << 8) | lo) & 0xFFFF;
}
/** 取高字节 */
function hiByte(value) {
    return (value >> 8) & 0xFF;
}
/** 取低字节 */
function loByte(value) {
    return value & 0xFF;
}
