/**
 * _diag_shift.ts — 逐帧对比 H5 vs emu 内容行范围，定位 3 行偏移的起始帧与规律
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

function h5Rgba(buf: Uint32Array): Buffer {
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

function contentRows(rgba: Buffer): { minY: number; maxY: number } {
  let minY = -1;
  let maxY = -1;
  for (let y = 0; y < 240; y++) {
    let nz = false;
    for (let x = 0; x < 256; x++) {
      const i = (y * 256 + x) * 4;
      if (rgba[i] || rgba[i + 1] || rgba[i + 2]) {
        nz = true;
        break;
      }
    }
    if (nz) {
      if (minY < 0) minY = y;
      maxY = y;
    }
  }
  return { minY, maxY };
}

const prerender = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/scroll-prerender.json'), 'utf8'));

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;

const FRAME_START = 440;
const FRAME_END = 470;
for (let k = 1; k <= FRAME_START - 10; k++) runtime.frame(game);

for (let nes = FRAME_START; nes <= FRAME_END; nes++) {
  runtime.frame(game);
  const h5r = h5Rgba(ppu.buffer);
  const hr = contentRows(h5r);
  const emuFile = path.join(ROOT, 'output/emu-full/frame-' + String(nes).padStart(4, '0') + '/screen.png');
  const emuBuf = decodePng(emuFile);
  const er = contentRows(emuBuf);
  const pr = prerender[String(nes)];
  const shift = hr.minY >= 0 && er.minY >= 0 ? hr.minY - er.minY : 0;
  console.log(
    `f${nes} h5=[${hr.minY}..${hr.maxY}] emu=[${er.minY}..${er.maxY}] topShift=${shift} endShift=${hr.maxY - er.maxY} ` +
      `prerender=vt:${pr.regVT} fv:${pr.regFV} fh:${pr.regFH}`,
  );
}
