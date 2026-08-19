"use strict";
/**
 * 寄存器缓存 (Model 层)
 *
 * 替代 6502 CPU 寄存器 (A/X/Y/SP/P) — KV 结构, 与 DataStore 保持一致。
 * bank service 翻译时, 原本的寄存器读写 (LDA/TAX/... ) 直接映射为对本 cache 的
 * 读写, 不再有 CPU 解析。零页变量 (ram_00xx) 仍由 DataStore.zp / KV 提供。
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.regCache = exports.FLAG_N = exports.FLAG_V = exports.FLAG_B = exports.FLAG_D = exports.FLAG_I = exports.FLAG_Z = exports.FLAG_C = void 0;
exports.getC = getC;
exports.setC = setC;
exports.getZ = getZ;
exports.setZ = setZ;
exports.getN = getN;
exports.setN = setN;
exports.getV = getV;
exports.setV = setV;
exports.pushP = pushP;
exports.pullP = pullP;
exports.setZN = setZN;
exports.resetRegs = resetRegs;
/** 状态标志位 (P 寄存器) */
exports.FLAG_C = 0x01; // 进位 Carry
exports.FLAG_Z = 0x02; // 零 Zero
exports.FLAG_I = 0x04; // 中断屏蔽
exports.FLAG_D = 0x08; // 十进制
exports.FLAG_B = 0x10; // 断点
exports.FLAG_V = 0x40; // 溢出
exports.FLAG_N = 0x80; // 负号 Negative
/** 寄存器 KV 缓存 */
exports.regCache = {
    A: 0, // 累加器
    X: 0, // X 索引
    Y: 0, // Y 索引
    SP: 0xFD, // 栈指针 (初始 $FD, 硬件复位值)
    P: 0x24, // 状态标志 (I=1, Z=1, 硬件复位值 $24)
};
/** 读取进位标志 */
function getC() {
    return (exports.regCache.P & exports.FLAG_C) !== 0;
}
/** 设置/清除进位标志 */
function setC(v) {
    if (v)
        exports.regCache.P |= exports.FLAG_C;
    else
        exports.regCache.P &= ~exports.FLAG_C;
}
/** 读取零标志 */
function getZ() {
    return (exports.regCache.P & exports.FLAG_Z) !== 0;
}
/** 设置/清除零标志 */
function setZ(v) {
    if (v)
        exports.regCache.P |= exports.FLAG_Z;
    else
        exports.regCache.P &= ~exports.FLAG_Z;
}
/** 读取负号标志 */
function getN() {
    return (exports.regCache.P & exports.FLAG_N) !== 0;
}
/** 设置/清除负号标志 */
function setN(v) {
    if (v)
        exports.regCache.P |= exports.FLAG_N;
    else
        exports.regCache.P &= ~exports.FLAG_N;
}
/** 读取溢出标志 */
function getV() {
    return (exports.regCache.P & exports.FLAG_V) !== 0;
}
/** 设置/清除溢出标志 */
function setV(v) {
    if (v)
        exports.regCache.P |= exports.FLAG_V;
    else
        exports.regCache.P &= ~exports.FLAG_V;
}
/** 保存 P 到栈 (PHP) */
function pushP() {
    exports.regCache.P |= exports.FLAG_B; // 压栈时置 B 标志
}
/** 从栈恢复 P (PLP) */
function pullP() {
    exports.regCache.P &= ~exports.FLAG_B;
}
/**
 * 根据 8bit 结果更新 Z/N 标志 (ADC/SBC/AND/ORA/EOR/LDA 等)
 */
function setZN(v) {
    const b = v & 0xFF;
    setZ(b === 0);
    setN((b & 0x80) !== 0);
}
/** 重置寄存器 */
function resetRegs() {
    exports.regCache.A = 0;
    exports.regCache.X = 0;
    exports.regCache.Y = 0;
    exports.regCache.SP = 0xFD;
    exports.regCache.P = 0x24;
}
