/**
 * NdsHardware —— NDS ARM9/ARM7 最小硬件 TS 基座（《NDS-ROM精准语义移植》规则附录基座模型）
 *
 * 内存映射（NDS）：
 *   EWRAM   0x02000000 - 0x023FFFFF  (4MB, ARM9 主内存)
 *   IWRAM   0x03000000 - 0x037FFFFF  (ARM9 高速内存)
 *   VRAM    0x06000000 - 0x067FFFFF  (显存)
 *   PAL     0x05000000 - 0x05000400  (调色板)
 *   OAM     0x07000000 - 0x07000400  (对象属性内存)
 *   IO      0x04000000 - 0x04001000  (MMIO 寄存器)
 *
 * 本基座不自行改写内存读写语义；所有翻译函数以本实例为唯一状态来源。
 * TODO(分块覆盖)：
 *   [ ] read8/read16/read32 区域分派与对齐处理
 *   [ ] write8/16/32 区域分派 + MMIO 写副作用（DISPCNT/KEYINPUT/触摸等）
 *   [ ] updateFlags 按 ADD/SUB/AND/ORR/LSL/LSR/ASR/CMP/TST 运算更新 N/Z/C/V
 *   [ ] 条件分支求值（EQ/NE/CS/CC/MI/PL/VS/VC/HI/LS/GE/LT/GT/LE）
 */

/** 内存区域常量（与 NDS 硬件地址一致） */
export const MEM = {
  EWRAM_BASE: 0x02000000,
  EWRAM_SIZE: 0x00400000, // 4MB
  IWRAM_BASE: 0x03000000,
  IWRAM_SIZE: 0x00008000, // 32KB 常用
  IO_BASE: 0x04000000,
  IO_SIZE: 0x00001000,
  PAL_BASE: 0x05000000,
  PAL_SIZE: 0x00000400,
  VRAM_BASE: 0x06000000,
  VRAM_SIZE: 0x00080000,
  OAM_BASE: 0x07000000,
  OAM_SIZE: 0x00000400,
} as const;

/** 简单读取错误：无区域映射的地址 */
export class NdsMemError extends Error {
  constructor(public addr: number, width: number) {
    super(`NdsHardware: unmapped ${width}-bit read/write at 0x${addr.toString(16)}`);
  }
}

export class NdsHardware {
  public ewram: Uint8Array;
  public iwram: Uint8Array;
  public vram: Uint8Array;
  public oam: Uint8Array;
  public palRam: Uint8Array;
  public mmio: Uint8Array; // 4KB IO，字节数组便于 u8/u16/u32 区分

  // R0-R15 + CPSR 标志 N Z C V
  public reg: Uint32Array;
  public cpsr: { n: boolean; z: boolean; c: boolean; v: boolean };

  constructor() {
    this.ewram = new Uint8Array(MEM.EWRAM_SIZE);
    this.iwram = new Uint8Array(MEM.IWRAM_SIZE);
    this.vram = new Uint8Array(MEM.VRAM_SIZE);
    this.oam = new Uint8Array(MEM.OAM_SIZE);
    this.palRam = new Uint8Array(MEM.PAL_SIZE);
    this.mmio = new Uint8Array(MEM.IO_SIZE);
    this.reg = new Uint32Array(16);
    this.cpsr = { n: false, z: false, c: false, v: false };
  }

  /** 获取某寄存器（含 PC） */
  getReg(r: number): number {
    return this.reg[r & 15];
  }
  /** 写寄存器（R15 写入按 ARM 行为：强制对齐 + 保留 T 位） */
  setReg(r: number, v: number): void {
    const idx = r & 15;
    let val = v >>> 0;
    if (idx === 15) {
      val = (val & ~1) >>> 0; // ARM 模式
    }
    this.reg[idx] = val;
  }

