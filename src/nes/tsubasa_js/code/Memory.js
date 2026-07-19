/**
 * MMC3 Memory Map - 管理 PRG/CHR bank 切换和 NES 地址空间
 */
import {
  RAM_SIZE, VRAM_SIZE, OAM_SIZE,
  MMC3_PRG_BANK_SIZE,
  MMC3_BANK_SELECT, MMC3_BANK_DATA,
  MMC3_MIRRORING, MMC3_PRG_PROTECT,
  MMC3_IRQ_LATCH, MMC3_IRQ_RELOAD,
  MMC3_IRQ_DISABLE, MMC3_IRQ_ENABLE,
} from '../types.js';

/*
 * NesMemory 对象结构:
 *   read(addr)     - 读 CPU 地址空间
 *   write(addr, v) - 写 CPU 地址空间
 *   ram            - 原始 RAM Uint8Array
 *   prg            - 原始 PRG ROM
 *   chr            - 原始 CHR ROM
 *   ppu            - PPU 状态
 *   mmc3           - MMC3 状态
 *   resolvePrgAddr - 解析 PRG 地址
 */

export function createMemory(rom, ppu, mmc3) {
  const ram = new Uint8Array(RAM_SIZE);
  const prg = rom.prg;
  const chr = rom.chr;

  // Number of 8KB PRG banks
  const numPrgBanks = prg.length >>> 13; // / 8192
  const lastBank = numPrgBanks - 1;
  const secondLastBank = numPrgBanks - 2;

  const resolvePrgAddr = (bank, pc) => {
    return bank * MMC3_PRG_BANK_SIZE + (pc & 0x1FFF);
  };

  const read = (addr) => {
    if (addr < 0x2000) {
      return ram[addr & 0x07FF];
    }
    if (addr < 0x4000) {
      return readPpuReg(addr & 0x2007, ppu);
    }
    if (addr < 0x6000) {
      return 0x00;
    }
    if (addr < 0x8000) {
      return 0x00;
    }
    return readPrgRom(addr, prg, mmc3, lastBank, secondLastBank);
  };

  const write = (addr, value) => {
    if (addr < 0x2000) {
      ram[addr & 0x07FF] = value;
      return;
    }
    if (addr < 0x4000) {
      writePpuReg(addr & 0x2007, value, ppu);
      return;
    }
    if (addr < 0x6000) {
      return;
    }
    if (addr < 0x8000) {
      return;
    }
    writeMmc3Reg(addr, value, mmc3);
  };

  return { read, write, ram, prg, chr, ppu, mmc3, resolvePrgAddr };
}

function readPrgRom(addr, prg, mmc3, lastBank, secondLastBank) {
  const bankNum = (addr - 0x8000) >> 13; // 0,1,2,3
  let prgBank;

  if (bankNum < 2) {
    const regIdx = mmc3.prgBankMode === 0 ? 6 + bankNum : 6 + (1 - bankNum);
    prgBank = mmc3.bankData[regIdx];
  } else if (bankNum === 2) {
    prgBank = secondLastBank;
  } else {
    prgBank = lastBank;
  }

  const offset = prgBank * MMC3_PRG_BANK_SIZE + (addr & 0x1FFF);
  if (offset >= prg.length) return 0xFF;
  return prg[offset];
}

function readPpuReg(reg, ppu) {
  switch (reg) {
    case 0x0002: { // PPU STATUS ($2002)
      return ppu.status;
    }
    case 0x0007: { // PPU DATA ($2007)
      const val = ppu.vram[ppu.v & 0x07FF];
      const inc = (ppu.ctrl & 0x04) ? 32 : 1;
      ppu.v = (ppu.v + inc) & 0x7FFF;
      return val;
    }
    default:
      return 0x00;
  }
}

function writePpuReg(reg, value, ppu) {
  switch (reg) {
    case 0x0000: // PPU CTRL ($2000)
      ppu.ctrl = value;
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
        ppu.x = value & 0x07;
        ppu.t = (ppu.t & 0xFFE0) | ((value >> 3) & 0x1F);
        ppu.w = 1;
      } else {
        ppu.t = (ppu.t & 0x8C1F) | ((value & 0x07) << 12) | ((value & 0xF8) << 2);
        ppu.w = 0;
      }
      break;
    case 0x0006: // PPU ADDR ($2006)
      if (ppu.w === 0) {
        ppu.t = (ppu.t & 0x00FF) | ((value & 0x3F) << 8);
        ppu.w = 1;
      } else {
        ppu.t = (ppu.t & 0xFF00) | value;
        ppu.v = ppu.t;
        ppu.w = 0;
      }
      break;
    case 0x0007: // PPU DATA ($2007)
      ppu.vram[ppu.v & 0x07FF] = value;
      { const inc = (ppu.ctrl & 0x04) ? 32 : 1;
        ppu.v = (ppu.v + inc) & 0x7FFF; }
      break;
  }
}

function writeMmc3Reg(addr, value, mmc3) {
  if (addr & 0x01) return;

  switch (addr & 0xE001) {
    case MMC3_BANK_SELECT: // $8000
      mmc3.bankSelect = value & 0x07;
      mmc3.prgBankMode = (value >> 6) & 0x01;
      mmc3.chrBankMode = (value >> 7) & 0x01;
      break;
    case MMC3_BANK_DATA: {
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
