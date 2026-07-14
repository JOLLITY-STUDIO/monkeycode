/**
 * 检查 RAM dump 的游戏状态
 * 确认是否为标题画面状态
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_68K-gens-ram-dump.ram');
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const ram = fs.readFileSync(RAM_PATH);
const vram = fs.readFileSync(VRAM_PATH);

// RAM 文件偏移 = RAM地址 - 0xFF0000
function ramOffset(addr) { return addr & 0xffff; } // 低 16 位

console.log('=== RAM 游戏状态检查 ===');

// 场景索引 (0xFFFFA49C)
const scenarioIndex = (ram[ramOffset(0xFFFFA49C)] << 8) | ram[ramOffset(0xFFFFA49D)];
console.log(`场景索引 (0xFFFFA49C): ${scenarioIndex} (期望 1 = 标题)`);

// 场景子索引 (0xFFFFA49E)
const subIndex = (ram[ramOffset(0xFFFFA49E)] << 8) | ram[ramOffset(0xFFFFA49F)];
console.log(`场景子索引 (0xFFFFA49E): ${subIndex}`);

// 帧计数器 (0xFFFF815C)
const frameCounter = (ram[ramOffset(0xFFFF815D)] << 8) | ram[ramOffset(0xFFFF815C)];
console.log(`帧计数器 (0xFFFF815C): ${frameCounter}`);

// 场景激活标志 (0xFFFF95AE)
const scenarioActive = ram[ramOffset(0xFFFF95AE)];
console.log(`场景激活 (0xFFFF95AE): ${scenarioActive}`);

// 任务函数指针 (0xFFFF8004)
const taskFuncPtr = (ram[ramOffset(0xFFFF8004)] << 24) |
                    (ram[ramOffset(0xFFFF8005)] << 16) |
                    (ram[ramOffset(0xFFFF8006)] << 8) |
                    ram[ramOffset(0xFFFF8007)];
console.log(`任务函数指针 (0xFFFF8004): 0x${taskFuncPtr.toString(16)}`);

// DMA 队列指针 (0xFFFF81C4)
const dmaQueuePtr = (ram[ramOffset(0xFFFF81C4)] << 24) |
                    (ram[ramOffset(0xFFFF81C5)] << 16) |
                    (ram[ramOffset(0xFFFF81C6)] << 8) |
                    ram[ramOffset(0xFFFF81C7)];
console.log(`DMA 队列指针 (0xFFFF81C4): 0x${dmaQueuePtr.toString(16)}`);

// 检查 RAM 0xFF1000 (解压缓冲区) 的内容
console.log('\n=== RAM 0xFF1000 解压缓冲区 ===');
let nonZeroCount = 0;
let firstNonZero = -1;
for (let i = 0; i < 0x10000; i++) {
  if (ram[0x1000 + i] !== 0) {
    nonZeroCount++;
    if (firstNonZero === -1) firstNonZero = i;
  }
}
console.log(`非零字节数: ${nonZeroCount}`);
console.log(`第一个非零偏移: 0x${firstNonZero.toString(16)} (RAM 0xFF${(0x1000 + firstNonZero).toString(16)})`);

// 显示前 64 字节
let hex = '';
for (let i = 0; i < 64; i++) hex += ram[0x1000 + i].toString(16).padStart(2,'0') + ' ';
console.log(`前 64 字节: ${hex}`);

// 显示第一个非零区域
if (firstNonZero >= 0) {
  hex = '';
  for (let i = 0; i < 64; i++) hex += ram[0x1000 + firstNonZero + i].toString(16).padStart(2,'0') + ' ';
  console.log(`非零起 64 字节: ${hex}`);
}

// 检查 VRAM 0x2000 区域的 tile 分布
console.log('\n=== VRAM 0x2000-0x3FFF tile 分布 ===');
let nonEmptyTiles2000 = [];
for (let t = 0; t < 256; t++) {
  let isEmpty = true;
  for (let i = 0; i < 32; i++) {
    if (vram[0x2000 + t * 32 + i] !== 0) { isEmpty = false; break; }
  }
  if (!isEmpty) nonEmptyTiles2000.push(t);
}
console.log(`非空 tile 数: ${nonEmptyTiles2000.length}`);
if (nonEmptyTiles2000.length > 0) {
  console.log(`前 10 个: ${nonEmptyTiles2000.slice(0, 10).join(', ')}`);
  console.log(`后 10 个: ${nonEmptyTiles2000.slice(-10).join(', ')}`);
}

// 检查 VRAM 0x4000 区域
console.log('\n=== VRAM 0x4000-0x5FFF tile 分布 ===');
let nonEmptyTiles4000 = [];
for (let t = 0; t < 256; t++) {
  let isEmpty = true;
  for (let i = 0; i < 32; i++) {
    if (vram[0x4000 + t * 32 + i] !== 0) { isEmpty = false; break; }
  }
  if (!isEmpty) nonEmptyTiles4000.push(t);
}
console.log(`非空 tile 数: ${nonEmptyTiles4000.length}`);
if (nonEmptyTiles4000.length > 0) {
  console.log(`前 10 个: ${nonEmptyTiles4000.slice(0, 10).join(', ')}`);
  console.log(`后 10 个: ${nonEmptyTiles4000.slice(-10).join(', ')}`);
}

// 检查 VRAM 0x0000 区域 (font/tiles)
console.log('\n=== VRAM 0x0000-0x1FFF tile 分布 ===');
let nonEmptyTiles0000 = [];
for (let t = 0; t < 256; t++) {
  let isEmpty = true;
  for (let i = 0; i < 32; i++) {
    if (vram[t * 32 + i] !== 0) { isEmpty = false; break; }
  }
  if (!isEmpty) nonEmptyTiles0000.push(t);
}
console.log(`非空 tile 数: ${nonEmptyTiles0000.length}`);
if (nonEmptyTiles0000.length > 0) {
  console.log(`前 10 个: ${nonEmptyTiles0000.slice(0, 10).join(', ')}`);
}

// 显示 VRAM 0x2000 第一个非空 tile
if (nonEmptyTiles2000.length > 0) {
  const t = nonEmptyTiles2000[0];
  console.log(`\nVRAM 0x2000 第一个非空 tile ${t}:`);
  for (let y = 0; y < 8; y++) {
    let line = '  ';
    for (let p = 0; p < 4; p++) {
      line += vram[0x2000 + t * 32 + y * 4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }
}

// 显示 VRAM 0x4000 第一个非空 tile
if (nonEmptyTiles4000.length > 0) {
  const t = nonEmptyTiles4000[0];
  console.log(`\nVRAM 0x4000 第一个非空 tile ${t}:`);
  for (let y = 0; y < 8; y++) {
    let line = '  ';
    for (let p = 0; p < 4; p++) {
      line += vram[0x4000 + t * 32 + y * 4 + p].toString(16).padStart(2,'0') + ' ';
    }
    console.log(line);
  }
}
