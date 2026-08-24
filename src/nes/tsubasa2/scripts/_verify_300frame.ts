/**
 * _verify_300frame.ts — 多时刻 BG/SPR/Composite 三层截图
 *
 * 输出：output/verify-frame{N}-{composite|bg|spr}.png （N = 30/60/120/180/240/300）
 * 原理：跑 N 帧后立即截一组（composite + BG-only + SPR-only），再继续
 */
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { Tsubasa2 } from '../src/game/index';
import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';

const FRAMES_LIST = [30, 60, 120, 180, 240, 300];
const runtime = new HeadlessRuntime();
const game = new Tsubasa2();
game.boot();

const ppu: any = runtime.ppu;

// CRC32 + PNG encoder (重复代码)
const CRC_TABLE: number[] = (() => {
  const t: number[] = new Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(d: Buffer): number {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < d.length; i++) c = CRC_TABLE[(c ^ d[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function makeChunk(t: string, d: Buffer): Buffer {
  const lb = Buffer.alloc(4); lb.writeUInt32BE(d.length, 0);
  const tb = Buffer.from(t, 'ascii');
  const cb = Buffer.alloc(4); cb.writeUInt32BE(crc32(Buffer.concat([tb, d])), 0);
  return Buffer.concat([lb, tb, d, cb]);
}
function encodePng(w: number, h: number, rgba: Buffer): Buffer {
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr.writeUInt8(8, 8); ihdr.writeUInt8(6, 9);
  const row = w * 4;
  const raw = Buffer.alloc((row + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (row + 1)] = 0;
    rgba.copy(raw, y * (row + 1) + 1, y * row, (y + 1) * row);
  }
  return Buffer.concat([sig, makeChunk('IHDR', ihdr),
    makeChunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    makeChunk('IEND', Buffer.alloc(0))]);
}
function bufToRgba(buf: Uint32Array, w: number, h: number): Buffer {
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = buf[i];
    rgba[i * 4 + 0] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  return rgba;
}
function nonZeroCount(buf: Uint32Array): number {
  let n = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i] !== 0) n++;
  return n;
}

const W = 256, H = 240;
const outDir = path.join(__dirname, '..', 'output');
fs.mkdirSync(outDir, { recursive: true });

const origBg = ppu.f_bgVisibility;
const origSp = ppu.f_spVisibility;

/** 渲染一组 (composite, BG-only, SPR-only) 并保存 */
function renderTriple(frameN: number): void {
  // Composite (current state)
  const compPath = path.join(outDir, `verify-frame${frameN}-composite.png`);
  const compNz = nonZeroCount(ppu.buffer);
  fs.writeFileSync(compPath, encodePng(W, H, bufToRgba(ppu.buffer, W, H)));

  // BG only
  ppu.buffer.fill(0);
  ppu.f_spVisibility = 0;
  ppu.f_bgVisibility = 1;
  ppu.startFrame();
  ppu.advanceDots(262 * 341);
  ppu.renderFramePartially(0, 240);
  ppu.endFrame();
  const bgNz = nonZeroCount(ppu.buffer);
  const bgPath = path.join(outDir, `verify-frame${frameN}-bg.png`);
  fs.writeFileSync(bgPath, encodePng(W, H, bufToRgba(ppu.buffer, W, H)));

  // SPR only
  ppu.buffer.fill(0);
  ppu.f_spVisibility = 1;
  ppu.f_bgVisibility = 0;
  ppu.startFrame();
  ppu.advanceDots(262 * 341);
  ppu.renderFramePartially(0, 240);
  ppu.endFrame();
  const sprNz = nonZeroCount(ppu.buffer);
  const sprPath = path.join(outDir, `verify-frame${frameN}-spr.png`);
  fs.writeFileSync(sprPath, encodePng(W, H, bufToRgba(ppu.buffer, W, H)));

  console.log(
    `[verify] frame=${String(frameN).padStart(3)} | ` +
    `composite=${String(compNz).padStart(5)} | bg=${String(bgNz).padStart(5)} | spr=${String(sprNz).padStart(5)}`
  );
}

let total = 0;
for (const target of FRAMES_LIST) {
  while (total < target) {
    game.frame(runtime);
    total++;
  }
  renderTriple(target);
}

ppu.f_bgVisibility = origBg;
ppu.f_spVisibility = origSp;
console.log(`[verify] done. PNGs at output/verify-frame{N}-{composite|bg|spr}.png`);