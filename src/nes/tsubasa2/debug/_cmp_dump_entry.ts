import { HeadlessRuntime } from '../src/game/runtime/HeadlessRuntime';
import { Tsubasa2 } from '../src/game/index';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

/** 解码 PNG (RGBA 8-bit) */
function decodePng(file: string): { w: number; h: number; rgba: Uint8Array } {
  const buf = fs.readFileSync(file);
  if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) throw new Error('not a png');
  let pos = 8;
  let width = 0, height = 0;
  let idatChunks: Buffer[] = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos); pos += 4;
    const type = buf.slice(pos, pos + 4).toString('ascii'); pos += 4;
    const data = buf.slice(pos, pos + len); pos += len;
    pos += 4; // skip crc
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') break;
  }
  const compressed = Buffer.concat(idatChunks);
  const raw = zlib.inflateSync(compressed);
  const stride = width * 4;
  const rgba = new Uint8Array(height * stride);
  let p = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[p++];
    const line = raw.slice(p, p + stride); p += stride;
    if (filter === 0) rgba.set(line, y * stride);
    else if (filter === 1) {
      // sub
      const dst = y * stride;
      for (let i = 0; i < stride; i++) {
        const left = i >= 4 ? rgba[dst + i - 4] : 0;
        rgba[dst + i] = (line[i] + left) & 0xff;
      }
    } else if (filter === 2) {
      const dst = y * stride;
      const up = dst >= stride ? dst - stride : 0;
      for (let i = 0; i < stride; i++) {
        rgba[dst + i] = (line[i] + rgba[up + i]) & 0xff;
      }
    } else if (filter === 3) {
      const dst = y * stride;
      const up = dst >= stride ? dst - stride : 0;
      for (let i = 0; i < stride; i++) {
        const left = i >= 4 ? rgba[dst + i - 4] : 0;
        rgba[dst + i] = (line[i] + ((left + rgba[up + i]) >> 1)) & 0xff;
      }
    } else if (filter === 4) {
      const dst = y * stride;
      const up = dst >= stride ? dst - stride : 0;
      for (let i = 0; i < stride; i++) {
        const a = i >= 4 ? rgba[dst + i - 4] : 0;
        const b = rgba[up + i];
        const c = i >= 4 ? rgba[up + i - 4] : 0;
        let p2 = a + b - c;
        const pa = Math.abs(p2 - a);
        const pb = Math.abs(p2 - b);
        const pc = Math.abs(p2 - c);
        let pr: number;
        if (pa <= pb && pa <= pc) pr = a;
        else if (pb <= pc) pr = b;
        else pr = c;
        rgba[dst + i] = (line[i] + pr) & 0xff;
      }
    }
  }
  return { w: width, h: height, rgba };
}

function bufToRgba(buf: Uint32Array): Uint8Array {
  const w = 256, h = 240;
  const rgba = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const v = buf[i] >>> 0;
    rgba[i * 4 + 0] = (v >>> 16) & 0xff;
    rgba[i * 4 + 1] = (v >>> 8) & 0xff;
    rgba[i * 4 + 2] = v & 0xff;
    rgba[i * 4 + 3] = 0xff;
  }
  return rgba;
}

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

