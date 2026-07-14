/**
 * 分析 ROM 0x05DF40 区域的标题画面参数
 * 来源: execution-trace.md "标题画面任务链"
 *   FUN_0000c93a: LEA 0x05DF40 → DAT_ffff95a2 (标题画面参数指针)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROM_PATH = path.join(__dirname, '..', '20260713', 'Langrisser II (Japan) (v1.2-gens-rom-dump_68K.bin');

const rom = fs.readFileSync(ROM_PATH);

function readByte(off) { return rom[off] & 0xff; }
function readWord(off) { return ((rom[off] & 0xff) << 8) | (rom[off + 1] & 0xff); }
function readLong(off) {
  return ((rom[off] & 0xff) << 24) | ((rom[off + 1] & 0xff) << 16) |
         ((rom[off + 2] & 0xff) << 8) | (rom[off + 3] & 0xff);
}

// 分析 0x05DF00 - 0x05E000 区域
const start = 0x05DF00;
const end = 0x05E000;

console.log('=== ROM 0x05DF00 - 0x05E000 区域分析 ===\n');

// 先看 0x05DF40 开始的数据
console.log('0x05DF40 开始的原始数据 (hex dump):');
for (let i = 0; i < 128; i += 16) {
  const addr = 0x05DF40 + i;
  let hex = '';
  let ascii = '';
  for (let j = 0; j < 16; j++) {
    const b = readByte(addr + j);
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
  }
  console.log(`  0x${addr.toString(16).padStart(6, '0')}: ${hex} ${ascii}`);
}

// 尝试解析为结构化数据
console.log('\n=== 尝试解析为参数结构 ===\n');

// 可能的结构: 显示层配置 (plane 地址, 资源 ID, 调色板等)
const base = 0x05DF40;

// 读取前 64 字节作为 word/dword 数组
console.log('Word 数组 (16-bit big-endian):');
for (let i = 0; i < 64; i += 2) {
  const w = readWord(base + i);
  console.log(`  +0x${i.toString(16).padStart(2, '0')}: 0x${w.toString(16).padStart(4, '0')} (${w})`);
}

console.log('\nLong 数组 (32-bit big-endian):');
for (let i = 0; i < 64; i += 4) {
  const l = readLong(base + i);
  console.log(`  +0x${i.toString(16).padStart(2, '0')}: 0x${l.toString(16).padStart(8, '0')}`);
}

// 搜索资源 ID 模式 (0x8xxx)
console.log('\n=== 搜索资源 ID (0x8xxx 模式) ===\n');
for (let i = 0; i < 256; i += 2) {
  const w = readWord(base + i);
  if ((w & 0x8000) !== 0 && w !== 0xffff) {
    console.log(`  +0x${i.toString(16).padStart(2, '0')}: 0x${w.toString(16)} - 可能是资源 ID`);
  }
}

// 搜索可能的 ROM 指针 (>0xB0000)
console.log('\n=== 搜索可能的 ROM 指针 (>0xB0000) ===\n');
for (let i = 0; i < 256; i += 4) {
  const l = readLong(base + i);
  if (l >= 0x000B0000 && l < 0x00200000) {
    console.log(`  +0x${i.toString(16).padStart(2, '0')}: 0x${l.toString(16).padStart(8, '0')} - 可能是 ROM 指针`);
  }
}

// 看看 FUN_0000c93a 附近的代码
console.log('\n=== FUN_0000c93a 附近代码分析 ===\n');
const codeStart = 0x0000c930;
for (let i = 0; i < 80; i += 2) {
  const addr = codeStart + i;
  const w = readWord(addr);
  console.log(`  0x${addr.toString(16).padStart(6, '0')}: ${w.toString(16).padStart(4, '0')}`);
}
