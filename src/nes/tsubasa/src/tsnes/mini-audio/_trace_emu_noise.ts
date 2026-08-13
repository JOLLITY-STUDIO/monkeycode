// 快速 emu trace：追踪 boot 期间与 0x58 (开场BGM) 注入后所有 $400C-$400F 写入，定位 $400F=0x98 来源
import * as fs from 'fs';
import * as path from 'path';
import NES from '../src/nes';
import { NES_PRG_ROM, NES_CHR_ROM } from './rom-data/index-full';

const SAMPLE_RATE = 48000;
const EMU_BOOT_FRAMES = 150;
const POST_FRAMES = 60;

const INES_HEADER = new Uint8Array([
  0x4E, 0x45, 0x53, 0x1A, 0x10, 0x10, 0x40, 0x08,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01,
]);

function main() {
  const prg = new Uint8Array(NES_PRG_ROM);
  const chr = new Uint8Array(NES_CHR_ROM);
  const rom = new Uint8Array(INES_HEADER.length + prg.length + chr.length);
  rom.set(INES_HEADER, 0);
  rom.set(prg, INES_HEADER.length);
  rom.set(chr, INES_HEADER.length + prg.length);

  const nes = new NES({ emulateSound: true, sampleRate: SAMPLE_RATE });
  nes.loadROM(rom);

  const papu = nes.papu;
  const origWr = papu.writeReg.bind(papu);
  const writes: Array<{ f: number; addr: number; val: number }> = [];
  papu.writeReg = function (addr: number, val: number) {
    if (addr >= 0x400C && addr <= 0x400F) writes.push({ f: frame, addr, val });
    return origWr(addr, val);
  };

  let frame = 0;
  console.log('[emu] boot ' + EMU_BOOT_FRAMES + ' frames...');
  for (let f = 0; f < EMU_BOOT_FRAMES; f++) {
    frame = f;
    nes.frame();
  }
  console.log('[emu] boot done, ' + writes.length + ' noise writes during boot');

  // 注入 0x58 (开场BGM) 请求
  nes.cpu.mem[0x0700 + 0] = 0x58;
  for (let f = 0; f < POST_FRAMES; f++) {
    frame = EMU_BOOT_FRAMES + f;
    nes.frame();
  }
  console.log('[emu] post-inject done, total noise writes: ' + writes.length);

  // 分析
  const fWrites = writes.filter((w) => w.addr === 0x400F);
  const eWrites = writes.filter((w) => w.addr === 0x400E);
  const cWrites = writes.filter((w) => w.addr === 0x400C);

  console.log('\n=== $400F writes (' + fWrites.length + ') ===');
  fWrites.slice(0, 60).forEach((w) => console.log('  F' + w.f + ': 0x' + w.val.toString(16).padStart(2, '0')));
  if (fWrites.length > 60) console.log('  ... +' + (fWrites.length - 60) + ' more');
  const fVals = [...new Set(fWrites.map((w) => w.val))];
  console.log('  distinct $400F values: ' + fVals.map((v) => '0x' + v.toString(16)).join(', '));

  console.log('\n=== $400E writes (' + eWrites.length + ', first 40) ===');
  eWrites.slice(0, 40).forEach((w) => console.log('  F' + w.f + ': 0x' + w.val.toString(16).padStart(2, '0')));

  console.log('\n=== $400C writes (' + cWrites.length + ', first 40) ===');
  cWrites.slice(0, 40).forEach((w) => console.log('  F' + w.f + ': 0x' + w.val.toString(16).padStart(2, '0')));

  // 每帧状态序列（用于对齐）: F365 附近鼓点
  const byFrame: Record<number, Record<number, number>> = {};
  for (const w of writes) {
    if (!byFrame[w.f]) byFrame[w.f] = {};
    byFrame[w.f][w.addr] = w.val;
  }
  console.log('\n=== per-frame noise state F350-F400 ===');
  for (let f = 350; f <= 400 && f < EMU_BOOT_FRAMES + POST_FRAMES; f++) {
    const v = byFrame[f] || {};
    const c = v[0x400c] !== undefined ? '0x' + v[0x400c].toString(16).padStart(2, '0') : '--';
    const e = v[0x400e] !== undefined ? '0x' + v[0x400e].toString(16).padStart(2, '0') : '--';
    const l = v[0x400f] !== undefined ? '0x' + v[0x400f].toString(16).padStart(2, '0') : '--';
    console.log('F' + f + ': C=' + c + ' E=' + e + ' F=' + l);
  }
}

main();
