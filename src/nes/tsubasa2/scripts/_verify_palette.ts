/**
 * _verify_palette.ts — 验证 H5 Scene0 满亮帧调色板与 emu f3731 一致
 * 期望: BG=[15,22,0,48,15,15,15,15,15,17,0,48,15,15,22,38] (OPENING_BG_PALETTES[1])
 *       SPR=[15,39,55,48,15,6,22,38,15,23,38,39,15,15,48,55] (OPENING_SPR_PALETTES[9])
 */
import * as fs from 'fs';
import * as path from 'path';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const store = game.store;
const ppu: any = runtime.ppu;

const FRAMES = [15, 30, 46, 94, 95, 99, 100, 101, 102, 154, 455, 470, 472, 473];
const out: any[] = [];
for (let f = 0; f < 474; f++) {
  game.frame(runtime);
  if (FRAMES.includes(f)) {
    const bg: number[] = [];
    const spr: number[] = [];
    for (let i = 0; i < 16; i++) {
      bg.push(ppu.vramMem[0x3f00 + i] & 0x3f);
      spr.push(ppu.vramMem[0x3f10 + i] & 0x3f);
    }
    out.push({ frame: f, scene: store.readByte(0x00ed), bg, spr });
  }
}
fs.writeFileSync(path.join(__dirname, '..', 'output', 'scene0-h5-palette.json'), JSON.stringify(out, null, 2));
for (const e of out) {
  console.log(`f${String(e.frame).padStart(3)} scene=${e.scene}`);
  console.log(`  BG =[${e.bg.join(',')}]`);
  console.log(`  SPR=[${e.spr.join(',')}]`);
}
