/**
 * _cmp_chr450.ts — 比较 H5 与 emu f450 的 CHR tile 像素
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

// emu pt.json: [{idx, plane0[8], plane1[8]}]
const ptArr: any[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/frame-0450/pt.json'), 'utf8'));

// Build map idx -> {opaque[8], pix[64]}
function decodeEmuTile(t: any) {
  const pix = new Uint8Array(64);
  const opaque = new Uint8Array(8);
  for (let y = 0; y < 8; y++) {
    const lo = t.plane0[y];
    const hi = t.plane1[y];
    let op = 0;
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const c = ((lo >> bit) & 1) | (((hi >> bit) & 1) << 1);
      pix[y * 8 + x] = c;
      if (c) op |= (1 << (7 - x));
    }
    opaque[y] = op;
  }
  return { opaque, pix };
}

let diffTiles = 0;
let total = 0;
for (const t of ptArr) {
  const idx = t.idx;
  if (idx >= ppu.ptTile.length) continue;
  const h5 = ppu.ptTile[idx];
  if (!h5) continue;
  const emu = decodeEmuTile(t);
  let d = false;
  for (let i = 0; i < 8; i++) if (h5.opaque[i] !== emu.opaque[i]) d = true;
  for (let i = 0; i < 64; i++) if (h5.pix[i] !== emu.pix[i]) d = true;
  if (d) {
    diffTiles++;
    if (diffTiles <= 10) console.log(`tile ${idx} differs`);
  }
  total++;
}
console.log(`chr diff tiles=${diffTiles}/${total}`);
