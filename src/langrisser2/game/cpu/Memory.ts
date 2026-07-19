/**
 * Memory Bus — 68K 地址空间到实际硬件的映射
 *
 * 地址空间布局:
 *   $000000-$1FFFFF: ROM (2MB, 镜像到 $3FFFFF)
 *   $A00000-$A1001F: I/O 端口 (控制器, Z80, TMSS)
 *   $C00000-$C0001F: VDP 端口
 *   $FF0000-$FFFFFF: 工作 RAM (64KB)
 */

import { RomLoader } from '../core/RomLoader';
import { Ram } from '../core/Ram';
import { VdpChip } from '../vdp/VdpChip';
import { IO_PORTS } from '../core/types';

export interface MemAccess {
  type: 'rom' | 'ram' | 'vdp' | 'io' | 'unmapped';
  offset: number;
}

export class Memory {
  readonly rom: RomLoader;
  readonly ram: Ram;
  readonly vdp: VdpChip;

  /** TMSS 已解锁 */
  tmssUnlocked: boolean = false;

  /** Z80 总线状态 */
  z80BusReq: boolean = false;

  /** 控制器数据: port 1 (默认: 无按下) */
  joypad1: number = 0x00;

  constructor(rom: RomLoader, ram: Ram, vdp: VdpChip) {
    this.rom = rom;
    this.ram = ram;
    this.vdp = vdp;
  }

  // ============================================================
  // 地址解码
  // ============================================================

  decode(addr: number): MemAccess {
    // ROM: $000000-$1FFFFF (mirror: $200000-$3FFFFF)
    if (addr < 0x400000) {
      return { type: 'rom', offset: addr & 0x1FFFFF };
    }

    // I/O: $A00000-$A0FFFF (Genesis I/O space includes TMSS at $A14000, Z80 at $A11100, etc.)
    if (addr >= 0xA00000 && addr <= 0xA0FFFF) {
      return { type: 'io', offset: addr - 0xA00000 };
    }

    // VDP: $C00000-$C0001F (mirrored every $20)
    if (addr >= 0xC00000 && addr <= 0xC0001F) {
      return { type: 'vdp', offset: addr & 0x1F };
    }

    // RAM: $FF0000-$FFFFFF
    if (addr >= 0xFF0000 && addr <= 0xFFFFFF) {
      return { type: 'ram', offset: addr & 0xFFFF };
    }

    return { type: 'unmapped', offset: 0 };
  }

  // ============================================================
  // 字节读写 (68K 8-bit)
  // ============================================================

  read8(addr: number): number {
    const m = this.decode(addr);
    switch (m.type) {
      case 'rom':
        return this.rom.read8(m.offset);
      case 'ram':
        return this.ram.read8(m.offset + 0xFF0000);
      case 'vdp':
        return this.readVdp8(m.offset);
      case 'io':
        return this.readIo8(m.offset);
      default:
        return 0;
    }
  }

  write8(addr: number, value: number): void {
    const m = this.decode(addr);
    switch (m.type) {
      case 'rom':
        // ROM is read-only, ignore
        break;
      case 'ram':
        this.ram.write8(m.offset + 0xFF0000, value);
        break;
      case 'vdp':
        this.writeVdp8(m.offset, value);
        break;
      case 'io':
        this.writeIo8(m.offset, value);
        break;
    }
  }

  // ============================================================
  // Word 读写 (68K 16-bit, 大端序)
  // ============================================================

  read16(addr: number): number {
    // 68K word must be even-aligned
    const m = this.decode(addr);
    switch (m.type) {
      case 'rom':
        return this.rom.read16(m.offset);
      case 'ram':
        return this.ram.read16(m.offset + 0xFF0000);
      case 'vdp':
        return this.readVdp16(m.offset);
      case 'io':
        return this.readIo16(m.offset);
      default:
        return 0;
    }
  }

  write16(addr: number, value: number): void {
    const m = this.decode(addr);
    switch (m.type) {
      case 'rom':
        break;
      case 'ram':
        this.ram.write16(m.offset + 0xFF0000, (value >>> 0) & 0xFFFF);
        break;
      case 'vdp':
        this.writeVdp16(m.offset, (value >>> 0) & 0xFFFF);
        break;
      case 'io':
        this.writeIo16(m.offset, (value >>> 0) & 0xFFFF);
        break;
    }
  }

  // ============================================================
  // Long 读写 (68K 32-bit)
  // ============================================================

  read32(addr: number): number {
    const m = this.decode(addr);
    switch (m.type) {
      case 'rom':
        return this.rom.read32(m.offset);
      case 'ram':
        return this.ram.read32(m.offset + 0xFF0000);
      default:
        // 32-bit access to non-ROM/RAM is two 16-bit reads
        return (this.read16(addr) << 16) | this.read16(addr + 2);
    }
  }

  write32(addr: number, value: number): void {
    const m = this.decode(addr);
    switch (m.type) {
      case 'rom':
        break;
      case 'ram':
        this.ram.write32(m.offset + 0xFF0000, value >>> 0);
        break;
      default:
        this.write16(addr, (value >> 16) & 0xFFFF);
        this.write16(addr + 2, value & 0xFFFF);
        break;
    }
  }

  // ============================================================
  // VDP 端口访问
  // ============================================================

  private readVdp8(offset: number): number {
    // 8-bit VDP access: return upper byte when reading from even address
    if ((offset & 1) === 0) {
      return (this.vdp.ports.read(offset) >> 8) & 0xFF;
    }
    return this.vdp.ports.read(offset & ~1) & 0xFF;
  }

  private writeVdp8(offset: number, value: number): void {
    // Genesis VDP: 8-bit write ignored (VDP only accepts 16-bit)
  }

  private readVdp16(offset: number): number {
    return this.vdp.ports.read(offset & ~1) & 0xFFFF;
  }

  private writeVdp16(offset: number, value: number): void {
    this.vdp.ports.write(offset & ~1, value & 0xFFFF);
  }

  // ============================================================
  // I/O 端口访问
  // ============================================================

  private readIo8(offset: number): number {
    return (this.readIo16(offset & ~1) >> ((offset & 1) ? 0 : 8)) & 0xFF;
  }

  private writeIo8(offset: number, value: number): void {
    // 8-bit I/O: apply to upper byte of word port
    if ((offset & 1) === 0) {
      const old = this.readIo16(offset);
      this.writeIo16(offset, (old & 0x00FF) | ((value & 0xFF) << 8));
    }
  }

  private readIo16(offset: number): number {
    switch (offset) {
      // TMSS 版本 ($A10000)
      case 0x10000: return 0xA0; // PCB version (non-zero → TMSS required)

      // 控制器 1 数据 ($A10002 / $A10004)
      case 0x10002: case 0x10004: return 0xFF & ~this.joypad1;

      // 控制器 1 控制 ($A10008)
      case 0x10008: return 0x00;

      // Z80 bus ($A11100)
      case 0x11100: return this.z80BusReq ? 0x0100 : 0x0000;

      // Z80 reset ($A11200)
      case 0x11200: return 0x0000;

      default:
        return 0;
    }
  }

  private writeIo16(offset: number, value: number): void {
    switch (offset) {
      // TMSS 解锁 ($A14000): 写 "SEGA" ($53454741)
      case 0x14000:
      case 0x14002:
        // TMSS reg — writing anything contributes to unlock
        break;

      // Z80 bus request ($A11100)
      case 0x11100:
        this.z80BusReq = (value & 0x0100) !== 0;
        break;

      // Z80 reset ($A11200)
      case 0x11200:
        // Z80 reset control
        break;
    }
  }
}
