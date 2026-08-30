/**
 * _cmp_row_dump.ts — dump H5 vs emu f450 具体行的像素内容
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

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;
for (let k = 1; k <= 440; k++) runtime.frame(game);

const h5 = Buffer.alloc(256 * 240 * 4);
for (let i = 0; i < 256 * 240; i++) {
  const v = ppu.buffer[i] >>> 0;
  h5[i * 4] = (v >>> 16) & 0xff;
  h5[i * 4 + 1] = (v >>> 8) & 0xff;
  h5[i * 4 + 2] = v & 0xff;
}
const emu = decodePng(path.join(ROOT, 'output/emu-full/frame-0450/screen.png'));

function rowAscii(buf: Buffer, y: number, x0: number, x1: number): string {
  let out = '';
  for (let x = x0; x < x1; x++) {
    const i = (y * 256 + x) * 4;
    const r = buf[i], g = buf[i + 1], b = buf[i + 2];
    if (r === 0 && g === 0 && b === 0) out += '.';
    else if (r === g && g === b) out += r > 200 ? '#' : r > 100 ? '+' : '-';
    else out += 'C';
  }
  return out;
}

for (const y of [150, 218, 138, 160, 200, 225]) {
  console.log(`y${y} H5 : ${rowAscii(h5, y, 0, 256)}`);
  console.log(`y${y} EMU: ${rowAscii(emu, y, 0, 256)}`);
  // 差异像素数
  let d = 0;
  for (let x = 0; x < 256; x++) {
    const i = (y * 256 + x) * 4;
    if (h5[i] !== emu[i] || h5[i + 1] !== emu[i + 1] || h5[i + 2] !== emu[i + 2]) d++;
  }
  console.log(`   diff=${d}`);
}
