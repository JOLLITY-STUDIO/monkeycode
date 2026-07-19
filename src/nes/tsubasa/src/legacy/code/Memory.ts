/**
 * MMC3 Memory Map - 管理 PRG/CHR bank 切换和 NES 地址空间
 *
 * MMC3 ($4) 布局:
 *   $6000-$7FFF: PRG RAM (8KB, battery-backed)
 *   $8000-$9FFF: 8KB PRG ROM bank (switchable)
 *   $A000-$BFFF: 8KB PRG ROM bank (switchable)
 *   $C000-$DFFF: 8KB PRG ROM bank (fixed to second-last)
 *   $E000-$FFFF: 8KB PRG ROM bank (fixed to last)
 */
import {
  NesRom, Mmc3Regs, PpuState,
  RAM_SIZE, VRAM_SIZE, OAM_SIZE,
  MMC3_PRG_BANK_SIZE,
  MMC3_BANK_SELECT, MMC3_BANK_DATA,
  MMC3_MIRRORING, MMC3_PRG_PROTECT,
  MMC3_IRQ_LATCH, MMC3_IRQ_RELOAD,
  MMC3_IRQ_DISABLE, MMC3_IRQ_ENABLE,
  PPU_CTRL, PPU_MASK, PPU_STATUS, PPU_OAMADDR,
  PPU_OAMDATA, PPU_SCROLL, PPU_ADDR, PPU_DATA,
  JOYPAD1, JOYPAD2,
} from '../types';

export interface NesMemory {
  /** Read byte from NES CPU address space */
  read(addr: number): number;
  /** Write byte to NES CPU address space */
  write(addr: number, value: number): void;
  /** Access raw RAM */
  ram: Uint8Array;
  /** Access raw PRG ROM (flat, all banks) */
  prg: Uint8Array;
  /** Access raw CHR ROM */
  chr: Uint8Array;
  /** PPU state */
  ppu: PpuState;
  /** MMC3 state */
  mmc3: Mmc3Regs;
  /** Return effective address for a given PC (bank-resolved) */
  resolvePrgAddr(bank: number, pc: number): number;
}

export function createMemory(rom: NesRom, ppu: PpuState, mmc3: Mmc3Regs): NesMemory {
  const ram = new Uint8Array(RAM_SIZE);
  const prg = rom.prg;
  const chr = rom.chr;

  // Number of 8KB PRG banks
  const numPrgBanks = prg.length >>> 13; // / 8192
  const lastBank = numPrgBanks - 1;
  const secondLastBank = numPrgBanks - 2;

  const resolvePrgAddr = (bank: number, pc: number): number => {
    return bank * MMC3_PRG_BANK_SIZE + (pc & 0x1FFF);
  };

  const read = (addr: number): number => {
    if (addr < 0x2000) {
      // Work RAM ($0000-$07FF) mirrored up to $1FFF
      return ram[addr & 0x07FF];
    }
    if (addr < 0x4000) {
      // PPU registers ($2000-$2007, mirrored every 8 bytes)
      return readPpuReg(addr & 0x2007, ppu);
    }
    if (addr < 0x6000) {
      // APU / expansion (ignore for now)
      return 0x00;
    }
    if (addr < 0x8000) {
      // PRG RAM ($6000-$7FFF, battery-backed on some carts)
      // Not used extensively in Tsubasa II
      return 0x00;
    }
    // PRG ROM ($8000-$FFFF) via MMC3
    return readPrgRom(addr, prg, mmc3, lastBank, secondLastBank);
  };

  const write = (addr: number, value: number): void => {
    if (addr < 0x2000) {
      ram[addr & 0x07FF] = value;
      return;
    }
    if (addr < 0x4000) {
      writePpuReg(addr & 0x2007, value, ppu);
      return;
    }
    if (addr < 0x6000) {
      // APU - ignore for now
      return;
    }
    if (addr < 0x8000) {
      // PRG RAM - ignore for now
      return;
    }
    // MMC3 registers (respond to even addresses in $8000-$FFFF)
    writeMmc3Reg(addr, value, mmc3);
  };

  return { read, write, ram, prg, chr, ppu, mmc3, resolvePrgAddr };
}

