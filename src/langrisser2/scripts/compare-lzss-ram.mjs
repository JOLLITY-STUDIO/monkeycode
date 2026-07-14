/**
 * 对比 LZSS 解压结果与 RAM dump 中的实际数据
 * RAM 0xFF1000 是解压缓冲区，应该包含最后一次解压的资源
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const RAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-ram-dump.ram');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const ram = fs.readFileSync(RAM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

function readByteRom(o) { return rom[o] & 0xff; }
function readWordRom(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readLongRom(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

console.log('=== 文件信息 ===');
console.log(`ROM: ${rom.length} 字节`);
console.log(`RAM: ${ram.length} 字节 (期望 65536)`);
console.log(`VRAM: ${vram.length} 字节`);

// RAM dump 文件偏移 = RAM地址 - 0xFF0000
// RAM 0xFF1000 → 文件偏移 0x1000
const RAM_DECOMPRESS_OFFSET = 0x1000;

// LZSS 解压 (与 resource.ts 一致)
function decompressLZSS(resourceAddr) {
  const headerAddr = resourceAddr + 1;
  const decompressedSize = readWordRom(headerAddr);
  const compressedDataStart = resourceAddr + 3;
  
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;
  
  while (remaining > 0) {
    const flagByte = readByteRom(compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = readByteRom(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = readByteRom(compressedPos++);
        const b2 = readByteRom(compressedPos++);
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

// Entry 3 (→ VRAM 0x2000) 和 Entry 8 (→ VRAM 0x4000)
const ptr3 = readLongRom(0x0B0000 + 3 * 4);
const ptr8 = readLongRom(0x0B0000 + 8 * 4);
const res3 = decompressLZSS(ptr3);
const res8 = decompressLZSS(ptr8);

console.log('\n=== Entry 3 (→ VRAM 0x2000) ===');
console.log(`解压大小: ${res3.size}B`);

// 对比 RAM 0xFF1000
let ramMatch3 = 0;
for (let i = 0; i < res3.size; i++) {
  if (res3.data[i] === ram[RAM_DECOMPRESS_OFFSET + i]) ramMatch3++;
}
console.log(`vs RAM 0xFF1000: ${ramMatch3}/${res3.size} (${(ramMatch3/res3.size*100).toFixed(1)}%)`);

// 对比 VRAM 0x2000
let vramMatch3 = 0;
for (let i = 0; i < res3.size; i++) {
  if (res3.data[i] === vram[0x2000 + i]) vramMatch3++;
}
console.log(`vs VRAM 0x2000: ${vramMatch3}/${res3.size} (${(vramMatch3/res3.size*100).toFixed(1)}%)`);

console.log('\n=== Entry 8 (→ VRAM 0x4000) ===');
console.log(`解压大小: ${res8.size}B`);

// 对比 RAM 0xFF1000
let ramMatch8 = 0;
for (let i = 0; i < res8.size; i++) {
  if (res8.data[i] === ram[RAM_DECOMPRESS_OFFSET + i]) ramMatch8++;
}
console.log(`vs RAM 0xFF1000: ${ramMatch8}/${res8.size} (${(ramMatch8/res8.size*100).toFixed(1)}%)`);

// 对比 VRAM 0x4000
let vramMatch8 = 0;
for (let i = 0; i < res8.size; i++) {
  if (res8.data[i] === vram[0x4000 + i]) vramMatch8++;
}
console.log(`vs VRAM 0x4000: ${vramMatch8}/${res8.size} (${(vramMatch8/res8.size*100).toFixed(1)}%)`);

// 检查 RAM 0xFF1000 实际内容
console.log('\n=== RAM 0xFF1000 前 64 字节 ===');
let hex = '';
for (let i = 0; i < 64; i++) hex += ram[RAM_DECOMPRESS_OFFSET + i].toString(16).padStart(2,'0') + ' ';
console.log(hex);

// 检查 RAM 0xFF1000 与 VRAM 0x2000 / 0x4000 的匹配
console.log('\n=== RAM 0xFF1000 vs VRAM ===');
let ramVram2000 = 0;
for (let i = 0; i < 8192; i++) {
  if (ram[RAM_DECOMPRESS_OFFSET + i] === vram[0x2000 + i]) ramVram2000++;
}
console.log(`RAM 0xFF1000 vs VRAM 0x2000: ${ramVram2000}/8192 (${(ramVram2000/8192*100).toFixed(1)}%)`);

let ramVram4000 = 0;
for (let i = 0; i < 8192; i++) {
  if (ram[RAM_DECOMPRESS_OFFSET + i] === vram[0x4000 + i]) ramVram4000++;
}
console.log(`RAM 0xFF1000 vs VRAM 0x4000: ${ramVram4000}/8192 (${(ramVram4000/8192*100).toFixed(1)}%)`);

// 检查 RAM dump 中是否有非零区域
console.log('\n=== RAM dump 非零区域扫描 ===');
let nonZeroStart = -1, nonZeroEnd = -1;
for (let i = 0; i < ram.length; i++) {
  if (ram[i] !== 0) {
    if (nonZeroStart === -1) nonZeroStart = i;
    nonZeroEnd = i;
  }
}
console.log(`非零范围: 0x${nonZeroStart.toString(16)} - 0x${nonZeroEnd.toString(16)}`);
console.log(`(RAM 地址: 0xFF${nonZeroStart.toString(16).padStart(4,'0')} - 0xFF${nonZeroEnd.toString(16).padStart(4,'0')})`);

// 在 RAM dump 中搜索 Entry 3 解压数据的特征
console.log('\n=== 在 RAM 中搜索 Entry 3 解压数据 ===');
// Entry 3 tile 1 的第一行: f0 00 00 0f
const searchPattern = [0xf0, 0x00, 0x00, 0x0f];
let foundAt = -1;
for (let i = 0; i < ram.length - searchPattern.length; i++) {
  let match = true;
  for (let j = 0; j < searchPattern.length; j++) {
    if (ram[i + j] !== searchPattern[j]) { match = false; break; }
  }
  if (match) { foundAt = i; break; }
}
if (foundAt >= 0) {
  console.log(`找到 Entry 3 数据在 RAM 文件偏移 0x${foundAt.toString(16)}`);
  console.log(`(RAM 地址 0xFF${foundAt.toString(16).padStart(4,'0')})`);
} else {
  console.log('未找到 Entry 3 特征数据');
}

// 搜索 Entry 8 的特征
console.log('\n=== 在 RAM 中搜索 Entry 8 解压数据 ===');
// 找 Entry 8 的第一个非空 tile
let entry8FirstNonEmpty = -1;
for (let t = 0; t < 256; t++) {
  let isEmpty = true;
  for (let i = 0; i < 32; i++) {
    if (res8.data[t * 32 + i] !== 0) { isEmpty = false; break; }
  }
  if (!isEmpty) { entry8FirstNonEmpty = t; break; }
}
if (entry8FirstNonEmpty >= 0) {
  const pattern = Array.from(res8.data.slice(entry8FirstNonEmpty * 32, entry8FirstNonEmpty * 32 + 8));
  console.log(`Entry 8 第一个非空 tile ${entry8FirstNonEmpty}, 前 8 字节: ${pattern.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
  let found8 = -1;
  for (let i = 0; i < ram.length - pattern.length; i++) {
    let match = true;
    for (let j = 0; j < pattern.length; j++) {
      if (ram[i + j] !== pattern[j]) { match = false; break; }
    }
    if (match) { found8 = i; break; }
  }
  if (found8 >= 0) {
    console.log(`找到 Entry 8 数据在 RAM 文件偏移 0x${found8.toString(16)}`);
    console.log(`(RAM 地址 0xFF${found8.toString(16).padStart(4,'0')})`);
  } else {
    console.log('未找到 Entry 8 特征数据');
  }
}
