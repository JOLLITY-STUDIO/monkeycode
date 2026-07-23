// opening/state.ts — 6502 CPU state (no emulator CPU needed)
// PPU/APU still provided by tsnes

// registers
export let A = 0, X = 0, Y = 0, SP = 0xFD, PC = 0x0000;

// status flags
export let C = false, Z = false, I = false, D = false, V = false, N = false;

// memory — 可在运行时替换为 tsnes cpu.mem (共享同一块 buffer)
export let mem: Uint8Array = new Uint8Array(0x10000);

/** 运行时替换内存（de-CPU 页面注入 Proxy，与 tsnes 共用 buffer） */
export function setMem(newMem: Uint8Array): void {
  mem = newMem;
}

// --- helpers ---

export function setZN(v: number): void {
  Z = (v & 0xFF) === 0;
  N = (v & 0x80) !== 0;
}

export function zp(addr: number): number {
  return mem[addr & 0xFF];
}

export function setZp(addr: number, val: number): void {
  mem[addr & 0xFF] = val;
}

export function indX(zpAddr: number): number {
  const base = (zpAddr + X) & 0xFF;
  return mem[base] | (mem[(base + 1) & 0xFF] << 8);
}

export function indY(zpAddr: number): number {
  return (mem[zpAddr] | (mem[(zpAddr + 1) & 0xFF] << 8)) + Y;
}

export function push(v: number): void {
  mem[0x0100 | SP] = v;
  SP = (SP - 1) & 0xFF;
}

export function pull(): number {
  SP = (SP + 1) & 0xFF;
  return mem[0x0100 | SP];
}

export function pushWord(w: number): void {
  push((w >> 8) & 0xFF);
  push(w & 0xFF);
}

export function pullWord(): number {
  return pull() | (pull() << 8);
}

export function FLAGS_BYTE(): number {
  return (C ? 0x01 : 0) | (Z ? 0x02 : 0) | (I ? 0x04 : 0)
       | (D ? 0x08 : 0) | 0x20 /* always 1 */ | (V ? 0x40 : 0) | (N ? 0x80 : 0);
}

export function SET_FLAGS(b: number): void {
  C = (b & 0x01) !== 0; Z = (b & 0x02) !== 0; I = (b & 0x04) !== 0;
  D = (b & 0x08) !== 0; V = (b & 0x40) !== 0; N = (b & 0x80) !== 0;
}

// PPU 寄存器访问 (由 tsnes PPU 实例注入)
export let ppuRead: (addr: number) => number = () => 0;
export let ppuWrite: (addr: number, val: number) => void = () => {};
// 每帧结束的回调 (由 runner 设置)
export let onFrameReady: (() => void) | null = null;
