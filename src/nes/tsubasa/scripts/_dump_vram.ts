/**
 * 临时脚本: dump PPU VRAM nametable 查看屏幕文字来源
 * 用法: npx tsx scripts/_dump_vram.ts
 */
import fs from 'node:fs';
import { GameContext } from '../src/disasm/_context';
import { allBanks } from '../src/disasm/banks/index';
import type { RomReader, BankRomSlice } from '../src/disasm/banks/_bank_types';
import { _cfg } from '../src/disasm/banks/bank_00_dispatch';
_cfg.verbose = false;

// ROM data (same as _trace_opening_disasm)
import { ROM as _r00 } from '../src/disasm/banks/_romdata/bank_00_data';
import { ROM as _r01 } from '../src/disasm/banks/_romdata/bank_01_data';
import { ROM as _r02 } from '../src/disasm/banks/_romdata/bank_02_data';
import { ROM as _r03 } from '../src/disasm/banks/_romdata/bank_03_data';
// ... enough banks for init
const ROM_DATA: Array<Uint8Array | undefined> = [
  _r00,_r01,_r02,_r03,
];

const PRG_BANK_SIZE = 0x2000;

let bank8000 = 0;
let bankA000 = 1;

function bankSlice(n: number): BankRomSlice {
  const d = new Uint8Array(PRG_BANK_SIZE);
  for (let i = 0; i < PRG_BANK_SIZE; i++) d[i] = ROM_DATA[n]?.[i] ?? 0;
  return {
    u8(o: number) { return d[o] ?? 0; },
    u16le(o: number) { return (this.u8(o)) | (this.u8(o + 1) << 8); },
    data: d,
    romBase: n * PRG_BANK_SIZE,
  };
}

const rom: RomReader = {
  bank(a: number) {
    const ca = a & 0xFFFF;
    let bn: number;
    if (ca >= 0xA000) bn = bankA000;
    else bn = bank8000;
    return bankSlice(bn);
  },
  u8(a: number) { return this.bank(a).u8(a & 0x1FFF); },
  u16le(a: number) { return this.bank(a).u16le(a & 0x1FFF); },
};

// ── PPU VRAM interceptor ──
let ppuVram: number[] = [];
function capturePpuWrites(ctx: GameContext): void {
  const orig = ctx.ram.setU8.bind(ctx.ram);
  ctx.ram.setU8 = (a: number, v: number) => {
    if (a === 0x8001) {
      const sel = ctx.ram.u8(0x8000) & 0x07;
      if (sel === 6) bank8000 = v;
      if (sel === 7) bankA000 = v;
    }
    // Capture PPU writes: $2006 (set addr) → $2007 (write data)
    if (a === 0x2007) {
      // Try to figure out what the current PPU address was set to
      // Simpler: just log the write with the address ctx.ram.u8(0x2006) mirror
      ppuVram.push(v);
    }
    orig(a, v);
  };
}

const h8  = (v: number) => '$' + (v & 0xFF).toString(16).padStart(2, '0');

// ── MAIN ──
console.log('=== VRAM DUMP ===');
const ctx = new GameContext();
ctx.ram.setU8(0x24, 0);
ctx.ram.setU8(0x25, 1);
capturePpuWrites(ctx);

// BOOT
allBanks[31]?.fns?.['$FFF0']?.(ctx, rom);

// Run 16 frames (enough to reach scene $0F0F)
for (let f = 0; f < 16; f++) {
  bank8000 = ctx.ram.u8(0x24);
  bankA000 = ctx.ram.u8(0x25);
  
  if (bank8000 === 0) {
    ppuVram = [];
    const ntAddrStart = 0; // reset tracking
    
    if (f === 0) {
      const loopEntry = allBanks[0]?.fns?.['$8017'];
      if (loopEntry) loopEntry(ctx, rom);
    } else {
      allBanks[0]?.dispatch(ctx, rom);
    }
    
    if (f >= 1 && ppuVram.length > 0 && ppuVram.length < 2000) {
      console.log(`\nF${f}: PPU VRAM writes (${ppuVram.length} bytes):`);
      // Show only non-zero
      const nz = ppuVram.filter(v => v !== 0);
      console.log(`  non-zero: ${nz.length}`);
      if (nz.length > 0 && nz.length < 100) {
        console.log(`  values: [${nz.map(v => h8(v)).join(' ')}]`);
      }
    }
  }
  
  if (f % 4 === 3) {
    console.log(`F${f}: $26=${h8(ctx.ram.u8(0x26))} $27=${h8(ctx.ram.u8(0x27))} $4A=${h8(ctx.ram.u8(0x4A))} $4B=${h8(ctx.ram.u8(0x4B))} $4C=${h8(ctx.ram.u8(0x4C))}`);
  }
}

// Dump final palette
console.log(`\nFinal palette $062A[0..31]:`);
const pal = [];
for (let i = 0; i < 32; i++) pal.push(ctx.ram.u8(0x062A + i));
console.log(`  [${pal.map(v => h8(v)).join(' ')}]`);

// Dump PPU relevant state
console.log(`\n$4A=${h8(ctx.ram.u8(0x4A))} $4B=${h8(ctx.ram.u8(0x4B))} $26=${h8(ctx.ram.u8(0x26))}`);
console.log(`COUT_HIST chars written to nametable:`);

// Dump nametable via direct PPU reads
// Re-run with PPU capture to get actual nametable content
console.log('\n=== Done ===');
