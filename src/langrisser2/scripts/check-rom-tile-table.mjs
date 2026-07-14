/**
 * 检查 ROM 0x080674 和 0x080328 的原始数据格式
 * 理解 tile data 表的实际结构
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = fs.readFileSync(ROM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

function readWord(o) { return ((rom[o] & 0xff) << 8) | (rom[o+1] & 0xff); }

console.log('=== ROM 0x080674 前 128 字节 (hex dump) ===');
for (let row = 0; row < 8; row++) {
  let hex = '';
  let ascii = '';
  for (let col = 0; col < 16; col++) {
    const b = rom[0x080674 + row * 16 + col];
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
  }
  console.log(`0x${(0x080674 + row * 16).toString(16)}: ${hex} ${ascii}`);
}

console.log('\n=== ROM 0x080328 前 128 字节 ===');
for (let row = 0; row < 8; row++) {
  let hex = '';
  let ascii = '';
  for (let col = 0; col < 16; col++) {
    const b = rom[0x080328 + row * 16 + col];
    hex += b.toString(16).padStart(2, '0') + ' ';
    ascii += (b >= 32 && b < 127) ? String.fromCharCode(b) : '.';
  }
  console.log(`0x${(0x080328 + row * 16).toString(16)}: ${hex} ${ascii}`);
}

// 检查 loc_009FFE 的条件判断
// cmpi.w #$A49C,($00000B).w
// 这可能是检查 RAM 0xFFFF000B 处的 word
// 或者是检查某个其他地址
console.log('\n=== 检查 loc_009FFE 条件 ===');
// 读取 ROM 0xA002 处的机器码
console.log('ROM 0xA002 机器码:');
for (let i = 0; i < 20; i++) {
  console.log(`  0x${(0xA002 + i).toString(16)}: 0x${rom[0xA002 + i].toString(16).padStart(2, '0')}`);
}

// 重新理解: 可能是比较 RAM 0xFFFF000B
// 在 Genesis 中, 绝对短地址 0x000B 会被零扩展到 0x0000000B
// 但这不合理, 因为 0x0B 是异常向量表

// 另一种可能: 这是 (An, d8) 寻址模式的反汇编错误
// 或者: 这是检查某个 RAM 变量

// 让我检查 RAM dump 中 0xFFFF000B 的值
const ram = fs.readFileSync(path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-ram-dump.ram'));
console.log(`\nRAM 0xFFFF000B = 0x${ram[0x0B].toString(16).padStart(2, '0')}`);
console.log(`RAM 0xFFFF000C = 0x${ram[0x0C].toString(16).padStart(2, '0')}`);

// 检查 VRAM 0x2000 tile 0 的数据
console.log('\n=== VRAM 0x2000 tile 0 (空 tile) ===');
let allZero = true;
for (let i = 0; i < 32; i++) {
  if (vram[0x2000 + i] !== 0) { allZero = false; break; }
}
console.log(`全零: ${allZero}`);

// 在 ROM 中搜索 VRAM 0x2000 tile 1 的完整 32 字节
console.log('\n=== 搜索 VRAM tile 1 数据 ===');
const tile1Data = Array.from(vram.slice(0x2020, 0x2040));
console.log(`tile 1: ${tile1Data.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);

let found = 0;
for (let i = 0; i < rom.length - 32 && found < 3; i++) {
  let match = true;
  for (let j = 0; j < 32; j++) {
    if (rom[i + j] !== tile1Data[j]) { match = false; break; }
  }
  if (match) {
    console.log(`完整匹配 ROM 0x${i.toString(16)}`);
    found++;
  }
}

// 搜索前 8 字节 (tile 1 第 1-2 行: cc fc fc cc c1 0d 11 11)
console.log('\n搜索 tile 1 第 5-6 行 (cc fc fc cc...):');
const searchBytes = [0xcc, 0xfc, 0xfc, 0xcc, 0xc1, 0x0d, 0x11, 0x11];
found = 0;
for (let i = 0; i < rom.length - 8 && found < 5; i++) {
  let match = true;
  for (let j = 0; j < 8; j++) {
    if (rom[i + j] !== searchBytes[j]) { match = false; break; }
  }
  if (match) {
    console.log(`  ROM 0x${i.toString(16)}`);
    found++;
  }
}
if (found === 0) console.log('  未找到');

// 也搜索 4 字节
console.log('\n搜索 4 字节 (cc fc fc cc):');
const search4 = [0xcc, 0xfc, 0xfc, 0xcc];
found = 0;
for (let i = 0; i < rom.length - 4 && found < 10; i++) {
  let match = true;
  for (let j = 0; j < 4; j++) {
    if (rom[i + j] !== search4[j]) { match = false; break; }
  }
  if (match) {
    console.log(`  ROM 0x${i.toString(16)}`);
    found++;
  }
}
if (found === 0) console.log('  未找到');

// 也许 tile data 是 byte-swapped (word 方式存储)
console.log('\n搜索 tile 1 (byte-swap):');
const tile1Swap = [];
for (let i = 0; i < 32; i += 2) {
  tile1Swap.push(tile1Data[i+1], tile1Data[i]);
}
console.log(`tile 1 (swap): ${tile1Swap.map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
found = 0;
for (let i = 0; i < rom.length - 32 && found < 3; i++) {
  let match = true;
  for (let j = 0; j < 32; j++) {
    if (rom[i + j] !== tile1Swap[j]) { match = false; break; }
  }
  if (match) {
    console.log(`  byte-swap 匹配 ROM 0x${i.toString(16)}`);
    found++;
  }
}
if (found === 0) console.log('  未找到');
