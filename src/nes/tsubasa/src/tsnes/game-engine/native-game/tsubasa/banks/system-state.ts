/**
 * 系统共享状态 — 所有翻译后的 bank 共用的内存/寄存器/PPU 句柄
 *
 * 这个对象替代了原来的 6502 CPU 模拟器 (core/cpu.ts)。
 * 翻译后的 TypeScript 代码直接读写这些字段，不再经过 opcode 解释。
 *
 * 内存布局（与 NES 一致）：
 *   $0000-$00FF  零页 (ZP)
 *   $0100-$01FF  堆栈
 *   $0200-$02FF  OAM (sprite DMA 缓冲区)
 *   $0300-$07FF  通用 RAM
 *   $2000-$2007  PPU 寄存器 (通过 ppu 代理)
 *   $4000-$4017  APU/Controller 寄存器
 *   $8000-$9FFF  MMC3 PRG-ROM bank 0 (swappable)
 *   $A000-$BFFF  MMC3 PRG-ROM bank 1 (swappable)
 *   $C000-$DFFF  MMC3 PRG-ROM bank 30 (固定, 倒数第二)
 *   $E000-$FFFF  MMC3 PRG-ROM bank 31 (固定, boot vectors)
 */

import type PPU from '../../../core/ppu/index';
import type PAPU from '../../../core/papu/index';

/** 6502 寄存器快照 (用于跨 bank 调用上下文) */
export interface CpuRegs {
  A: number;   // accumulator
  X: number;   // X index
  Y: number;   // Y index
  SP: number;  // stack pointer
  PC: number;  // program counter (16-bit, 仅用于调试)
  P: number;   // status flags (NV-BDIZC)
}

/** NES 完整系统状态 */
export interface SystemState {
  /** 完整 CPU 内存 (64KB: $0000-$FFFF) */
  mem: Uint8Array;
  /** CPU 寄存器 */
  regs: CpuRegs;
  /** PPU 实例 (保留硬件层) */
  ppu: PPU;
  /** APU 实例 (保留硬件层) */
  papu: PAPU;
  /** MMC3 bank 映射 (8KB window → bank index 0-31) */
  mmc3Map: Uint8Array;
  /** MMC3 bank select register ($8000) */
  mmc3BankSelect: number;
  /** MMC3 bank data register ($8001) */
  mmc3BankData: number;
  /** NMI 挂起标志 */
  nmiPending: boolean;
  /** 帧计数 */
  frameCount: number;
  /** MMC3 寄存器影子变量 ($0022 + 相关) */
  mmc3Shadow: number;
}

/** 创建初始系统状态 */
export function createSystemState(ppu: PPU, papu: PAPU): SystemState {
  const mem = new Uint8Array(0x10000);
  const mmc3Map = new Uint8Array(4);

  // MMC3 初始 8KB 映射 (与 ROM 一致)
  // $8000-$9FFF → bank 00 (dispatch/scene engine)
  // $A000-$BFFF → bank 01 (match jump)
  // $C000-$DFFF → bank 30 (system library)
  // $E000-$FFFF → bank 31 (boot vectors)
  mmc3Map[0] = 0;   // $8000 window
  mmc3Map[1] = 1;   // $A000 window
  mmc3Map[2] = 30;  // $C000 window
  mmc3Map[3] = 31;  // $E000 window

  return {
    mem,
    regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x0000, P: 0x34 },
    ppu,
    papu,
    mmc3Map,
    mmc3BankSelect: 0,
    mmc3BankData: 0,
    nmiPending: false,
    frameCount: 0,
    mmc3Shadow: 0,
  };
}

/** 读取内存 (含 MMC3 bank 映射) */
export function readMem(sys: SystemState, addr: number): number {
  if (addr < 0x2000) {
    // CPU RAM: $0000-$1FFF (mirrored every $800)
    return sys.mem[addr & 0x07FF];
  }
  if (addr < 0x4000) {
    // PPU registers $2000-$2007 (mirrored every 8)
    switch (addr & 0x7) {
      case 0x2: return sys.ppu.readStatusRegister();
      case 0x4: return sys.ppu.sramLoad();
      case 0x7: return sys.ppu.vramLoad();
      default:  return 0; // open bus
    }
  }
  if (addr < 0x4020) {
    // APU/Controller
    if ((addr & 0x4017) === 0x4016) return 0; // controller read
    return 0;
  }
  if (addr >= 0x8000) {
    // PRG-ROM through MMC3
    const windowIdx = (addr - 0x8000) >> 13; // 0-3 for 8KB windows
    const bankIdx = sys.mmc3Map[windowIdx];
    const offset = addr & 0x1FFF;
    return readPrgRom(sys, bankIdx, offset);
  }
  // $4020-$7FFF: normally open bus
  return 0;
}

