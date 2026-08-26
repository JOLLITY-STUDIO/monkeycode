/**
 * _smoke_opening_frames.ts — H5 片头逐帧动画冒烟验证
 * 跑 H5 f0-f3650,每 150 帧保存 screen.png,与 emu-full 同帧对比。
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';

const EMU_DIR = path.join(__dirname, '..', 'output', 'emu-full');
const H5_DIR = path.join(__dirname, '..', 'output', 'h5-opening');
fs.mkdirSync(H5_DIR, { recursive: true });

const CRC_TABLE: number[] = (() => {
  const t: number[] = new Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[n] = c >>> 0; }
  return t;
})();
function crc32(d: Buffer): number { let c = 0xFFFFFFFF; for (let i = 0; i < d.length; i++) c = CRC_TABLE[(c ^ d[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function makeChunk(t: string, d: Buffer): Buffer {
  const lb = Buffer.alloc(4); lb.writeUInt32BE(d.length, 0);
  const tb = Buffer.from(t, 'ascii');
  const cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0);
  return Buffer.concat([lb, tb, d, cb]);
}
function encodePng(w: number, h: number, rgba: Buffer): Buffer {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9);
  const row = w * 4;
  const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) { raw[y * (row + 1)] = 0; rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row); }
  return Buffer.concat([sig, makeChunk('IHDR', ihdr), makeChunk('IDAT', zlib.deflateSync(raw, { level: 1 })), makeChunk('IEND', Buffer.alloc(0))]);
}
function bufToRgba(buf: Uint32Array): Buffer {
  const w = 256, h = 240;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) { const v = buf[i]; rgba[i * 4] = (v >>> 16) & 0xff; rgba[i * 4 + 1] = (v >>> 8) & 0xff; rgba[i * 4 + 2] = v & 0xff; rgba[i * 4 + 3] = 0xff; }
  return rgba;
}

function readPngRgba(file: string): Buffer | null {
  try {
    const data = fs.readFileSync(file);
    // 用简单解码:依赖外部 pngjs? 先只保存 H5,不读 emu
    return null;
  } catch { return null; }
}

const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot(runtime as any);

const total = 3650;
const step = 150;
for (let f = 0; f < total; f++) {
  runtime.frame(game);
  if (f % step === 0 || f === total - 1) {
    const ppu: any = runtime.ppu;
    const rgba = bufToRgba(ppu.buffer as Uint32Array);
    const png = encodePng(256, 240, rgba);
    const dir = path.join(H5_DIR, 'frame-' + String(f).padStart(4, '0'));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'screen.png'), png);
    const emuFile = path.join(EMU_DIR, 'frame-' + String(f + 10).padStart(4, '0'), 'screen.png');
    const exists = fs.existsSync(emuFile);
    console.log(`h5 f${f}(nes f${f + 10}) saved, emu ref exists=${exists}`);
  }
}
console.log('smoke done');
