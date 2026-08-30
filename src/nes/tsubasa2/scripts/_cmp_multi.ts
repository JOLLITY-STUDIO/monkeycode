/**
 * _cmp_multi.ts — 多帧 H5 vs emu 像素对比基线
 * 用法: node _build_cmp.cjs _cmp_multi.ts <f1> <f2> ...
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const ROOT = path.resolve(__dirname, '..');

function decodePng(file: string): Buffer {
  const data = fs.readFileSync(file);
  const ihdr = data.indexOf('IHDR');
  const w = data.readUInt32BE(ihdr + 4);
  const h = data.readUInt32BE(ihdr + 8);
  const ct = data[ihdr + 13];
  let idat = Buffer.alloc(0);
  let pos = 8;
  while (pos + 8 <= data.length) {
    const len = data.readUInt32BE(pos);
    const type = data.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') idat = Buffer.concat([idat, data.slice(pos + 8, pos + 8 + len)]);
    pos += 12 + len;
    if (type === 'IEND') break;
  }
  const raw = zlib.inflateSync(idat);
  const bpp = ct === 6 ? 4 : ct === 2 ? 3 : 1;
  const stride = w * bpp;
  const rgba = Buffer.alloc(w * h * 4);
  const prev = Buffer.alloc(stride);
  const cur = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)];
    raw.copy(cur, 0, y * (stride + 1) + 1, (y + 1) * (stride + 1));
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev[x];
      const c = x >= bpp ? prev[x - bpp] : 0;
      let v = cur[x];
      if (f === 1) v = (v + a) & 0xff;
      else if (f === 2) v = (v + b) & 0xff;
      else if (f === 3) v = (v + ((a + b) >> 1)) & 0xff;
      else if (f === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
        v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
      }
      cur[x] = v;
      const px = x % bpp;
      if (ct === 6) {
        if (px === 0) rgba[(y * w + ((x / 4) | 0)) * 4] = cur[x];
        else if (px === 1) rgba[(y * w + ((x / 4) | 0)) * 4 + 1] = cur[x];
        else if (px === 2) rgba[(y * w + ((x / 4) | 0)) * 4 + 2] = cur[x];
      } else if (ct === 2) {
        if (px === 0) rgba[(y * w + ((x / 3) | 0)) * 4] = cur[x];
        else if (px === 1) rgba[(y * w + ((x / 3) | 0)) * 4 + 1] = cur[x];
        else if (px === 2) rgba[(y * w + ((x / 3) | 0)) * 4 + 2] = cur[x];
      }
    }
  }
  return rgba;
}

const frames = process.argv.slice(2).map((s) => parseInt(s, 10)).filter((n) => !isNaN(n)).sort((a, b) => a - b);
if (frames.length === 0) frames.push(450);

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;

let lastNes = 0;
for (const nes of frames) {
  const target = nes - 10; // H5 frame k = NES f(k+10)
  for (; lastNes < target; lastNes++) runtime.frame(game);

  const h5 = Buffer.alloc(256 * 240 * 4);
  for (let i = 0; i < 256 * 240; i++) {
    const v = ppu.buffer[i] >>> 0;
    h5[i * 4] = (v >>> 16) & 0xff;
    h5[i * 4 + 1] = (v >>> 8) & 0xff;
    h5[i * 4 + 2] = v & 0xff;
    h5[i * 4 + 3] = 0xff;
  }
  const emu = decodePng(path.join(ROOT, 'output/emu-full/frame-' + String(nes).padStart(4, '0') + '/screen.png'));

  let totalDiff = 0;
  const rows: Array<{ y: number; cnt: number }> = [];
  for (let y = 0; y < 240; y++) {
    let cnt = 0;
    for (let x = 0; x < 256; x++) {
      const i = (y * 256 + x) * 4;
      const d = Math.abs(h5[i] - emu[i]) + Math.abs(h5[i + 1] - emu[i + 1]) + Math.abs(h5[i + 2] - emu[i + 2]);
      if (d > 0) cnt++;
    }
    if (cnt > 0) { totalDiff += cnt; rows.push({ y, cnt }); }
  }
  // 分组连续行
  const groups: Array<{ y0: number; y1: number; cnt: number }> = [];
  for (const r of rows) {
    const last = groups[groups.length - 1];
    if (last && r.y === last.y1 + 1) { last.y1 = r.y; last.cnt += r.cnt; }
    else groups.push({ y0: r.y, y1: r.y, cnt: r.cnt });
  }
  console.log(`[f${nes}] totalDiff=${totalDiff} px, diff-rows=${rows.length}, groups=${groups.length}`);
  for (const g of groups) console.log(`   rows ${g.y0}-${g.y1} cnt=${g.cnt}`);
  lastNes = target;
}
