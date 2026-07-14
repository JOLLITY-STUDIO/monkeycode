/**
 * 检查 VRAM dump 中的 nametable Vflip 标志
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const vram = fs.readFileSync(VRAM_PATH);

function parseEntry(addr) {
  const lo = vram[addr] & 0xff;
  const hi = vram[addr + 1] & 0xff;
  const word = (hi << 8) | lo;
  return {
    tileIndex: word & 0x07FF,
    hFlip: !!(word & 0x1000),
    vFlip: !!(word & 0x0800),
    palette: (word >> 13) & 0x03,
    priority: (word >> 15) & 0x01,
  };
}

const planeA = 0xC000;
const planeB = 0xE000;

console.log('=== Plane A (0xC000) Vflip 统计 ===');
let vflipCountA = 0;
let totalA = 0;
for (let i = 0; i < 4096; i += 2) {
  const entry = parseEntry(planeA + i);
  if (entry.tileIndex !== 0) {
    totalA++;
    if (entry.vFlip) vflipCountA++;
  }
}
console.log(`非零 tile: ${totalA}, Vflip: ${vflipCountA} (${(vflipCountA/totalA*100).toFixed(2)}%)`);

console.log('\n=== Plane B (0xE000) Vflip 统计 ===');
let vflipCountB = 0;
let totalB = 0;
for (let i = 0; i < 4096; i += 2) {
  const entry = parseEntry(planeB + i);
  if (entry.tileIndex !== 0) {
    totalB++;
    if (entry.vFlip) vflipCountB++;
  }
}
console.log(`非零 tile: ${totalB}, Vflip: ${vflipCountB} (${(vflipCountB/totalB*100).toFixed(2)}%)`);

console.log('\n=== 前 20 个非零 Plane A 条目 ===');
let count = 0;
for (let i = 0; i < 4096 && count < 20; i += 2) {
  const entry = parseEntry(planeA + i);
  if (entry.tileIndex !== 0) {
    count++;
    console.log(`0x${(planeA+i).toString(16)}: tile=${entry.tileIndex}, vflip=${entry.vFlip}, palette=${entry.palette}, priority=${entry.priority}`);
  }
}

console.log('\n=== 检查 tile 数据是否垂直翻转 ===');
function decodeTile(vram, tileAddr) {
  const base = tileAddr & 0xFFFF;
  const pixels = [];
  for (let y = 0; y < 8; y++) {
    const rowBase = base + y * 4;
    const p0 = vram[rowBase];
    const p1 = vram[rowBase + 1];
    const p2 = vram[rowBase + 2];
    const p3 = vram[rowBase + 3];
    let row = '';
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const pixel =
        ((p0 >> bit) & 1) |
        ((p1 >> bit) & 1) << 1 |
        ((p2 >> bit) & 1) << 2 |
        ((p3 >> bit) & 1) << 3;
      row += pixel ? '*' : '.';
    }
    pixels.push(row);
  }
  return pixels;
}

const sampleTile = 512;
const tileAddr = sampleTile * 32;
console.log(`\nTile ${sampleTile} (0x${tileAddr.toString(16)}) 原始:`);
const original = decodeTile(vram, tileAddr);
for (const row of original) console.log(row);

console.log('\n垂直翻转后:');
for (let y = 7; y >= 0; y--) console.log(original[y]);
