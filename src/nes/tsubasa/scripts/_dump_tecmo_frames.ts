/**
 * TECMO 开场逐帧 dump → 直接拿 jsnes PPU onFrame buffer
 * （和游戏使用完全相同的 jsnes 引擎+调色板）
 *
 * 执行: npx tsx scripts/_dump_tecmo_frames.ts
 */
import NES from '../src/tsnes/src/nes';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { deflateSync, crc32 } from 'node:zlib';

const CWD = process.cwd();

// ═══════════════════════ PNG encoder ═══════════════════════
function uint32be(v: number): Buffer {
  const b = Buffer.allocUnsafe(4);
  b.writeUInt32BE(v);
  return b;
}
function makeChunk(type: string, data: Buffer): Buffer {
  const tb = Buffer.from(type, 'ascii');
  return Buffer.concat([uint32be(data.length), tb, data, uint32be(crc32(Buffer.concat([tb, data])) >>> 0)]);
}
function encodePNG(buf: Uint32Array, w: number, h: number): Buffer {
  // jsnes PPU 输出 BGR 格式 (Uint32 = 0x00BBGGRR)
  // 小端序内存: byte0=R, byte1=G, byte2=B, byte3=0 — 天然匹配 RGB
  // 用 Uint8Array 视图直接读字节，和 ImageData 完全一致
  const u8 = new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  const sl = 1 + w * 3;
  const raw = Buffer.allocUnsafe(h * sl);
  for (let y = 0; y < h; y++) {
    const ro = y * w * 4, oo = y * sl;
    raw[oo] = 0;
    for (let x = 0; x < w; x++) {
      const sp = ro + x * 4;
      const dp = oo + 1 + x * 3;
      raw[dp]     = u8[sp];     // R
      raw[dp + 1] = u8[sp + 1]; // G
      raw[dp + 2] = u8[sp + 2]; // B
    }
  }
  const comp = deflateSync(raw);
  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', comp),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ═══════════════════════ 初始化 ═══════════════════════
console.log('Loading ROM...');
const romBuf = readFileSync(join(CWD, 'rom.nes'));
const romU8 = new Uint8Array(romBuf.buffer, romBuf.byteOffset, romBuf.byteLength);

let latestBuf: Uint32Array | null = null;

const nes = new NES({
  onFrame(buffer: Uint32Array) {
    // 深拷贝，避免 ppu.buffer 在下一次 startFrame 时被覆盖
    latestBuf = new Uint32Array(buffer);
  },
  emulateSound: false,
});

nes.loadROM(romU8);

function getMem() { return nes.cpu.mem as Uint8Array; }
function hex(v: number, pad = 2) { return v.toString(16).padStart(pad, '0'); }

// ═══════════════════════ 跑帧 ═══════════════════════
const OUT_DIR = join(CWD, 'test_output', 'tecmo_frames');
mkdirSync(OUT_DIR, { recursive: true });

console.log('Running boot frames...');
for (let i = 0; i < 30; i++) nes.frame();

let scene = getMem()[0x26];
console.log(`After boot: scene=$26=${hex(scene)}`);

// 跑到 scene 0
if (scene !== 0) {
  for (let i = 0; i < 600; i++) {
    nes.frame();
    scene = getMem()[0x26];
    if (scene === 0) break;
  }
  if (scene !== 0) {
    console.error(`Failed to enter scene 0! scene=${hex(scene)}`);
    process.exit(1);
  }
}

// ═══════════════════════ 逐帧抓取 ═══════════════════════
console.log('\nCapturing scene 0 frames...');
let frameNum = 0;

for (let i = 0; i < 900; i++) {
  latestBuf = null;
  nes.frame();

  const mem = getMem();
  scene = mem[0x26];
  const z2A = mem[0x2A];
  const z4A = mem[0x4A];

  if (scene !== 0) {
    console.log(`Scene → ${hex(scene)} at frame ${frameNum}. Stop.`);
    break;
  }

  if (latestBuf) {
    // 统计一下
    const colors = new Set<number>();
    let nonzero = 0;
    for (let j = 0; j < 256 * 240; j++) {
      const c = latestBuf[j] & 0xFFFFFF;
      if (c !== 0) { nonzero++; colors.add(c); }
    }

    const fname = `frame_${String(frameNum).padStart(3, '0')}.png`;
    const png = encodePNG(latestBuf, 256, 240);
    writeFileSync(join(OUT_DIR, fname), png);

    console.log(`  → ${fname}  z4A=${z4A} z2A=${z2A}  nonzero=${nonzero} colors=${colors.size}`);
  }

  frameNum++;
}

console.log(`\nDone! ${frameNum} frames saved to ${OUT_DIR}`);
