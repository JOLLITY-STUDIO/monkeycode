import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';
import * as zlib from 'zlib';

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
function bufToRgba(buf: Uint32Array): Buffer {
  const w = 256, h = 240;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = buf[i] >>> 0;
    rgba[i * 4 + 0] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  return rgba;
}
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  const outDir = path.resolve(__dirname, '..', 'output', 'h5-render');
  fs.mkdirSync(outDir, { recursive: true });
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  const inspectFrames = [60, 120, 180, 240, 270, 290, 300, 310, 330, 350, 400, 450, 500];
  for (let f = 1; f <= 540; f++) {
    runtime.frame(game);
    if (inspectFrames.includes(f)) {
      const buf = (runtime.ppu as any).buffer as Uint32Array;
      const rgba = bufToRgba(buf);
      const png = encodePng(256, 240, rgba);
      const outPath = path.join(outDir, `frame-${String(f).padStart(3, '0')}.png`);
      fs.writeFileSync(outPath, png);
      let nz = 0;
      for (let i = 0; i < buf.length; i++) if (buf[i] !== 0 && buf[i] !== 0xff000000) nz++;
      console.log(`frame ${f} -> ${outPath} (nz=${nz})`);
    }
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
