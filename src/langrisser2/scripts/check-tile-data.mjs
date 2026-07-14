/**
 * 对比预提取 tile 和 VRAM dump 中的 tile 数据
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function readLong(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

function decompressLZSS(resourceAddr) {
  const decompressedSize = readWord(resourceAddr + 1);
  const compressedDataStart = resourceAddr + 3;
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;
  while (remaining > 0) {
    const flagByte = readByte(compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = readByte(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = readByte(compressedPos++);
        const b2 = readByte(compressedPos++);
        let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const matchLength = (b2 & 0x0f) + 2;
        for (let i = 0; i < matchLength && remaining > 0; i++) {
          const byte = window[matchOffset];
          window[windowPos] = byte;
          output[outputPos++] = byte;
          matchOffset = (matchOffset + 1) & 0xfff;
          windowPos = (windowPos + 1) & 0xfff;
          remaining--;
        }
      }
    }
  }
  return output;
}

const ptr3 = readLong(0x0B0000 + 3 * 4);
const tiles3 = decompressLZSS(ptr3);

const ptr8 = readLong(0x0B0000 + 8 * 4);
const tiles8 = decompressLZSS(ptr8);

console.log('=== 对比 Entry 3 → VRAM 0x2000 ===');
let diff3 = 0;
for (let i = 0; i < tiles3.length; i++) {
  if (tiles3[i] !== vram[0x2000 + i]) {
    diff3++;
  }
}
console.log(`差异字节: ${diff3} / ${tiles3.length}`);
if (diff3 === 0) console.log('完全一致!');

console.log('\n=== 对比 Entry 8 → VRAM 0x4000 ===');
let diff8 = 0;
for (let i = 0; i < tiles8.length; i++) {
  if (tiles8[i] !== vram[0x4000 + i]) {
    diff8++;
  }
}
console.log(`差异字节: ${diff8} / ${tiles8.length}`);
if (diff8 === 0) console.log('完全一致!');

console.log('\n=== 对比 Plane A nametable (0xC000) ===');
let diffNA = 0;
const ntA = vram.subarray(0xC000, 0xC000 + 4096);
for (let i = 0; i < ntA.length; i++) {
  if (ntA[i] !== vram[0xC000 + i]) {
    diffNA++;
  }
}
console.log(`差异字节: ${diffNA} / ${ntA.length}`);
if (diffNA === 0) console.log('完全一致!');

console.log('\n=== 检查 VRAM 中其他 tile 区域 ===');
const usedTiles = new Set();
for (let i = 0; i < 4096; i += 2) {
  const lo = vram[0xC000 + i];
  const hi = vram[0xC000 + i + 1];
  const tileIdx = (hi << 8) | lo & 0x07FF;
  if (tileIdx !== 0) usedTiles.add(tileIdx);
}
for (let i = 0; i < 4096; i += 2) {
  const lo = vram[0xE000 + i];
  const hi = vram[0xE000 + i + 1];
  const tileIdx = (hi << 8) | lo & 0x07FF;
  if (tileIdx !== 0) usedTiles.add(tileIdx);
}

console.log(`使用的 tile 索引范围: [${Math.min(...usedTiles)}, ${Math.max(...usedTiles)}]`);
console.log(`使用的 tile 数量: ${usedTiles.size}`);

const inRange = [...usedTiles].filter(t => t >= 256 && t < 768);
const outRange = [...usedTiles].filter(t => t < 256 || t >= 768);
console.log(`在 256-767 范围内: ${inRange.length}`);
console.log(`不在范围内: ${outRange.length}`);
if (outRange.length > 0) {
  console.log('不在范围内的 tile 索引:', outRange.slice(0, 20));
}

console.log('\n=== 检查 tile 97 (0x61) 的数据 ===');
const tile97Addr = 97 * 32;
console.log(`Tile 97 在 VRAM 地址: 0x${tile97Addr.toString(16)}`);
console.log('数据:');
for (let y = 0; y < 8; y++) {
  let row = '';
  for (let x = 0; x < 4; x++) {
    row += vram[tile97Addr + y*4 + x].toString(16).padStart(2, '0') + ' ';
  }
  console.log(row);
}
