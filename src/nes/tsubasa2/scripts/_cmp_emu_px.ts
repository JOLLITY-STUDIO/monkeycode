/**
 * _cmp_emu_px.ts — H5 Opening 渲染 vs emu-full ground-truth screen.png 像素对比
 *
 * 对比 H5 buffer(256x240) 与 emu output/emu-full/frame-NNNN/screen.png:
 *   - 总 diff 像素数 + diff 行分布(每 8 行一个桶)
 *   - 内容行范围(非背景色行 minY..maxY) → 检查"少 px"是否 = 垂直偏移
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const ROOT = path.resolve(__dirname, '..');

function decodePng(file: string): { w: number; h: number; rgba: Buffer } {
  const data = fs.readFileSync(file);
  const ihdr = data.indexOf('IHDR');
  const w = data.readUInt32BE(ihdr + 4);
  const h = data.readUInt32BE(ihdr + 8);
  const bit = data[ihdr + 12];
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
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
      }
      cur[x] = v;
    }
    for (let x = 0; x < stride; x++) {
      prev[x] = cur[x];
      const px = x % bpp;
      if (ct === 6) {
        if (px === 0) { rgba[(y * w + (x / 4 | 0)) * 4] = cur[x]; }
        else if (px === 1) { rgba[(y * w + (x / 4 | 0)) * 4 + 1] = cur[x]; }
        else if (px === 2) { rgba[(y * w + (x / 4 | 0)) * 4 + 2] = cur[x]; }
      } else if (ct === 2) {
        if (px === 0) { rgba[(y * w + (x / 3 | 0)) * 4] = cur[x]; }
        else if (px === 1) { rgba[(y * w + (x / 3 | 0)) * 4 + 1] = cur[x]; }
        else if (px === 2) { rgba[(y * w + (x / 3 | 0)) * 4 + 2] = cur[x]; }
      }
    }
  }
  return { w, h, rgba };
}

function h5ToRgba(buf: Uint32Array): Buffer {
  const rgba = Buffer.alloc(256 * 240 * 4);
  for (let i = 0; i < 256 * 240; i++) {
    const v = buf[i] >>> 0;
    rgba[i * 4] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  return rgba;
}

function contentRows(rgba: Buffer, w: number, h: number): { minY: number; maxY: number } {
  let minY = -1;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    let nz = false;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (rgba[i] !== 0 || rgba[i + 1] !== 0 || rgba[i + 2] !== 0) { nz = true; break; }
    }
    if (nz) { if (minY < 0) minY = y; maxY = y; }
  }
  return { minY, maxY };
}

function compare(rgbaH5: Buffer, emu: { w: number; h: number; rgba: Buffer }): void {
  const w = 256;
  const h = 240;
  if (emu.w !== w || emu.h !== h) {
    console.log('size mismatch h5=' + w + 'x' + h + ' emu=' + emu.w + 'x' + emu.h);
    return;
  }
  let diff = 0;
  const buckets = new Array(30).fill(0);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const a = rgbaH5[i], b = rgbaH5[i + 1], c = rgbaH5[i + 2];
      const d = emu.rgba[i], e = emu.rgba[i + 1], f = emu.rgba[i + 2];
      if (a !== d || b !== e || c !== f) {
        diff++;
        buckets[(y / 8) | 0]++;
      }
    }
  }
  const h5r = contentRows(rgbaH5, w, h);
  const emur = contentRows(emu.rgba, w, h);
  console.log(
    `diff=${diff} ` +
      `h5Rows=[${h5r.minY}..${h5r.maxY}] emuRows=[${emur.minY}..${emur.maxY}] ` +
      `rowShift=${h5r.minY >= 0 ? h5r.minY - emur.minY : '?'} ` +
      `buckets=${buckets.join(',')}`,
  );
}

const FRAMES: Array<{ h5k: number; emuFile: string }> = [
  { h5k: 41, emuFile: path.join(ROOT, 'output/emu-full/frame-0050/screen.png') },    // f50 tecmo logo
  { h5k: 441, emuFile: path.join(ROOT, 'output/emu-full/frame-0450/screen.png') },   // f450 NTV
  { h5k: 3721, emuFile: path.join(ROOT, 'output/emu-full/frame-3730/screen.png') },  // f3730 帘幕
];

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;

const targets = new Map(FRAMES.map((f) => [f.h5k, f]));
const END = Math.max(...FRAMES.map((f) => f.h5k));
for (let k = 1; k <= END; k++) {
  runtime.frame(game);
  const t = targets.get(k);
  if (t) {
    const h5 = h5ToRgba(ppu.buffer);
    const emu = decodePng(t.emuFile);
    console.log('=== H5 frame k=' + k + ' (NES f' + (k + 9) + ') vs ' + t.emuFile + ' ===');
    compare(h5, emu);
  }
}