async function main() {
  const outDir = path.resolve(__dirname, '..', 'output', 'h5-vs-ref');
  fs.mkdirSync(outDir, { recursive: true });
  const runtime = new HeadlessRuntime();
  const game = new Tsubasa2();
  game.boot();
  const targets = [60, 120, 180];
  for (let f = 1; f <= 200; f++) {
    runtime.frame(game);
    if (targets.includes(f)) {
      const buf = (runtime.ppu as any).buffer as Uint32Array;
      const rgba = bufToRgba(buf);
      const png = encodePng(256, 240, Buffer.from(rgba));
      fs.writeFileSync(path.join(outDir, `h5-f${String(f).padStart(3,'0')}.png`), png);
      // 跟 reference 比
      const refPng = `output/emu-reference/frame-${String(f).padStart(3,'0')}/screen.png`;
      const fullRef = path.resolve(__dirname, '..', refPng);
      if (!fs.existsSync(fullRef)) {
        console.log(`frame ${f}: reference not found at ${fullRef}`);
        continue;
      }
      const ref = decodePng(fullRef);
      // 直接比较 rgba (256×240)
      let diff = 0;
      const yStats = new Map<number, { count: number; minX: number; maxX: number }>();
      for (let i = 0; i < rgba.length; i += 4) {
        const idx = i / 4;
        const x = idx % 256;
        const y = (idx / 256) | 0;
        const r1 = rgba[i + 0], g1 = rgba[i + 1], b1 = rgba[i + 2];
        const r2 = ref.rgba[i + 0], g2 = ref.rgba[i + 1], b2 = ref.rgba[i + 2];
        if (Math.abs(r1 - r2) > 16 || Math.abs(g1 - g2) > 16 || Math.abs(b1 - b2) > 16) {
          diff++;
          const s = yStats.get(y) ?? { count: 0, minX: 256, maxX: 0 };
          s.count++;
          s.minX = Math.min(s.minX, x);
          s.maxX = Math.max(s.maxX, x);
          yStats.set(y, s);
        }
      }
      console.log(`=== frame ${f} ===`);
      console.log(`  total diff pixels: ${diff} / ${256*240}`);
      // 按 y 行打印有差异的区段（每行几个像素+范围）
      const arr = [...yStats.entries()].sort((a, b) => a[0] - b[0]);
      // 只打印差异行数 >0 的，太多用范围合并
      if (arr.length > 0) {
        const groups: { yStart: number; yEnd: number; totalCount: number; minX: number; maxX: number }[] = [];
        for (const [y, info] of arr) {
          const g = groups[groups.length - 1];
          if (g && y - g.yEnd <= 1) {
            g.yEnd = y;
            g.totalCount += info.count;
            g.minX = Math.min(g.minX, info.minX);
            g.maxX = Math.max(g.maxX, info.maxX);
          } else {
            groups.push({ yStart: y, yEnd: y, totalCount: info.count, minX: info.minX, maxX: info.maxX });
          }
        }
        console.log(`  diff regions (${groups.length} groups):`);
        for (const g of groups.slice(0, 10)) {
          console.log(`    y=[${g.yStart}..${g.yEnd}] count=${g.totalCount} x=[${g.minX}..${g.maxX}]`);
        }
        if (groups.length > 10) console.log(`    ... and ${groups.length - 10} more groups`);
      }
      // 保存差异图 (RGB: 红=H5独有, 绿=ref独有, 黑=相同)
      const diffRgba = Buffer.alloc(rgba.length);
      for (let i = 0; i < rgba.length; i += 4) {
        const r1 = rgba[i + 0], g1 = rgba[i + 1], b1 = rgba[i + 2];
        const r2 = ref.rgba[i + 0], g2 = ref.rgba[i + 1], b2 = ref.rgba[i + 2];
        if (Math.abs(r1 - r2) <= 16 && Math.abs(g1 - g2) <= 16 && Math.abs(b1 - b2) <= 16) {
          // 相同 → 灰度
          const gray = Math.round((r1 + g1 + b1) / 3);
          diffRgba[i] = gray; diffRgba[i + 1] = gray; diffRgba[i + 2] = gray;
        } else {
          diffRgba[i] = 0xff; diffRgba[i + 1] = 0x00; diffRgba[i + 2] = 0x00;
        }
        diffRgba[i + 3] = 0xff;
      }
      fs.writeFileSync(path.join(outDir, `diff-f${String(f).padStart(3,'0')}.png`), encodePng(256, 240, diffRgba));
    }
  }
}
main().catch((e) => { console.error(e.stack || e); process.exit(1); });
