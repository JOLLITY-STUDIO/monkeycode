/**
 * _scene_trace.ts — 用真实 6502 模拟器跑 ROM，逐帧抓取场景流转 ground truth。
 * 输出：debug/_scene_trace.log（场景变化/脚本指针/关键 RAM，边跑边写）
 */
import * as fs from 'fs';
import * as path from 'path';
import { NES } from '../src/core';

const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const OUT = path.join(__dirname, '_scene_trace.log');

fs.writeFileSync(OUT, '');
const log = (s: string) => fs.appendFileSync(OUT, s + '\n');

const romBytes = fs.readFileSync(ROM_PATH);
const nes = new NES({ emulateSound: false });
nes.loadROM(romBytes);
const cpu: any = (nes as any).cpu;
const mem = () => cpu.mem;

let lastScene = -1;
let lastPtr = -1;
let last26 = -1;
let last57 = -1;
const MAX = 15000;

for (let f = 1; f <= MAX; f++) {
  nes.frame();
  const m = mem();
  const ed = m[0xed];
  const ec = m[0xec];
  const p57 = m[0x57];
  const p26 = m[0x26];
  const ptr = (m[0x4d] | (m[0x4e] << 8));
  if (ed !== lastScene || ptr !== lastPtr || p26 !== last26 || p57 !== last57) {
    log(
      `f=${f} ed=0x${ed.toString(16).toUpperCase()} ec=0x${ec.toString(16).toUpperCase()} ` +
      `57=0x${p57.toString(16).toUpperCase()} 26=0x${p26.toString(16).toUpperCase()} ` +
      `ptr(4D)=0x${ptr.toString(16).toUpperCase()}`
    );
    lastScene = ed;
    lastPtr = ptr;
    last26 = p26;
    last57 = p57;
  }
}
log('DONE');
console.log('done');
