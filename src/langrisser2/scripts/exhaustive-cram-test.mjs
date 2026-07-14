/**
 * 重新分析 Gens CRAM dump 格式
 * 
 * 关键发现:
 *   - Genesis CRAM 每个颜色占用16位内存位置
 *   - 实际只用9位 (BGR各3位)
 *   - Gens 的 dump 格式可能是: { 7位填充 | B2 B1 B0 G2 G1 G0 R2 R1 }
 *     其中 R0 在另一个字节
 * 
 * 截图背景: rgb(0,0,72)
 * 72 = 2 × 36, 所以 B=2
 * BGR 9-bit: B=2, G=0, R=0 = 010 000 000
 * 
 * CRAM[0] 字节: [0x00, 0x04] = [00000000, 00000100]
 * 
 * 如果格式是: cram[i*2] = B2 B1 B0 G2 G1 G0 R2 R1
 *            cram[i*2+1] = R0 + 7位填充
 * 
 * cram[0] = 0x00 = 00000000 = B2=0 B1=0 B0=0 G2=0 G1=0 G0=0 R2=0 R1=0
 * cram[1] = 0x04 = 00000100 = R0=0 (bit0)
 * 
 * 结果: B=0, G=0, R=0 → rgb(0,0,0) ✗
 * 
 * 但如果格式是: cram[i*2] = R2 R1 R0 G2 G1 G0 B2 B1
 *               cram[i*2+1] = B0 + 7位填充
 * 
 * cram[0] = 0x00 = 00000000 = R2=0 R1=0 R0=0 G2=0 G1=0 G0=0 B2=0 B1=0
 * cram[1] = 0x04 = 00000100 = B0=0 (bit0)
 * 
 * 结果: R=0, G=0, B=0 → rgb(0,0,0) ✗
 * 
 * 需要尝试更多格式...
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const cram = new Uint8Array(readFileSync(CRAM_PATH));
const vram = new Uint8Array(readFileSync(VRAM_PATH));

// ============================================================
// 截图颜色目标
// ============================================================
const TARGET_BG = { r: 0, g: 0, b: 72 };
const TARGET_RED = { r: 72, g: 0, b: 0 };

// ============================================================
// 尝试所有可能的位域排列
// ============================================================
console.log('=== 尝试所有位域排列 ===');

// 定义所有可能的解码函数
const decoders = [
  // 方式1: 标准 LE + BGR
  { name: 'LE+BGR', decode: (i) => {
    const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
    return {
      r: ((word >> 0) & 7) * 36,
      g: ((word >> 3) & 7) * 36,
      b: ((word >> 6) & 7) * 36,
    };
  }},
  // 方式2: 标准 LE + RGB
  { name: 'LE+RGB', decode: (i) => {
    const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
    return {
      r: ((word >> 6) & 7) * 36,
      g: ((word >> 3) & 7) * 36,
      b: ((word >> 0) & 7) * 36,
    };
  }},
  // 方式3: BE + BGR
  { name: 'BE+BGR', decode: (i) => {
    const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
    return {
      r: ((word >> 0) & 7) * 36,
      g: ((word >> 3) & 7) * 36,
      b: ((word >> 6) & 7) * 36,
    };
  }},
  // 方式4: BE + RGB
  { name: 'BE+RGB', decode: (i) => {
    const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
    return {
      r: ((word >> 6) & 7) * 36,
      g: ((word >> 3) & 7) * 36,
      b: ((word >> 0) & 7) * 36,
    };
  }},
  // 方式5: Gens内部格式 - 低字节存8位, 高字节存R0
  { name: 'Gens1', decode: (i) => {
    const lo = cram[i * 2];   // B2 B1 B0 G2 G1 G0 R2 R1
    const hi = cram[i * 2 + 1]; // R0 + 填充
    const r = ((lo & 3) << 1) | (hi & 1);
    const g = (lo >> 2) & 7;
    const b = (lo >> 5) & 7;
    return { r: r * 36, g: g * 36, b: b * 36 };
  }},
  // 方式6: Gens内部格式 - 低字节存8位, 高字节存B0
  { name: 'Gens2', decode: (i) => {
    const lo = cram[i * 2];   // R2 R1 R0 G2 G1 G0 B2 B1
    const hi = cram[i * 2 + 1]; // B0 + 填充
    const r = (lo & 7);
    const g = ((lo >> 3) & 7);
    const b = ((lo >> 6) & 3) | ((hi & 1) << 2);
    return { r: r * 36, g: g * 36, b: b * 36 };
  }},
  // 方式7: Gens内部格式 - 高字节存8位, 低字节存R0
  { name: 'Gens3', decode: (i) => {
    const hi = cram[i * 2];   // B2 B1 B0 G2 G1 G0 R2 R1
    const lo = cram[i * 2 + 1]; // R0 + 填充
    const r = ((hi & 3) << 1) | (lo & 1);
    const g = (hi >> 2) & 7;
    const b = (hi >> 5) & 7;
    return { r: r * 36, g: g * 36, b: b * 36 };
  }},
  // 方式8: Gens内部格式 - 高字节存8位, 低字节存B0
  { name: 'Gens4', decode: (i) => {
    const hi = cram[i * 2];   // R2 R1 R0 G2 G1 G0 B2 B1
    const lo = cram[i * 2 + 1]; // B0 + 填充
    const r = (hi & 7);
    const g = ((hi >> 3) & 7);
    const b = ((hi >> 6) & 3) | ((lo & 1) << 2);
    return { r: r * 36, g: g * 36, b: b * 36 };
  }},
];

// ============================================================
// 测试 pal0[0] 是否能产生背景色
// ============================================================
console.log('\n=== pal0[0] 测试 (目标: rgb(0,0,72)) ===');
console.log(`CRAM[0] 字节: [0x${cram[0].toString(16).padStart(2,'0')}, 0x${cram[1].toString(16).padStart(2,'0')}]`);

for (const { name, decode } of decoders) {
  const c = decode(0);
  const match = Math.abs(c.r - TARGET_BG.r) <= 5 && 
                Math.abs(c.g - TARGET_BG.g) <= 5 && 
                Math.abs(c.b - TARGET_BG.b) <= 5;
  console.log(`${name}: rgb(${c.r},${c.g},${c.b}) ${match ? '✓ 匹配!' : ''}`);
}

// ============================================================
// 测试 pal2[1] 是否能产生红色
// ============================================================
console.log('\n=== pal2[1] 测试 (目标: rgb(72,0,0)) ===');
console.log(`CRAM[33] 字节: [0x${cram[66].toString(16).padStart(2,'0')}, 0x${cram[67].toString(16).padStart(2,'0')}]`);

for (const { name, decode } of decoders) {
  const c = decode(33);
  const match = Math.abs(c.r - TARGET_RED.r) <= 5 && 
                Math.abs(c.g - TARGET_RED.g) <= 5 && 
                Math.abs(c.b - TARGET_RED.b) <= 5;
  console.log(`${name}: rgb(${c.r},${c.g},${c.b}) ${match ? '✓ 匹配!' : ''}`);
}

// ============================================================
// 搜索所有能产生背景色的 CRAM 条目 + 解码方式
// ============================================================
console.log('\n=== 搜索产生背景色 rgb(0,0,72) 的组合 ===');

for (const { name, decode } of decoders) {
  for (let i = 0; i < 64; i++) {
    const c = decode(i);
    if (Math.abs(c.r - 0) <= 5 && Math.abs(c.g - 0) <= 5 && Math.abs(c.b - 72) <= 5) {
      console.log(`  ${name} → CRAM[${i}] = rgb(${c.r},${c.g},${c.b})`);
    }
  }
}

// ============================================================
// 搜索所有能产生红色的 CRAM 条目 + 解码方式
// ============================================================
console.log('\n=== 搜索产生红色 rgb(72,0,0) 的组合 ===');

for (const { name, decode } of decoders) {
  for (let i = 0; i < 64; i++) {
    const c = decode(i);
    if (Math.abs(c.r - 72) <= 5 && Math.abs(c.g - 0) <= 5 && Math.abs(c.b - 0) <= 5) {
      console.log(`  ${name} → CRAM[${i}] = rgb(${c.r},${c.g},${c.b})`);
    }
  }
}

// ============================================================
// 另一个思路: Gens 的 CRAM dump 可能是按 4 个调色板交错存储的
// 而不是按调色板顺序存储
// ============================================================
console.log('\n=== 检查 CRAM 是否交错存储 ===');
// 标准顺序: pal0[0-15], pal1[0-15], pal2[0-15], pal3[0-15]
// 交错顺序: pal0[0], pal1[0], pal2[0], pal3[0], pal0[1], pal1[1], ...

function getColorInterleaved(pal, color) {
  const idx = color * 4 + pal;
  const word = (cram[idx * 2 + 1] << 8) | cram[idx * 2];
  return {
    r: ((word >> 0) & 7) * 36,
    g: ((word >> 3) & 7) * 36,
    b: ((word >> 6) & 7) * 36,
  };
}

console.log('交错存储 - pal2[0]:', JSON.stringify(getColorInterleaved(2, 0)));
console.log('交错存储 - pal2[1]:', JSON.stringify(getColorInterleaved(2, 1)));
console.log('交错存储 - pal0[0]:', JSON.stringify(getColorInterleaved(0, 0)));
console.log('交错存储 - pal0[4]:', JSON.stringify(getColorInterleaved(0, 4)));

// ============================================================
// 尝试: CRAM 只有前128字节有效, 后384字节是重复/垃圾
// ============================================================
console.log('\n=== 检查 CRAM 前128字节 ===');
for (let i = 0; i < 16; i++) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = ((word >> 0) & 7) * 36;
  const g = ((word >> 3) & 7) * 36;
  const b = ((word >> 6) & 7) * 36;
  console.log(`  CRAM[${i}] word=0x${word.toString(16).padStart(4,'0')} → rgb(${r},${g},${b})`);
}

// ============================================================
// 尝试: 颜色映射系数不是 36, 而是其他值
// ============================================================
console.log('\n=== 尝试不同映射系数 ===');

function tryScale(scale) {
  const word = (cram[0 * 2 + 1] << 8) | cram[0 * 2];
  const r = ((word >> 0) & 7) * scale;
  const g = ((word >> 3) & 7) * scale;
  const b = ((word >> 6) & 7) * scale;
  console.log(`×${scale}: pal0[0] = rgb(${r},${g},${b})`);
}

for (const s of [32, 36, 40, 44, 48, 52, 56, 60]) {
  tryScale(s);
}

// ============================================================
// 终极方案: 使用截图颜色直接生成调色板映射
// ============================================================
console.log('\n=== 终极方案: 用截图颜色校准 ===');

// 我们知道:
// pal2[0] 应该是背景色 rgb(0,0,72)
// pal2[1] 应该是红色 rgb(72,0,0)
// pal2[2] 应该是深红色 rgb(144,0,0)
// pal2[3] 应该是更深红色 rgb(216,0,0)

// 找到 CRAM 条目产生这些颜色
const targetColors = [
  { name: '背景色', r: 0, g: 0, b: 72 },
  { name: '红色1', r: 72, g: 0, b: 0 },
  { name: '红色2', r: 144, g: 0, b: 0 },
  { name: '红色3', r: 216, g: 0, b: 0 },
  { name: '金色', r: 248, g: 216, b: 0 },
  { name: '绿色', r: 0, g: 252, b: 0 },
];

for (const target of targetColors) {
  console.log(`\n搜索 ${target.name} rgb(${target.r},${target.g},${target.b}):`);
  for (const { name, decode } of decoders) {
    for (let i = 0; i < 64; i++) {
      const c = decode(i);
      if (Math.abs(c.r - target.r) <= 10 && 
          Math.abs(c.g - target.g) <= 10 && 
          Math.abs(c.b - target.b) <= 10) {
        console.log(`  ${name} → CRAM[${i}] = rgb(${c.r},${c.g},${c.b})`);
      }
    }
  }
}
