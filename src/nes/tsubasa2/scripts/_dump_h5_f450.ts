// _dump_h5_f450.ts — 导出 H5 f450 buffer 为 PNG
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const ROOT = path.resolve(__dirname, '..');

function crc32(d: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < d.length; i++) c = ((c ^ d[i]) & 0xff) * 0x01000193 ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(t: string, d: Buffer): Buffer {
  const lb = Buffer.alloc(4);
  lb.writeUInt32BE(d.length, 0);
  const tb = Buffer.from(t, 'ascii');
  const cb = Buffer.alloc(4);
  cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0);
  return Buffer.concat([lb, tb, d, cb]);
}
function encodePng(w: number, h: number, rgba: Buffer): Buffer {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const row = w * 4;
  const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (row + 1)] = 0;
    rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row);
  }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime);
const ppu: any = runtime.ppu;
for (let k = 1; k <= 441; k++) runtime.frame(game); // 渲染 f450
const buf = ppu.buffer;
const rgba = Buffer.alloc(256 * 240 * 4);
for (let i = 0; i < 256 * 240; i++) {
  const v = buf[i] >>> 0;
  rgba[i * 4] = (v >>> 16) & 0xff;
  rgba[i * 4 + 1] = (v >>> 8) & 0xff;
  rgba[i * 4 + 2] = v & 0xff;
  rgba[i * 4 + 3] = 0xff;
}
fs.writeFileSync(path.join(ROOT, '_h5_f450.png'), encodePng(256, 240, rgba));
console.log('written _h5_f450.png');
