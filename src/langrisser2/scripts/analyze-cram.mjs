/**
 * 找到正确的 CRAM 颜色映射
 * 
 * 截图背景: rgb(0,0,72) (89.93%)
 * 标题文字: rgb(32,0,0), rgb(72,0,0), rgb(104,0,0), rgb(216,0,0)
 * 边框金色: rgb(248,216,0)
 * 底部文字: rgb(248,252,248)
 * 
 * 问题: CRAM word=0x0400 应该产生 rgb(0,0,72)
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM 原始字节 ===');
for (let i = 0; i < 64; i += 8) {
  let line = `  [${i.toString(16).padStart(2,'0')}-${(i+7).toString(16).padStart(2,'0')}]: `;
  for (let j = 0; j < 8; j++) {
    line += cram[i + j].toString(16).padStart(2, '0') + ' ';
  }
  console.log(line);
}

// ============================================================
// 测试不同的 CRAM 解码方式
// ============================================================
console.log('\n=== 测试 CRAM 解码方式 ===');

// 方式1: 标准 little-endian (当前使用)
// word = (cram[i*2+1] << 8) | cram[i*2]
function decodeLE(i) {
  return (cram[i * 2 + 1] << 8) | cram[i * 2];
}

// 方式2: big-endian
function decodeBE(i) {
  return (cram[i * 2] << 8) | cram[i * 2 + 1];
}

// 方式3: 单字节模式 (每字节一个颜色)
function decodeByte(i) {
  return cram[i];
}

// 方式4: 字节交换 + bit重排
// cram[i*2] = bit7-0, cram[i*2+1] = bit15-8
// 但 Genesis CRAM 只有9位有效
function decodeAlt(i) {
  // cram[i*2] = bits 7-0
  // cram[i*2+1] = bits 15-8 (但只有 bit8 有效)
  const lo = cram[i * 2];
  const hi = cram[i * 2 + 1];
  return (hi << 8) | lo;
}

// ============================================================
// 测试 pal2[0] (应该是背景色 rgb(0,0,72))
// ============================================================
console.log('\n=== pal2[0] (调色板2, 颜色0) ===');
const pal2_0_idx = 2 * 16 + 0;
console.log(`CRAM 字节: [${cram[pal2_0_idx * 2]}, ${cram[pal2_0_idx * 2 + 1]}] = [0x${cram[pal2_0_idx * 2].toString(16).padStart(2,'0')}, 0x${cram[pal2_0_idx * 2 + 1].toString(16).padStart(2,'0')}]`);

const wLE = decodeLE(pal2_0_idx);
const wBE = decodeBE(pal2_0_idx);
console.log(`LE word: 0x${wLE.toString(16).padStart(4,'0')}`);
console.log(`BE word: 0x${wBE.toString(16).padStart(4,'0')}`);

// 分析 bit 分布
console.log('\nLE word bit 分析:');
for (let b = 0; b < 16; b++) {
  if (wLE & (1 << b)) console.log(`  bit${b} = 1`);
}
console.log('\nBE word bit 分析:');
for (let b = 0; b < 16; b++) {
  if (wBE & (1 << b)) console.log(`  bit${b} = 1`);
}

// ============================================================
// 测试不同的颜色映射
// ============================================================
console.log('\n=== 颜色映射测试 ===');

function testMapping(name, getRgb) {
  console.log(`\n${name}:`);
  for (let i = 0; i < 16; i++) {
    const idx = 2 * 16 + i;
    const word = decodeLE(idx);
    const { r, g, b } = getRgb(word);
    console.log(`  [${i}] word=0x${word.toString(16).padStart(4,'0')} → rgb(${r},${g},${b})`);
  }
}

// 标准 BGR 9-bit
testMapping('标准 BGR (R=bit2-0, G=bit5-3, B=bit8-6) ×36', (word) => ({
  r: ((word >> 0) & 7) * 36,
  g: ((word >> 3) & 7) * 36,
  b: ((word >> 6) & 7) * 36,
}));

// RGB 9-bit (交换 R 和 B)
testMapping('RGB (R=bit8-6, G=bit5-3, B=bit2-0) ×36', (word) => ({
  r: ((word >> 6) & 7) * 36,
  g: ((word >> 3) & 7) * 36,
  b: ((word >> 0) & 7) * 36,
}));

// 扩展到 12-bit (每通道4位)
testMapping('RGB 12-bit ×17', (word) => ({
  r: ((word >> 8) & 15) * 17,
  g: ((word >> 4) & 15) * 17,
  b: ((word >> 0) & 15) * 17,
}));

// 测试 pal0[0] (背景色可能用的是调色板0)
console.log('\n=== pal0[0] (调色板0, 颜色0) ===');
const pal0_0_idx = 0 * 16 + 0;
console.log(`CRAM 字节: [${cram[pal0_0_idx * 2]}, ${cram[pal0_0_idx * 2 + 1]}] = [0x${cram[pal0_0_idx * 2].toString(16).padStart(2,'0')}, 0x${cram[pal0_0_idx * 2 + 1].toString(16).padStart(2,'0')}]`);
const w0LE = decodeLE(pal0_0_idx);
const w0BE = decodeBE(pal0_0_idx);
console.log(`LE word: 0x${w0LE.toString(16).padStart(4,'0')}`);
console.log(`BE word: 0x${w0BE.toString(16).padStart(4,'0')}`);

// ============================================================
// 关键测试: 找出哪个 CRAM 条目产生 rgb(0,0,72)
// ============================================================
console.log('\n=== 搜索产生 rgb(0,0,72) 的 CRAM 条目 ===');
for (let i = 0; i < 64; i++) {
  const wLE = decodeLE(i);
  const wBE = decodeBE(i);
  
  // 标准 BGR ×36
  const bgrLE = {
    r: ((wLE >> 0) & 7) * 36,
    g: ((wLE >> 3) & 7) * 36,
    b: ((wLE >> 6) & 7) * 36,
  };
  const bgrBE = {
    r: ((wBE >> 0) & 7) * 36,
    g: ((wBE >> 3) & 7) * 36,
    b: ((wBE >> 6) & 7) * 36,
  };
  
  // RGB ×36 (交换)
  const rgbLE = {
    r: ((wLE >> 6) & 7) * 36,
    g: ((wLE >> 3) & 7) * 36,
    b: ((wLE >> 0) & 7) * 36,
  };
  
  if (bgrLE.b === 72 && bgrLE.r === 0 && bgrLE.g === 0) {
    console.log(`  CRAM[${i}] LE word=0x${wLE.toString(16).padStart(4,'0')} → BGR rgb(${bgrLE.r},${bgrLE.g},${bgrLE.b}) 匹配!`);
  }
  if (rgbLE.b === 72 && rgbLE.r === 0 && rgbLE.g === 0) {
    console.log(`  CRAM[${i}] LE word=0x${wLE.toString(16).padStart(4,'0')} → RGB rgb(${rgbLE.r},${rgbLE.g},${rgbLE.b}) 匹配!`);
  }
  if (bgrBE.b === 72 && bgrBE.r === 0 && bgrBE.g === 0) {
    console.log(`  CRAM[${i}] BE word=0x${wBE.toString(16).padStart(4,'0')} → BGR rgb(${bgrBE.r},${bgrBE.g},${bgrBE.b}) 匹配!`);
  }
}

// ============================================================
// 搜索产生红色的 CRAM 条目
// ============================================================
console.log('\n=== 搜索产生红色的 CRAM 条目 (r>0, g=0, b=0) ===');
for (let i = 0; i < 64; i++) {
  const wLE = decodeLE(i);
  const wBE = decodeBE(i);
  
  const bgrLE = {
    r: ((wLE >> 0) & 7) * 36,
    g: ((wLE >> 3) & 7) * 36,
    b: ((wLE >> 6) & 7) * 36,
  };
  
  if (bgrLE.r > 0 && bgrLE.g === 0 && bgrLE.b === 0) {
    console.log(`  CRAM[${i}] LE word=0x${wLE.toString(16).padStart(4,'0')} → rgb(${bgrLE.r},${bgrLE.g},${bgrLE.b})`);
  }
}