/** Read from MMC3-mapped PRG ROM */
function readPrgRom(
  addr: number,
  prg: Uint8Array,
  mmc3: Mmc3Regs,
  lastBank: number,
  secondLastBank: number,
): number {
  const bankNum = (addr - 0x8000) >> 13; // 0,1,2,3
  let prgBank: number;

  if (bankNum < 2) {
    // $8000-$9FFF or $A000-$BFFF (switchable)
    const regIdx = mmc3.prgBankMode === 0 ? 6 + bankNum : 6 + (1 - bankNum);
    prgBank = mmc3.bankData[regIdx];
  } else if (bankNum === 2) {
    // $C000-$DFFF (fixed to second-last)
    prgBank = secondLastBank;
  } else {
    // $E000-$FFFF (fixed to last)
    prgBank = lastBank;
  }

  const offset = prgBank * MMC3_PRG_BANK_SIZE + (addr & 0x1FFF);
  if (offset >= prg.length) return 0xFF;
  return prg[offset];
}

/** Read from PPU register */
function readPpuReg(reg: number, ppu: PpuState): number {
  switch (reg) {
    case 0x0002: { // PPU STATUS ($2002)
      // VBlank flag, sprite 0 hit, sprite overflow
      return ppu.status;
    }
    case 0x0007: { // PPU DATA ($2007)
      const val = ppu.vram[ppu.v & 0x07FF];
      // Auto-increment VRAM address
      const inc = (ppu.ctrl & 0x04) ? 32 : 1;
      ppu.v = (ppu.v + inc) & 0x7FFF;
      return val;
    }
    default:
      return 0x00;
  }
}

/** Write to PPU register */
function writePpuReg(reg: number, value: number, ppu: PpuState): void {
  switch (reg) {
    case 0x0000: // PPU CTRL ($2000)
      ppu.ctrl = value;
      // Update nametable bits in temp VRAM address
      ppu.t = (ppu.t & 0xF3FF) | ((value & 0x03) << 10);
      break;
    case 0x0001: // PPU MASK ($2001)
      ppu.mask = value;
      break;
    case 0x0003: // OAM ADDR ($2003)
      ppu.oamAddr = value;
      break;
    case 0x0004: // OAM DATA ($2004)
      ppu.oam[ppu.oamAddr] = value;
      ppu.oamAddr = (ppu.oamAddr + 1) & 0xFF;
      break;
    case 0x0005: // PPU SCROLL ($2005)
      if (ppu.w === 0) {
        // First write: X scroll
        ppu.x = value & 0x07; // Fine X
        ppu.t = (ppu.t & 0xFFE0) | ((value >> 3) & 0x1F); // Coarse X
        ppu.w = 1;
      } else {
        // Second write: Y scroll
        ppu.t = (ppu.t & 0x8C1F) | ((value & 0x07) << 12) | ((value & 0xF8) << 2);
        ppu.w = 0;
      }
      break;
    case 0x0006: // PPU ADDR ($2006)
      if (ppu.w === 0) {
        // First write: high byte
        ppu.t = (ppu.t & 0x00FF) | ((value & 0x3F) << 8);
        ppu.w = 1;
      } else {
        // Second write: low byte
        ppu.t = (ppu.t & 0xFF00) | value;
        ppu.v = ppu.t;
        ppu.w = 0;
      }
      break;
    case 0x0007: // PPU DATA ($2007)
      ppu.vram[ppu.v & 0x07FF] = value;
      const inc = (ppu.ctrl & 0x04) ? 32 : 1;
      ppu.v = (ppu.v + inc) & 0x7FFF;
      break;
  }
}

/** Write to MMC3 registers (responds to even addresses) */
function writeMmc3Reg(addr: number, value: number, mmc3: Mmc3Regs): void {
  // MMC3 only responds to even addresses in $8000-$FFFF
  if (addr & 0x01) return;

  switch (addr & 0xE001) {
    case MMC3_BANK_SELECT: // $8000
      mmc3.bankSelect = value & 0x07;
      mmc3.prgBankMode = (value >> 6) & 0x01;
      mmc3.chrBankMode = (value >> 7) & 0x01;
      break;
    case MMC3_BANK_DATA: { // $8001
      const idx = mmc3.bankSelect;
      mmc3.bankData[idx] = value;
      break;
    }
    case MMC3_MIRRORING: // $A000
      mmc3.mirroring = value & 0x01;
      break;
    case MMC3_PRG_PROTECT: // $A001
      mmc3.prgRamProtect = (value & 0x80) !== 0;
      break;
    case MMC3_IRQ_LATCH: // $C000
      mmc3.irqLatch = value;
      break;
    case MMC3_IRQ_RELOAD: // $C001
      mmc3.irqCounter = 0;
      mmc3.irqReload = true;
      break;
    case MMC3_IRQ_DISABLE: // $E000
      mmc3.irqEnable = false;
      break;
    case MMC3_IRQ_ENABLE: // $E001
      mmc3.irqEnable = true;
      break;
  }
}