  // ---- 地址区域分派 ----
  private regionFor(addr: number): Uint8Array | null {
    if (addr >= MEM.EWRAM_BASE && addr < MEM.EWRAM_BASE + MEM.EWRAM_SIZE) {
      return this.ewram.subarray(addr - MEM.EWRAM_BASE);
    }
    if (addr >= MEM.IWRAM_BASE && addr < MEM.IWRAM_BASE + MEM.IWRAM_SIZE) {
      return this.iwram.subarray(addr - MEM.IWRAM_BASE);
    }
    if (addr >= MEM.IO_BASE && addr < MEM.IO_BASE + MEM.IO_SIZE) {
      return this.mmio.subarray(addr - MEM.IO_BASE);
    }
    if (addr >= MEM.PAL_BASE && addr < MEM.PAL_BASE + MEM.PAL_SIZE) {
      return this.palRam.subarray(addr - MEM.PAL_BASE);
    }
    if (addr >= MEM.VRAM_BASE && addr < MEM.VRAM_BASE + MEM.VRAM_SIZE) {
      return this.vram.subarray(addr - MEM.VRAM_BASE);
    }
    if (addr >= MEM.OAM_BASE && addr < MEM.OAM_BASE + MEM.OAM_SIZE) {
      return this.oam.subarray(addr - MEM.OAM_BASE);
    }
    return null;
  }

  read8(addr: number): number {
    const r = this.regionFor(addr);
    if (!r) throw new NdsMemError(addr, 8);
    return r[0];
  }
  read16(addr: number): number {
    const r = this.regionFor(addr);
    if (!r) throw new NdsMemError(addr, 16);
    return (r[0] | (r[1] << 8)) & 0xffff;
  }
  read32(addr: number): number {
    const r = this.regionFor(addr);
    if (!r) throw new NdsMemError(addr, 32);
    return ((r[0] | (r[1] << 8) | (r[2] << 16) | (r[3] << 24)) | 0) >>> 0;
  }

  write8(addr: number, v: number): void {
    const r = this.regionFor(addr);
    if (!r) throw new NdsMemError(addr, 8);
    r[0] = v & 0xff;
  }
  write16(addr: number, v: number): void {
    const r = this.regionFor(addr);
    if (!r) throw new NdsMemError(addr, 16);
    r[0] = v & 0xff;
    r[1] = (v >>> 8) & 0xff;
  }
  write32(addr: number, v: number): void {
    const r = this.regionFor(addr);
    if (!r) throw new NdsMemError(addr, 32);
    r[0] = v & 0xff;
    r[1] = (v >>> 8) & 0xff;
    r[2] = (v >>> 16) & 0xff;
    r[3] = (v >>> 24) & 0xff;
  }

  // ---- CPSR 标志位 ----
  /** 根据运算结果更新标志位（op: 'add'|'sub'|'logic'|'cmp'|'shift'） */
  updateFlags(result: number, op: string, opA: number, opB: number): void {
    const r = result >>> 0;
    this.cpsr.z = r === 0;
    this.cpsr.n = (r & 0x80000000) !== 0;
    switch (op) {
      case "add": {
        this.cpsr.c = (opA + opB) > 0xffffffff;
        const ra = (opA & 0x80000000) !== 0;
        const rb = (opB & 0x80000000) !== 0;
        const rr = (r & 0x80000000) !== 0;
        this.cpsr.v = (ra === rb) && (ra !== rr);
        break;
      }
      case "sub": {
        // opA - opB；C = 无借位（opA >= opB）
        this.cpsr.c = opA >= opB;
        const ra = (opA & 0x80000000) !== 0;
        const rb = (opB & 0x80000000) !== 0;
        const rr = (r & 0x80000000) !== 0;
        this.cpsr.v = (ra !== rb) && (ra !== rr);
        break;
      }
      case "logic":
      case "cmp":
        // 逻辑运算 C 保留：移位指令才设置；此处按 ARM 逻辑指令不清除 C
        break;
      default:
        break;
    }
  }

  /** 根据 CPSR 求条件码是否成立 */
  condPassed(cond: string): boolean {
    const { n, z, c, v } = this.cpsr;
    switch (cond) {
      case "eq": return z;
      case "ne": return !z;
      case "cs": case "hs": return c;
      case "cc": case "lo": return !c;
      case "mi": return n;
      case "pl": return !n;
      case "vs": return v;
      case "vc": return !v;
      case "hi": return c && !z;
      case "ls": return !c || z;
      case "ge": return n === v;
      case "lt": return n !== v;
      case "gt": return !z && (n === v);
      case "le": return z || (n !== v);
      case "al": return true;
      default: return true;
    }
  }
}
