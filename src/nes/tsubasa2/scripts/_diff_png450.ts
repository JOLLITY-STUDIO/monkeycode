/**
 * _diff_png450.ts — H5 vs emu f450 差异可视化
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

function writePng(file: string, w: number, h: number, rgba: Buffer) {
  const raw = Buffer.alloc((w * 4 + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0;
    rgba.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idat = zlib.deflateSync(raw);
  function chunk(type: string, data: Buffer) {
    const t = Buffer.from(type, 'ascii');
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    let crcv = 0xffffffff;
    const table: number[] = [];
    for (let n = 0; n < 256; n++) {
      let x = n;
      for (let k = 0; k < 8; k++) x = x & 1 ? (0xedb88320 ^ (x >>> 1)) >>> 0 : x >>> 1;
      table[n] = x >>> 0;
    }
    const buf = Buffer.concat([t, data]);
    for (let i = 0; i < buf.length; i++) crcv = table[(crcv ^ buf[i]) & 0xff] ^ (crcv >>> 8);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE((crcv ^ 0xffffffff) >>> 0);
    return Buffer.concat([len, t, data, crc]);
  }
  const png = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', Buffer.from([0,1,0,0, 0,0,0,240, 8,6,0,0,0])), // 256x240 8bit RGBA
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0)),
  ]);
  fs.writeFileSync(file, png);
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
  h5[i * 4 + 3] = 0xff;
}
const emu = decodePng(path.join(ROOT, 'output/emu-full/frame-0450/screen.png'));
const diff = Buffer.alloc(256 * 240 * 4);
let d = 0;
for (let y = 0; y < 240; y++) {
  for (let x = 0; x < 256; x++) {
    const i = (y * 256 + x) * 4;
    if (h5[i] !== emu[i] || h5[i+1] !== emu[i+1] || h5[i+2] !== emu[i+2]) {
      diff[i] = 0xff; diff[i+1] = 0; diff[i+2] = 0; diff[i+3] = 0xff;
      d++;
    } else {
      // darkened base for visibility
      diff[i] = (h5[i] >> 2);
      diff[i+1] = (h5[i+1] >> 2);
      diff[i+2] = (h5[i+2] >> 2);
      diff[i+3] = 0xff;
    }
  }
}
writePng(path.join(ROOT, '_diff_f450.png'), 256, 240, diff);
console.log(`diff pixels=${d} file=_diff_f450.png`);
