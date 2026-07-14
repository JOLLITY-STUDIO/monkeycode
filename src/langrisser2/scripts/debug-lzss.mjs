/**
 * 带调试输出的 LZSS 解压器
 * 跟踪前 64 字节的解压过程
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }
function readLong(o) { return ((rom[o]&0xff)<<24)|((rom[o+1]&0xff)<<16)|((rom[o+2]&0xff)<<8)|(rom[o+3]&0xff); }

// Entry 3
const ptr3 = readLong(0x0B0000 + 3 * 4);
console.log(`Entry 3: ROM 0x${ptr3.toString(16)}`);
console.log(`  类型码: ${readByte(ptr3)}`);
console.log(`  解压大小: ${readWord(ptr3 + 1)}`);

const decompressedSize = readWord(ptr3 + 1);
const compressedDataStart = ptr3 + 3;

const window = new Uint8Array(0x1000).fill(0x20);
let windowPos = 0x0fee;
let remaining = decompressedSize;
const output = new Uint8Array(decompressedSize);
let outputPos = 0;
let compressedPos = compressedDataStart;

// 调试: 跟踪前 64 字节
const DEBUG_LIMIT = 64;
let debugCount = 0;

while (remaining > 0 && debugCount < DEBUG_LIMIT) {
  const flagByte = readByte(compressedPos++);
  if (debugCount < DEBUG_LIMIT) {
    console.log(`\n[flag] ROM 0x${(compressedPos-1).toString(16)} = 0x${flagByte.toString(16).padStart(2,'0')} (${flagByte.toString(2).padStart(8,'0')})`);
  }

  for (let bit = 0; bit < 8 && remaining > 0 && debugCount < DEBUG_LIMIT; bit++) {
    const isLiteral = (flagByte >> bit) & 1;

    if (isLiteral) {
      const byte = readByte(compressedPos++);
      window[windowPos] = byte;
      output[outputPos++] = byte;

      if (debugCount < DEBUG_LIMIT) {
        console.log(`  [lit] bit${bit} ROM 0x${(compressedPos-1).toString(16)} = 0x${byte.toString(16).padStart(2,'0')} → out[${outputPos-1}] (winPos=0x${windowPos.toString(16)}, remain=${remaining-1})`);
      }

      windowPos = (windowPos + 1) & 0xfff;
      remaining--;
      debugCount++;
    } else {
      const b1 = readByte(compressedPos++);
      const b2 = readByte(compressedPos++);
      let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
      const matchLength = (b2 & 0x0f) + 2;

      if (debugCount < DEBUG_LIMIT) {
        console.log(`  [lz7] bit${bit} ROM 0x${(compressedPos-2).toString(16)} b1=0x${b1.toString(16).padStart(2,'0')} b2=0x${b2.toString(16).padStart(2,'0')} → off=0x${matchOffset.toString(16).padStart(3,'0')} len=${matchLength} (winPos=0x${windowPos.toString(16)})`);
      }

      for (let i = 0; i < matchLength && remaining > 0 && debugCount < DEBUG_LIMIT; i++) {
        const byte = window[matchOffset];
        window[windowPos] = byte;
        output[outputPos++] = byte;

        if (debugCount < DEBUG_LIMIT) {
          console.log(`    copy[${i}] win[0x${matchOffset.toString(16)}]=0x${byte.toString(16).padStart(2,'0')} → out[${outputPos-1}] (winPos=0x${windowPos.toString(16)}, remain=${remaining-1})`);
        }

        matchOffset = (matchOffset + 1) & 0xfff; // 注意: 这里用的是原始 matchOffset, 不是循环变量
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
        debugCount++;
      }

      // 如果 matchLength > DEBUG_LIMIT, 跳过剩余的调试输出
      for (let i = Math.min(matchLength, DEBUG_LIMIT); i < matchLength && remaining > 0; i++) {
        const byte = window[matchOffset];
        window[windowPos] = byte;
        output[outputPos++] = byte;
        matchOffset = (matchOffset + 1) & 0xfff;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
        debugCount++;
      }
    }
  }
}

console.log('\n=== 前 64 字节输出 ===');
for (let i = 0; i < 64; i += 16) {
  let hex = '';
  for (let j = 0; j < 16; j++) {
    hex += output[i+j].toString(16).padStart(2,'0') + ' ';
  }
  console.log(`  ${i.toString(16).padStart(2,'0')}: ${hex}`);
}

console.log('\n=== 前 2 个 tile (tile 0, tile 1) ===');
for (let t = 0; t < 2; t++) {
  console.log(`tile ${t}:`);
  for (let y = 0; y < 8; y++) {
    let line = '  ';
    for (let p = 0; p < 4; p++) {
      line += output[t*32 + y*4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }
}

// 也检查窗口状态
console.log('\n=== 窗口状态 (前 32 字节) ===');
let hex = '';
for (let i = 0; i < 32; i++) hex += window[i].toString(16).padStart(2,'0') + ' ';
console.log(`  0x000: ${hex}`);
hex = '';
for (let i = 0; i < 32; i++) hex += window[0xfe0 + i].toString(16).padStart(2,'0') + ' ';
console.log(`  0xfe0: ${hex}`);
