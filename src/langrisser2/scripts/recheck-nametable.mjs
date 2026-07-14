/**
 * 重新检查 nametable 条目解析方式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const vram = fs.readFileSync(VRAM_PATH);

console.log('=== Plane A nametable (0xC000) 原始数据分析 ===');
console.log('前 32 字节:');
for (let i = 0; i < 32; i += 2) {
  const lo = vram[0xC000 + i] & 0xff;
  const hi = vram[0xC000 + i + 1] & 0xff;
  const word = (hi << 8) | lo;
  console.log(`0x${(0xC000+i).toString(16)}: lo=0x${lo.toString(16).padStart(2,'0')}, hi=0x${hi.toString(16).padStart(2,'0')}, word=0x${word.toString(16).padStart(4,'0')}`);
}

console.log('\n=== 解析 nametable 条目 (不同方式) ===');
function parseEntry(addr) {
  const lo = vram[addr] & 0xff;
  const hi = vram[addr + 1] & 0xff;
  const word = (hi << 8) | lo;
  
  console.log(`\n地址 0x${addr.toString(16)}: word=0x${word.toString(16).padStart(4,'0')}`);
  
  console.log('方式1 (标准):');
  console.log(`  tileIndex = bit10-0: 0x${(word & 0x07FF).toString(16)} = ${word & 0x07FF}`);
  console.log(`  hFlip = bit12: ${!!(word & 0x1000)}`);
  console.log(`  vFlip = bit11: ${!!(word & 0x0800)}`);
  console.log(`  palette = bit14-13: ${(word >> 13) & 0x03}`);
  console.log(`  priority = bit15: ${(word >> 15) & 0x01}`);
  
  console.log('方式2 (全部作为 tileIndex):');
  console.log(`  tileIndex = word: 0x${word.toString(16)} = ${word}`);
  
  console.log('方式3 (大端序):');
  const wordBE = (lo << 8) | hi;
  console.log(`  wordBE=0x${wordBE.toString(16).padStart(4,'0')}`);
  console.log(`  tileIndex = bit10-0: 0x${(wordBE & 0x07FF).toString(16)} = ${wordBE & 0x07FF}`);
  console.log(`  hFlip = bit12: ${!!(wordBE & 0x1000)}`);
  console.log(`  vFlip = bit11: ${!!(wordBE & 0x0800)}`);
  console.log(`  palette = bit14-13: ${(wordBE >> 13) & 0x03}`);
  console.log(`  priority = bit15: ${(wordBE >> 15) & 0x01}`);
}

parseEntry(0xC40C);
parseEntry(0xC40E);

console.log('\n=== 统计 Plane A 所有非零条目 ===');
let entries = [];
for (let i = 0; i < 4096; i += 2) {
  const lo = vram[0xC000 + i] & 0xff;
  const hi = vram[0xC000 + i + 1] & 0xff;
  const word = (hi << 8) | lo;
  const tileIndex = word & 0x07FF;
  if (tileIndex !== 0) {
    entries.push(tileIndex);
  }
}
console.log(`非零条目数: ${entries.length}`);
console.log(`tile 索引范围: [${Math.min(...entries)}, ${Math.max(...entries)}]`);
console.log(`唯一 tile 数: ${new Set(entries).size}`);

console.log('\n=== 检查 VRAM 中 tile 97 的实际数据 ===');
function decodeTile(tileAddr) {
  const pixels = [];
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < 8; x++) {
      const rowBase = tileAddr + y * 4;
      const p0 = vram[rowBase];
      const p1 = vram[rowBase + 1];
      const p2 = vram[rowBase + 2];
      const p3 = vram[rowBase + 3];
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

console.log('\nTile 256 (0x4000):');
for (const row of decodeTile(256 * 32)) console.log(row);

console.log('\nTile 512 (0x8000):');
for (const row of decodeTile(512 * 32)) console.log(row);

console.log('\nTile 97 (0x0C20):');
for (const row of decodeTile(97 * 32)) console.log(row);

console.log('\n=== 检查 VRAM 0x2000 和 0x4000 的数据 ===');
console.log('VRAM 0x2000 (前 16 字节):');
for (let i = 0; i < 16; i++) {
  process.stdout.write(vram[0x2000 + i].toString(16).padStart(2, '0') + ' ');
}
console.log('\nVRAM 0x4000 (前 16 字节):');
for (let i = 0; i < 16; i++) {
  process.stdout.write(vram[0x4000 + i].toString(16).padStart(2, '0') + ' ');
}
