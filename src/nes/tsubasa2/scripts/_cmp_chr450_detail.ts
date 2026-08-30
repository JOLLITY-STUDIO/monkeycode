/**
 * _cmp_chr450_detail.ts — 详细比较 H5 与 emu f450 的 CHR tile 像素
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

const ptArr: any[] = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/frame-0450/pt.json'), 'utf8'));

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

let matchTiles: number[] = [];
let diffTiles = 0;
for (const t of ptArr) {
  const idx = t.idx;
  if (idx >= ppu.ptTile.length) continue;
  const h5 = ppu.ptTile[idx];
  if (!h5) continue;
  const emu = decodeEmuTile(t);
  let d = false;
  for (let i = 0; i < 8; i++) if (h5.opaque[i] !== emu.opaque[i]) d = true;
  for (let i = 0; i < 64; i++) if (h5.pix[i] !== emu.pix[i]) d = true;
  if (d) diffTiles++; else matchTiles.push(idx);
}
console.log(`match=${matchTiles.length} diff=${diffTiles}`);
console.log('matching tiles:', matchTiles.slice(0, 30).join(','));
console.log('slot distribution: 0-63:', matchTiles.filter(x=>x<64).length, '64-127:', matchTiles.filter(x=>x>=64&&x<128).length, '128-191:', matchTiles.filter(x=>x>=128&&x<192).length, '192-255:', matchTiles.filter(x=>x>=192&&x<256).length, '256-319:', matchTiles.filter(x=>x>=256&&x<320).length, '320+:', matchTiles.filter(x=>x>=320).length);

// 挑几个匹配 tile 看内容
for (const idx of matchTiles.slice(0, 3)) {
  const h5 = ppu.ptTile[idx];
  const emuT = ptArr.find((x: any) => x.idx === idx);
  const emu = decodeEmuTile(emuT);
  console.log(`tile ${idx} H5 pix=[${Array.from(h5.pix).join(',')}] EMU=[${Array.from(emu.pix).join(',')}]`);
}
