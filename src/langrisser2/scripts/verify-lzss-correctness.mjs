/**
 * 验证 LZSS 解压器正确性
 * 用 Entry 0 (0x8001, → VRAM 0x0000) 对比
 * Entry 0 解压大小 1568 字节 = 49 tiles
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
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readLong(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

// LZSS 解压
function decompressLZSS(resourceAddr) {
  const headerAddr = resourceAddr + 1;
  const decompressedSize = readWord(headerAddr);
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
  return { data: output, size: decompressedSize };
}

// 检查所有资源与 VRAM 的匹配
console.log('=== 检查多个资源与 VRAM 的匹配 ===');

// 检查 Entry 0 (→ VRAM 0x0000)
const ptr0 = readLong(0x0B0000 + 0 * 4);
const res0 = decompressLZSS(ptr0);
let match0 = 0;
for (let i = 0; i < res0.size; i++) {
  if (res0.data[i] === vram[i]) match0++;
}
console.log(`Entry 0 (→VRAM 0x0000): ${match0}/${res0.size} (${(match0/res0.size*100).toFixed(1)}%)`);

// 显示 Entry 0 第一个非空 tile
let firstNonEmpty0 = -1;
for (let t = 0; t < 49; t++) {
  for (let i = 0; i < 32; i++) {
    if (res0.data[t * 32 + i] !== 0) { firstNonEmpty0 = t; break; }
  }
  if (firstNonEmpty0 >= 0) break;
}
console.log(`Entry 0 第一个非空 tile: ${firstNonEmpty0}`);
if (firstNonEmpty0 >= 0) {
  console.log(`  解压 tile ${firstNonEmpty0}:`);
  for (let y = 0; y < 8; y++) {
    let line = '    ';
    for (let p = 0; p < 4; p++) {
      line += res0.data[firstNonEmpty0*32 + y*4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }
  console.log(`  VRAM tile ${firstNonEmpty0}:`);
  for (let y = 0; y < 8; y++) {
    let line = '    ';
    for (let p = 0; p < 4; p++) {
      line += vram[firstNonEmpty0*32 + y*4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }
}

// 尝试所有 LZSS 资源，找到与 VRAM 0x0000 匹配的
console.log('\n=== 搜索 VRAM 0x0000 的匹配资源 ===');
let bestMatch = { id: -1, match: 0, size: 0 };
for (let id = 0; id < 256; id++) {
  const ptr = readLong(0x0B0000 + id * 4);
  const type = readByte(ptr);
  if (type !== 3) continue; // 只检查 LZSS

  try {
    const res = decompressLZSS(ptr);
    if (res.size > 0 && res.size <= 0x10000) {
      let match = 0;
      const checkSize = Math.min(res.size, 0x10000);
      for (let i = 0; i < checkSize; i++) {
        if (res.data[i] === vram[i]) match++;
      }
      const rate = match / checkSize;
      if (rate > 0.3) {
        console.log(`  Entry ${id}: ${match}/${checkSize} (${(rate*100).toFixed(1)}%)`);
      }
      if (match > bestMatch.match) {
        bestMatch = { id, match, size: res.size };
      }
    }
  } catch (e) {
    // 忽略错误
  }
}
console.log(`\n最佳匹配: Entry ${bestMatch.id}, ${bestMatch.match}/${bestMatch.size} (${(bestMatch.match/bestMatch.size*100).toFixed(1)}%)`);

// 也搜索 VRAM 0x2000 和 0x4000
console.log('\n=== 搜索 VRAM 0x2000 的匹配资源 ===');
bestMatch = { id: -1, match: 0, size: 0 };
for (let id = 0; id < 256; id++) {
  const ptr = readLong(0x0B0000 + id * 4);
  const type = readByte(ptr);
  if (type !== 3) continue;

  try {
    const res = decompressLZSS(ptr);
    if (res.size > 0 && res.size <= 0x10000) {
      let match = 0;
      const checkSize = Math.min(res.size, 0x10000);
      for (let i = 0; i < checkSize; i++) {
        if (res.data[i] === vram[0x2000 + i]) match++;
      }
      const rate = match / checkSize;
      if (rate > 0.3) {
        console.log(`  Entry ${id}: ${match}/${checkSize} (${(rate*100).toFixed(1)}%)`);
      }
      if (match > bestMatch.match) {
        bestMatch = { id, match, size: res.size };
      }
    }
  } catch (e) {}
}
console.log(`最佳匹配: Entry ${bestMatch.id}, ${bestMatch.match}/${bestMatch.size} (${(bestMatch.match/bestMatch.size*100).toFixed(1)}%)`);

console.log('\n=== 搜索 VRAM 0x4000 的匹配资源 ===');
bestMatch = { id: -1, match: 0, size: 0 };
for (let id = 0; id < 256; id++) {
  const ptr = readLong(0x0B0000 + id * 4);
  const type = readByte(ptr);
  if (type !== 3) continue;

  try {
    const res = decompressLZSS(ptr);
    if (res.size > 0 && res.size <= 0x10000) {
      let match = 0;
      const checkSize = Math.min(res.size, 0x10000);
      for (let i = 0; i < checkSize; i++) {
        if (res.data[i] === vram[0x4000 + i]) match++;
      }
      const rate = match / checkSize;
      if (rate > 0.3) {
        console.log(`  Entry ${id}: ${match}/${checkSize} (${(rate*100).toFixed(1)}%)`);
      }
      if (match > bestMatch.match) {
        bestMatch = { id, match, size: res.size };
      }
    }
  } catch (e) {}
}
console.log(`最佳匹配: Entry ${bestMatch.id}, ${bestMatch.match}/${bestMatch.size} (${(bestMatch.match/bestMatch.size*100).toFixed(1)}%)`);

// 检查 Type 2 资源
console.log('\n=== 搜索 Type 2 资源与 VRAM 0x2000 匹配 ===');
for (let id = 0; id < 256; id++) {
  const ptr = readLong(0x0B0000 + id * 4);
  const type = readByte(ptr);
  if (type !== 2) continue;

  // Type 2 格式: byte[0]=type, byte[1]=planes, byte[2-9]=lookup, byte[10-11]=size
  const planes = readByte(ptr + 1) & 0x7f;
  const ctrlSize = readWord(ptr + 10);
  const totalSize = planes * 0x20 * (ctrlSize + 1); // 估算

  if (totalSize > 0 && totalSize <= 0x10000) {
    // 简单检查: 解压后的数据应该在 VRAM 0x2000 中
    // 这里只是记录 Type 2 资源的信息
    if (id < 20 || (id > 220 && id < 240)) {
      console.log(`  Entry ${id}: planes=${planes}, ctrlSize=${ctrlSize}, estSize=${totalSize}`);
    }
  }
}
