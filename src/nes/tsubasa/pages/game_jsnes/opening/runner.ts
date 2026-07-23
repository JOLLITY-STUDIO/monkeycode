// opening/runner.ts — main exec loop
// Replaces CPU.emulate(): calls TS functions by PC lookup table
// PPU/APU are from tsnes (unchanged)

// @ts-nocheck
import * as S from './state';
import { instrTable, initTable } from './instr_table';

export const ENTRY_PC = 0x7fff;

let ppu: any = null;
let frameDone = false;

export function init(p: any): void {
  ppu = p;
  initTable();
  
  // Wire PPU I/O
  S.ppuRead = (addr: number): number => {
    // PPU registers $2000-$2007
    switch (addr) {
      case 0x2002: return ppu.readStatus();
      case 0x2007: return ppu.readData();
      default: return 0;
    }
  };
  
  S.ppuWrite = (addr: number, val: number): void => {
    switch (addr) {
      case 0x2000: ppu.writeCtrl(val); break;
      case 0x2001: ppu.writeMask(val); break;
      case 0x2003: ppu.writeOAMAddr(val); break;
      case 0x2004: ppu.writeOAMData(val); break;
      case 0x2005: ppu.writeScroll(val); break;
      case 0x2006: ppu.writeAddr(val); break;
      case 0x2007: ppu.writeData(val); break;
      case 0x4014: ppu.writeDMA(val, S.mem); break;
      default: break;
    }
  };
}

// Run until VBlank (one frame)
export function runFrame(): void {
  frameDone = false;
  S.PC = ENTRY_PC;
  
  let safety = 0;
  const MAX = 50_000; // safety limit
  
  while (!frameDone && safety < MAX) {
    const fn = instrTable[S.PC];
    if (fn) {
      fn();
    } else {
      // Unknown instruction — skip (should not happen)
      S.PC = (S.PC + 1) & 0xFFFF;
    }
    safety++;
  }
  
  if (safety >= MAX) {
    console.warn('runner: frame exceeded safety limit');
  }
}

// Called by NMI handler (conceptually)
export function onVBlank(): void {
  frameDone = true;
}
