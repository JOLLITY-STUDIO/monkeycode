/**
 * 根据 ROM 布局数据 + 重映射表生成标题画面 nametable
 * 
 * 逻辑:
 * 1. 从 ROM 读取布局数据 (0x6EC28=底层, 0x6F0A8=高层)
 * 2. 从 ROM 读取重映射表 (0x6AE28=底层, 0x6AF28=高层)
 * 3. 每个布局 word: 如果最高位=0, 使用表A; 如果最高位=1, 使用表B
 * 4. 转换后的 byte 值 + 256*层号 = 最终 tile 索引
 * 5. 生成 Plane A/B 的 nametable
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = fs.readFileSync(ROM_PATH);

function readByte(o) { return rom[o] & 0xff; }
function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o + 1] & 0xff); }
function readLong(o) { return ((rom[o] & 0xff) << 24) | ((rom[o + 1] & 0xff) << 16) | ((rom[o + 2] & 0xff) << 8) | (rom[o + 3] & 0xff); }

const NT_WIDTH = 64;
const NT_HEIGHT = 32;
const NT_SIZE = NT_WIDTH * NT_HEIGHT;

console.log('=== 读取布局数据 ===');
const layoutBase = 0x6EC28;
const layoutBase2 = 0x6F0A8;
console.log(`底层布局: 0x${layoutBase.toString(16)}`);
console.log(`高层布局: 0x${layoutBase2.toString(16)}`);

console.log('\n=== 读取重映射表 ===');
const remapBase = 0x6AE28;
const remapBase2 = 0x6AF28;
console.log(`底层重映射表: 0x${remapBase.toString(16)}`);
console.log(`高层重映射表: 0x${remapBase2.toString(16)}`);

const remapTableA = new Uint8Array(256);
const remapTableB = new Uint8Array(256);
for (let i = 0; i < 256; i++) {
  remapTableA[i] = readByte(remapBase + i);
  remapTableB[i] = readByte(remapBase2 + i);
}

console.log('\n=== 解析布局数据生成 nametable ===');
console.log('布局数据格式: 每 word 是一个布局值');
console.log('最高位决定使用哪个重映射表');

const planeANametable = new Uint16Array(NT_SIZE).fill(0);
const planeBNametable = new Uint16Array(NT_SIZE).fill(0);

const LAYOUT_WIDTH = 64;
const LAYOUT_HEIGHT = 32;

for (let y = 0; y < LAYOUT_HEIGHT; y++) {
  for (let x = 0; x < LAYOUT_WIDTH; x++) {
    const idx = y * LAYOUT_WIDTH + x;
    const layoutOff = layoutBase + idx * 2;
    const layoutOff2 = layoutBase2 + idx * 2;
    
    if (layoutOff + 1 >= rom.length || layoutOff2 + 1 >= rom.length) {
      continue;
    }
    
    const layoutVal = readWord(layoutOff);
    const layoutVal2 = readWord(layoutOff2);
    
    if (layoutVal !== 0) {
      const useTableB = (layoutVal & 0x8000) !== 0;
      const lookupIdx = (layoutVal << 1) & 0xFF;
      let tileIdx;
      
      if (useTableB) {
        tileIdx = remapTableB[lookupIdx];
      } else {
        tileIdx = remapTableA[lookupIdx];
      }
      
      if (tileIdx !== 0) {
        planeANametable[idx] = tileIdx;
      }
    }
    
    if (layoutVal2 !== 0) {
      const useTableB = (layoutVal2 & 0x8000) !== 0;
      const lookupIdx = (layoutVal2 << 1) & 0xFF;
      let tileIdx;
      
      if (useTableB) {
        tileIdx = remapTableB[lookupIdx];
      } else {
        tileIdx = remapTableA[lookupIdx];
      }
      
      if (tileIdx !== 0) {
        planeBNametable[idx] = tileIdx;
      }
    }
  }
}

console.log('\n=== Plane A Nametable 可视化 ===');
for (let y = 0; y < 28; y++) {
  let line = '';
  for (let x = 0; x < 40; x++) {
    const idx = y * NT_WIDTH + x;
    const tile = planeANametable[idx];
    if (tile === 0) {
      line += '.';
    } else {
      line += String.fromCharCode(65 + (tile - 1) % 26);
    }
  }
  console.log(line);
}

console.log('\n=== Plane B Nametable 可视化 ===');
for (let y = 0; y < 28; y++) {
  let line = '';
  for (let x = 0; x < 40; x++) {
    const idx = y * NT_WIDTH + x;
    const tile = planeBNametable[idx];
    if (tile === 0) {
      line += '.';
    } else {
      line += String.fromCharCode(65 + (tile - 1) % 26);
    }
  }
  console.log(line);
}

console.log('\n=== 统计 ===');
const aNonZero = planeANametable.filter(t => t !== 0).length;
const bNonZero = planeBNametable.filter(t => t !== 0).length;
console.log(`Plane A 非空条目: ${aNonZero}/${NT_SIZE}`);
console.log(`Plane B 非空条目: ${bNonZero}/${NT_SIZE}`);
