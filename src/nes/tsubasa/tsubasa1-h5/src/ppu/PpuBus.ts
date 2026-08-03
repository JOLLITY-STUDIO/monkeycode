/**
 * PPU 总线
 * 管理 PPU 地址空间的读写，包括 Name Table、Pattern Table、调色板
 */
import { Mmc1Mapper } from '../mapper/Mmc1Mapper';
import { NES_PALETTE } from '../rom/types';

/** PPU 地址空间大小 */
const PPU_MEM_SIZE = 0x4000;

/** Name Table 大小 */
const NT_SIZE = 0x0400;  // 1024 bytes
const AT_SIZE = 0x0040;  // 64 bytes (attribute table)

export class PpuBus {
  /** Name Table 0 ($2000-$23FF) */
  readonly nt0: Uint8Array;
  /** Name Table 1 ($2400-$27FF) */
  readonly nt1: Uint8Array;
  /** Name Table 2 ($2800-$2BFF) - 镜像 */
  readonly nt2: Uint8Array;
  /** Name Table 3 ($2C00-$2FFF) - 镜像 */
  readonly nt3: Uint8Array;

  /** 调色板 RAM ($3F00-$3F1F) */
  readonly paletteRam: Uint8Array;

  /** Pattern Table 数据 (来自 CHR-ROM) */
  private chrRom: Uint8Array[];

  /** MMC1 引用 */
  private mmc1: Mmc1Mapper;

  /** 镜像模式 (0=水平, 1=垂直) */
  mirroring: number = 0;

  constructor(chrRom: Uint8Array[], mmc1: Mmc1Mapper) {
    this.chrRom = chrRom;
    this.mmc1 = mmc1;
    this.nt0 = new Uint8Array(NT_SIZE);
    this.nt1 = new Uint8Array(NT_SIZE);
    this.nt2 = new Uint8Array(NT_SIZE);
    this.nt3 = new Uint8Array(NT_SIZE);
    this.paletteRam = new Uint8Array(32);
  }

  /** 读取 PPU 内存 */
  read(address: number): number {
    address &= 0x3FFF;

    // Pattern Table: $0000-$1FFF (通过 MMC1 映射 CHR-ROM)
    if (address < 0x2000) {
      return this.readPatternTable(address);
    }

    // Name Table: $2000-$2FFF
    if (address < 0x3000) {
      return this.readNameTable(address);
    }

    // 镜像: $3000-$3EFF
    if (address < 0x3F00) {
      return this.readNameTable(address - 0x1000);
    }

    // 调色板: $3F00-$3FFF
    return this.readPalette(address);
  }

  /** 写入 PPU 内存 */
  write(address: number, value: number): void {
    address &= 0x3FFF;

    // Pattern Table 不可写 (CHR-ROM)
    if (address < 0x2000) {
      return;
    }

    // Name Table: $2000-$2FFF
    if (address < 0x3000) {
      this.writeNameTable(address, value);
      return;
    }

    // 镜像: $3000-$3EFF
    if (address < 0x3F00) {
      this.writeNameTable(address - 0x1000, value);
      return;
    }

    // 调色板: $3F00-$3FFF
    this.writePalette(address, value);
  }

  /** 读取 Pattern Table (通过 MMC1) */
  private readPatternTable(address: number): number {
    if (address < 0x1000) {
      // Pattern Table 0: 通过 MMC1 R1 映射
      const bank = this.mmc1.getChrBank0();
      return this.chrRom[bank][address];
    } else {
      // Pattern Table 1: 通过 MMC1 R2 映射
      const bank = this.mmc1.getChrBank1();
      return this.chrRom[bank][address - 0x1000];
    }
  }

  /** 读取 Name Table (带镜像) */
  private readNameTable(address: number): number {
    const ntIndex = (address >> 10) & 0x03;
    const offset = address & 0x3FF;

    switch (ntIndex) {
      case 0: return this.nt0[offset];
      case 1: return this.nt1[offset];
      case 2: return this.nt2[offset];
      case 3: return this.nt3[offset];
      default: return 0;
    }
  }

  /** 写入 Name Table */
  private writeNameTable(address: number, value: number): void {
    const ntIndex = (address >> 10) & 0x03;
    const offset = address & 0x3FF;

    switch (ntIndex) {
      case 0: this.nt0[offset] = value; break;
      case 1: this.nt1[offset] = value; break;
      case 2: this.nt2[offset] = value; break;
      case 3: this.nt3[offset] = value; break;
    }
  }

  /** 读取调色板 */
  private readPalette(address: number): number {
    let index = address & 0x1F;
    // $3F10, $3F14, $3F18, $3F1C 镜像到 $3F00, $3F04, $3F08, $3F0C
    if (index >= 0x10 && (index & 0x03) === 0) {
      index -= 0x10;
    }
    return this.paletteRam[index];
  }

  /** 写入调色板 */
  private writePalette(address: number, value: number): void {
    let index = address & 0x1F;
    if (index >= 0x10 && (index & 0x03) === 0) {
      index -= 0x10;
    }
    this.paletteRam[index] = value;
  }

  /** 获取渲染用的调色板 (0-3 号调色板) */
  getBgPalette(paletteIndex: number): number[] {
    const result: number[] = [];
    const base = paletteIndex * 4;
    // 第一个颜色始终是背景色 ($3F00)
    result.push(NES_PALETTE[this.paletteRam[0] & 0x3F]);
    for (let i = 1; i < 4; i++) {
      result.push(NES_PALETTE[this.paletteRam[base + i] & 0x3F]);
    }
    return result;
  }

  /** 获取精灵调色板 */
  getSpritePalette(paletteIndex: number): number[] {
    const result: number[] = [];
    const base = 0x10 + paletteIndex * 4;
    // 透明色
    result.push(0);
    for (let i = 1; i < 4; i++) {
      result.push(NES_PALETTE[this.paletteRam[base + i] & 0x3F]);
    }
    return result;
  }

  /** 获取 CHR Bank 原始数据 */
  getChrBank(index: number): Uint8Array {
    return this.chrRom[index];
  }

  /** 清除 Name Table */
  clearNameTable(ntIndex: number): void {
    switch (ntIndex) {
      case 0: this.nt0.fill(0); break;
      case 1: this.nt1.fill(0); break;
      case 2: this.nt2.fill(0); break;
      case 3: this.nt3.fill(0); break;
    }
  }

  /** 清除所有 Name Table */
  clearAllNameTables(): void {
    this.nt0.fill(0);
    this.nt1.fill(0);
    this.nt2.fill(0);
    this.nt3.fill(0);
  }
}
