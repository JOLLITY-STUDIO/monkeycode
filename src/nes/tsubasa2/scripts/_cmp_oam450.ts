/**
 * _cmp_oam450.ts — 对比 H5 f450 shadowOam vs emu oam.json
 */
import * as fs from 'fs';
import * as path from 'path';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const ROOT = path.resolve(__dirname, '..');

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;
for (let k = 1; k <= 440; k++) runtime.frame(game);

const emu = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/frame-0450/oam.json'), 'utf8'));
console.log('emu oam keys:', Object.keys(emu).slice(0, 5), '... total', Object.keys(emu).length);
// 猜测结构: 可能是 {0:[y,x,tile,attr],...} 或数组
const arr = Array.isArray(emu) ? emu : Object.values(emu);
console.log('oam entries:', arr.length);
const h5 = game.store.oam.shadowOam;
const h5spr: Array<[number, number, number, number]> = [];
for (let i = 0; i < 64; i++) {
  const b = i * 4;
  const y = h5[b + 0], x = h5[b + 3], t = h5[b + 1], a = h5[b + 2];
  if (y !== 0xf8 || x !== 0 || t !== 0 || a !== 0) h5spr.push([y, x, t, a]);
}
console.log('H5 sprites:', h5spr.length);
for (const s of h5spr.slice(0, 80)) console.log('  H5', JSON.stringify(s));
console.log('emu sprites:');
for (const e of (Array.isArray(emu) ? emu : Object.values(emu)).slice(0, 80)) {
  console.log('  EMU', JSON.stringify(e));
}
