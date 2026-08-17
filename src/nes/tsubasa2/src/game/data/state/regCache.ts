/**
 * 寄存器缓存 (Model 层)
 *
 * 替代 6502 CPU 寄存器 (A/X/Y/SP/P) — KV 结构, 与 DataStore 保持一致。
 * bank service 翻译时, 原本的寄存器读写 (LDA/TAX/... ) 直接映射为对本 cache 的
 * 读写, 不再有 CPU 解析。零页变量 (ram_00xx) 仍由 DataStore.zp / KV 提供。
 */

/** 状态标志位 (P 寄存器) */
export const FLAG_C = 0x01; // 进位 Carry
export const FLAG_Z = 0x02; // 零 Zero
export const FLAG_I = 0x04; // 中断屏蔽
export const FLAG_D = 0x08; // 十进制
export const FLAG_B = 0x10; // 断点
export const FLAG_V = 0x40; // 溢出
export const FLAG_N = 0x80; // 负号 Negative

/** 寄存器 KV 缓存 */
export const regCache = {
  A: 0,          // 累加器
  X: 0,          // X 索引
  Y: 0,          // Y 索引
  SP: 0xFD,      // 栈指针 (初始 $FD, 硬件复位值)
  P: 0x24,       // 状态标志 (I=1, Z=1, 硬件复位值 $24)
};

/** 读取进位标志 */
export function getC(): boolean {
  return (regCache.P & FLAG_C) !== 0;
}

/** 设置/清除进位标志 */
export function setC(v: boolean): void {
  if (v) regCache.P |= FLAG_C;
  else regCache.P &= ~FLAG_C;
}

/** 读取零标志 */
export function getZ(): boolean {
  return (regCache.P & FLAG_Z) !== 0;
}

/** 设置/清除零标志 */
export function setZ(v: boolean): void {
  if (v) regCache.P |= FLAG_Z;
  else regCache.P &= ~FLAG_Z;
}

/** 读取负号标志 */
export function getN(): boolean {
  return (regCache.P & FLAG_N) !== 0;
}

/** 设置/清除负号标志 */
export function setN(v: boolean): void {
  if (v) regCache.P |= FLAG_N;
  else regCache.P &= ~FLAG_N;
}

/** 读取溢出标志 */
export function getV(): boolean {
  return (regCache.P & FLAG_V) !== 0;
}

/** 设置/清除溢出标志 */
export function setV(v: boolean): void {
  if (v) regCache.P |= FLAG_V;
  else regCache.P &= ~FLAG_V;
}

/** 保存 P 到栈 (PHP) */
export function pushP(): void {
  regCache.P |= FLAG_B; // 压栈时置 B 标志
}

/** 从栈恢复 P (PLP) */
export function pullP(): void {
  regCache.P &= ~FLAG_B;
}

/**
 * 根据 8bit 结果更新 Z/N 标志 (ADC/SBC/AND/ORA/EOR/LDA 等)
 */
export function setZN(v: number): void {
  const b = v & 0xFF;
  setZ(b === 0);
  setN((b & 0x80) !== 0);
}

/** 重置寄存器 */
export function resetRegs(): void {
  regCache.A = 0;
  regCache.X = 0;
  regCache.Y = 0;
  regCache.SP = 0xFD;
  regCache.P = 0x24;
}
