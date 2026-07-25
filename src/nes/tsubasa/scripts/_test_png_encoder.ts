/**
 * 验证 PNG encoder + PPU buffer 格式
 * 执行: npx tsx scripts/_test_png_encoder.ts
 */
import NES from '../src/tsnes/src/nes';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { deflateSync, crc32 } from 'node:zlib';
import { Buffer } from 'node:buffer';

const CWD = process.cwd();
const OUT = join(CWD, 'test_output', '_png_test');

// ─── PNG encoder (和 dump 脚本完全相同) ───
function uint32be(v: number): Buffer {
  const b = Buffer.allocUnsafe(4);
  b.writeUInt32BE(v);
  return b;
}
function makeChunk(type: string, data: Buffer): Buffer {
  const tb = Buffer.from(type, 'ascii');
  const crcVal = crc32(Buffer.concat([tb, data]));
  return Buffer.concat([uint32be(data.length), tb, data, uint32be(typeof crcVal === 'number' ? crcVal >>> 0 : parseInt(crcVal as any, 10) >>> 0)]);
}
function encodePNG(buf: Uint32Array, w: number, h: number): Buffer {
  const sl = 1 + w * 3;
  const raw = Buffer.allocUnsafe(h * sl);
  for (let y = 0; y < h; y++) {
    const ro = y * w, oo = y * sl;
    raw[oo] = 0;
    for (let x = 0; x < w; x++) {
      const a = buf[ro + x];
      const p = oo + 1 + x * 3;
      raw[p]     = (a >>> 16) & 0xFF;
      raw[p + 1] = (a >>>  8) & 0xFF;
      raw[p + 2] =  a         & 0xFF;
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

// ─── Test 1: 已知颜色验证 PNG encoder ───
console.log('=== Test 1: Known color pattern ===');
const testBuf = new Uint32Array(8);
testBuf[0] = 0xFF0000; // red
testBuf[1] = 0x00FF00; // green
testBuf[2] = 0x0000FF; // blue
testBuf[3] = 0x525252; // grey (PPU NTSC palette[0])
testBuf[4] = 0xB40000; // dark red (PPU NTSC palette[1])
testBuf[5] = 0xDC0E22; // (PPU NTSC palette[18])
testBuf[6] = 0xFFFFFF; // white
testBuf[7] = 0x000000; // black

console.log('Test buffer values (0xRRGGBB → R,G,B):');
for (let i = 0; i < 8; i++) {
  const v = testBuf[i];
  console.log(`  [${i}]=0x${v.toString(16).padStart(6,'0')} → (${(v>>>16)&0xFF},${(v>>>8)&0xFF},${v&0xFF})`);
}

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'test_colors.png'), encodePNG(testBuf, 4, 2));
console.log('Saved test_colors.png (4x2, top row: R/G/B/grey, bottom: dkRed/altRed/white/black)');
console.log('');

// ─── Test 2: 实际 PPU buffer 采样 ───
console.log('=== Test 2: PPU buffer from actual game ===');
const romU8 = new Uint8Array(readFileSync(join(CWD, 'rom.nes')));
let captured = false;

const nes = new NES({
  onFrame(buffer: Uint32Array) {
    if (captured) return;
    captured = true;

    const W = 256, H = 240, total = W * H;
    const colors = new Set<number>();
    let nonZero = 0;
    const samples: string[] = [];

    for (let i = 0; i < total; i++) {
      const c = buffer[i] & 0xFFFFFF;
      if (c !== 0) {
        nonZero++;
        if (samples.length < 10) {
          samples.push(`[${i}]=0x${c.toString(16).padStart(6,'0')}`);
        }
      }
      colors.add(c);
    }

    console.log(`  Non-black: ${nonZero}/${total} (${(nonZero/total*100).toFixed(1)}%)`);
    console.log(`  Unique colors: ${colors.size}`);
    console.log(`  Samples: ${samples.join(', ')}`);

    writeFileSync(join(OUT, 'frame_ppu.png'), encodePNG(buffer, 256, 240));
    console.log('  Saved frame_ppu.png');
  },
  emulateSound: false,
});

nes.loadROM(romU8);

// Boot
for (let i = 0; i < 30; i++) nes.frame();
let scene = nes.cpu.mem[0x26];
console.log(`Boot: scene=$${scene.toString(16)}`);

// Seek scene 0
for (let i = 0; i < 600 && scene !== 0; i++) {
  nes.frame();
  scene = nes.cpu.mem[0x26];
}
console.log(`Seek: scene=$${scene.toString(16)}`);

// Capture after scene 0 reached
if (scene === 0) {
  captured = false;
  nes.frame();
  console.log(`After capture: captured=${captured} scene=$${nes.cpu.mem[0x26].toString(16)}`);
}

console.log('\nDone! Check', OUT);
