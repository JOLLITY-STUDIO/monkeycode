/**
 * 系统共享状态 — 所有翻译后的 bank 共用的内存/寄存器/PPU 句柄
 *
 * 这个对象替代了原来的 6502 CPU 模拟器 (core/cpu.ts)。
 * 翻译后的 TypeScript 代码直接读写这些字段，不再经过 opcode 解释。
 *
 * 内存布局（仅 CPU RAM）：
 *   $0000-$00FF  零页 (ZP)
 *   $0100-$01FF  堆栈
 *   $0200-$02FF  OAM (sprite DMA 缓冲区)
 *   $0300-$07FF  通用 RAM
 *
 * PRG ROM 不再通过 MMC3 地址窗口映射——32 个 8KB bank 数组直接 import，
 * readMem 通过 bankMap 查表定位。无硬件寄存器模拟。
 */

import type PPU from '../../../core/ppu/index';
import type PAPU from '../../../core/papu/index';
import { NES_PRG_ROM } from '../../../../rom-data/index';

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
  /** 完整 CPU 内存 (只到 $0800, RAM 部分) */
  mem: Uint8Array;
  /** CPU 寄存器 */
  regs: CpuRegs;
  /** PPU 实例 (保留硬件层) */
  ppu: PPU;
  /** APU 实例 (保留硬件层) */
  papu: PAPU;
  /** PRG bank 查表: 6502 地址窗口 → bank 号 (0-31) */
  bankMap: Uint8Array;
  /** NMI 挂起标志 */
  nmiPending: boolean;
  /** 帧计数 */
  frameCount: number;
  /** Boot 阶段计数器 (0=未开始, 1-12=各阶段, 99=完成) */
  bootPhase: number;
  /** Boot 子步骤（用于字节码等待帧计数器） */
  bootSubStep: number;
  /** boot 脚本参数缓存 */
  bootTableVal: number;
}

// ═════════════════════════════════════════
// PRG ROM — 启动时从 NES_PRG_ROM 切成 32 个 8KB bank
// ═════════════════════════════════════════

/** 32 个 PRG bank 数据数组 (每个 8KB = 8192 bytes) */
const BANK_SIZE = 8192;
const TOTAL_BANKS = 32;
export const prgBanks: Uint8Array[] = [];

// 从 NES_PRG_ROM 连续字节流切成 32 个独立 bank
for (let i = 0; i < TOTAL_BANKS; i++) {
  const start = i * BANK_SIZE;
  const data = new Uint8Array(BANK_SIZE);
  for (let j = 0; j < BANK_SIZE; j++) {
    data[j] = NES_PRG_ROM[start + j] ?? 0;
  }
  prgBanks.push(data);
}

/** 创建初始系统状态 */
export function createSystemState(ppu: PPU, papu: PAPU): SystemState {
  const mem = new Uint8Array(0x10000);
  const bankMap = new Uint8Array(4);

  // 初始 bank 映射: 6502 ROM 地址 → prgBanks 索引
  // $8000-$9FFF → bank 00
  // $A000-$BFFF → bank 01
  // $C000-$DFFF → bank 30 (固定)
  // $E000-$FFFF → bank 31 (固定)
  bankMap[0] = 0;   // $8000 window
  bankMap[1] = 1;   // $A000 window
  bankMap[2] = 30;  // $C000 window
  bankMap[3] = 31;  // $E000 window

  return {
    mem,
    regs: { A: 0, X: 0, Y: 0, SP: 0xFD, PC: 0x0000, P: 0x34 },
    ppu,
    papu,
    bankMap,
    nmiPending: false,
    frameCount: 0,
    bootPhase: 0,
    bootSubStep: 0,
    bootTableVal: 0,
  };
}

/** 读取内存 */
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
      default:  return 0;
    }
  }
  if (addr < 0x4020) {
    // APU/Controller
    if ((addr & 0x4017) === 0x4016) return 0;
    return 0;
  }
  if (addr >= 0x8000) {
    // PRG ROM — 通过 bankMap 查表直接读 prgBanks 数组
    const windowIdx = (addr - 0x8000) >> 13; // 0-3
    const bankIdx = sys.bankMap[windowIdx];
    const offset = addr & 0x1FFF;
    return prgBanks[bankIdx]?.[offset] ?? 0;
  }
  return 0;
}

/** 写入内存 */
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
    if (addr === 0x4014) sys.ppu.sramDMA(val);
    return;
  }
  // $8000-$9FFF: MMC3 寄存器 — PRG 不再需要, CHR(0-5)必须转发给 PPU mapper
  if (addr >= 0x8000 && addr < 0xA000) {
    if ((addr & 0x1) === 0) {
      // $8000: MMC3 bank select
      sys.mem[0x0622] = val;  // shadow bank select (temp storage)
    } else {
      // $8001: MMC3 bank data — 仅 CHR 窗口 (sel 0-5) 转发给 PPU
      const sel = sys.mem[0x0622] & 0x07;
      if (sel <= 5) {
        const mmap: any = (sys.ppu as any).nes?.mmap;
        if (mmap && typeof mmap.write === 'function') {
          mmap.write(0x8000, sys.mem[0x0622]);
          mmap.write(0x8001, val);
        }
      }
      // PRG bank (sel 6-7): 已改用 direct prgBanks 访问, 无需处理
    }
    return;
  }
  // $A000-$FFFF: PRG mirror select / PRG-RAM protect — 当前不处理, ROM 只读
}

/**
 * 设置 PRG bank 映射: 6502 地址窗口 → prgBanks 索引。
 * 替代原 MMC3 bankSwitch — 纯查表，不模拟硬件寄存器。
 */
export function setBankMap(sys: SystemState, bankId: number): void {
  const id = bankId & 0x3F;
  sys.bankMap[0] = id;       // $8000-$9FFF
  sys.bankMap[1] = id + 1;   // $A000-$BFFF
}

// 重新导出 registerBankRom/registerAllBanks 作为兼容别名
export { setBankMap as bankSwitch };

/** 兼容旧代码——已废弃，改用 setBankMap */
/** @deprecated */
export function registerBankRom(_bankIdx: number, _data: Uint8Array): void {}
/** @deprecated */
export function registerAllBanks(_prgBanks: readonly Uint8Array[]): void {}