/** 写入内存 (含 MMC3 bank 切换) */
export function writeMem(sys: SystemState, addr: number, val: number): void {
  if (addr < 0x2000) {
    sys.mem[addr & 0x07FF] = val;
    return;
  }
  if (addr < 0x4000) {
    switch (addr & 0x7) {
      case 0x0: sys.ppu.updateControlReg1(val); break;
      case 0x1: sys.ppu.updateControlReg2(val); break;
      case 0x3: sys.ppu.writeSRAMAddress(val); break;
      case 0x4: sys.ppu.sramWrite(val);        break;
      case 0x5: sys.ppu.scrollWrite(val);      break;
      case 0x6: sys.ppu.writeVRAMAddress(val); break;
      case 0x7: sys.ppu.vramWrite(val);        break;
    }
    return;
  }
  if (addr < 0x4020) {
    // APU/Controller writes
    if (addr === 0x4014) sys.ppu.sramDMA(val);
    return;
  }
  if (addr >= 0x8000 && addr < 0xA000) {
    // MMC3 registers
    if ((addr & 0x1) === 0) {
      // $8000/$8001 even: bank select
      sys.mmc3BankSelect = val;
    } else {
      // $8001 odd: bank data
      sys.mmc3BankData = val;
      applyMmc3BankWrite(sys);
    }
    return;
  }
  // $A000-$FFFF in MMC3: also has mirroring and PRG-RAM protect registers
  if (addr >= 0xA000 && addr < 0xC000) {
    if ((addr & 0x1) === 0) {
      // $A000: mirroring select
    } else {
      // $A001: PRG-RAM protect
    }
  }
}

/** MMC3 bank data register 写入后更新映射 */
function applyMmc3BankWrite(sys: SystemState): void {
  const sel = sys.mmc3BankSelect & 0x07;
  const val = sys.mmc3BankData & 0x3F;

  // ── PRG bank 切换 (cases 6-7) ──
  //   TS 架构下 PRG bank 是独立 import 模块, 不依赖 MMC3 地址映射。
  //   bank 切换通过回调闭包直接调用目标模块函数, mmc3Map 仅用于 PPU 渲染侧跟踪。
  //   因此不再通过 MMC3 寄存器写更新 mmc3Map。

  // ── CHR bank 切换 (cases 0-5): 必须转发到 PPU mapper ──
  //   PPU 渲染需要知道当前图形数据映射, 通过 mapper.write() 加载到 PPU vramMem/ptTile。
  if (sel <= 5) {
    const mmap: any = (sys.ppu as any).nes?.mmap;
    if (mmap && typeof mmap.write === 'function') {
      mmap.write(0x8000, sys.mmc3BankSelect);
      mmap.write(0x8001, sys.mmc3BankData);
    }
  }
}

/** 从 bank ROM 数据读一个字节 */
function readPrgRom(sys: SystemState, bankIdx: number, offset: number): number {
  // 翻译后的 bank 通过 bankTable 注册
  return bankRomTable[bankIdx]?.[offset] ?? 0;
}

// ═════════════════════════════════════════
// ROM 注册表 — 翻译后的 bank 在此注册只读数据
// ═════════════════════════════════════════

/** 翻译后的 bank ROM 数据表 (只读, 供 MMC3 映射读取) */
const bankRomTable: Record<number, Uint8Array> = {};

/** 注册翻译后的 bank ROM 数据 (8KB) */
export function registerBankRom(bankIdx: number, data: Uint8Array): void {
  bankRomTable[bankIdx] = data;
}

/**
 * 批量注册所有 32 个 PRG-ROM bank。
 * 从 rom-data.ts 的 PRG_ROM_BANKS 数组直接注册。
 * 必须在 createSystemState() 之前或 MMC3 bank 切换之前调用。
 */
export function registerAllBanks(prgBanks: readonly Uint8Array[]): void {
  for (let i = 0; i < prgBanks.length && i < 32; i++) {
    bankRomTable[i] = prgBanks[i];
  }
}

/** 获取已注册 bank 数量 (用于调试) */
export function registeredBankCount(): number {
  return Object.keys(bankRomTable).length;
}
