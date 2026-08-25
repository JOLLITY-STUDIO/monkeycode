/**
 * _emu_ref13.ts — 用 TS NES 模拟器（src/core/nes.ts）跑原始 ROM 到 frame 13，
 * 在 frame 1/5/9/13 dump 状态 JSON，用于与 H5 端 output/ppu-trace/frame-00X 对比。
 * 输出：debug/_emu_ref13.json
 */
import * as fs from 'fs';
import * as path from 'path';
import { NES } from '../src/core';

const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT = path.join(__dirname, '_emu_ref13.json');

const romBytes = fs.readFileSync(ROM_PATH);
const nes = new NES({ emulateSound: false });
nes.loadROM(romBytes);
const ppu: any = (nes as any).ppu;
const mmap: any = (nes as any).mmap;

function ptNonEmptyCount(): number {
  let n = 0;
  for (let i = 0; i < 512; i++) {
    const t = ppu.ptTile[i];
    if (t && t.pix) { for (const p of t.pix) { if (p !== 0) { n++; break; } } }
  }
  return n;
}

function ntStats(idx: number): { nz: number; unique: number[] } {
  const nt = ppu.nameTable[idx];
  const nz: number[] = [];
  const uniq = new Set<number>();
  for (const t of nt.tile) {
    if (t !== 0) nz.push(t);
    uniq.add(t);
  }
  return { nz: nz.length, unique: [...uniq].slice(0, 16) };
}

function bufNonZero(): number {
  let n = 0;
  for (const v of ppu.buffer) if (v !== 0) n++;
  return n;
}

function oamVisible(): any[] {
  const arr = Array.from(ppu.spriteMem);
  const out: any[] = [];
  for (let i = 0; i < 64; i++) {
    const y = arr[i * 4 + 0];
    if (y < 0xef) out.push({ idx: i, y, tile: arr[i * 4 + 1], attr: arr[i * 4 + 2], x: arr[i * 4 + 3] });
  }
  return out;
}

const FRAMES = [1, 5, 9, 13];
const results: any[] = [];
let total = 0;
for (const target of FRAMES) {
  while (total < target) { nes.frame(); total++; }
  const palBg = Array.from(ppu.vramMem.slice(0x3f00, 0x3f10));
  const palSp = Array.from(ppu.vramMem.slice(0x3f10, 0x3f20));
  results.push({
    frame: total,
    pc: (nes as any).cpu && ((nes as any).cpu.REG_PC != null ? (nes as any).cpu.REG_PC : (nes as any).cpu.pc),
    bufNonZero: bufNonZero(),
    nt0: ntStats(0),
    nt1: ntStats(1),
    nt2: ntStats(2),
    nt3: ntStats(3),
    paletteBg: palBg,
    paletteSp: palSp,
    oamVisible: oamVisible(),
    ptNonEmpty: ptNonEmptyCount(),
    chrBanks: mmap.chrBanks ? Array.from(mmap.chrBanks) : [],
    prgBankMap: mmap.prgBankMap || {},
    reg2000: ppu.reg2000, reg2001: ppu.reg2001,
    nTblAddress: ppu.f_nTblAddress,
    bgTable: ppu.f_bgPatternTable,
    spTable: ppu.f_spPatternTable,
  });
}

fs.writeFileSync(OUT, JSON.stringify(results, null, 1));
console.log('done ->', OUT);
