/**
 * 正确分类所有资源（按第一个字节的类型索引）
 * 分析资源大小和内容特征
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

const RES_TABLE = 0x000B0000;
const MAX_ENTRIES = 200;

function r8(off) { return romData[off] & 0xff; }
function r16(off) { return ((romData[off] & 0xff) << 8) | (romData[off + 1] & 0xff); }
function r32(off) {
  return (
    ((romData[off] & 0xff) << 24) |
    ((romData[off + 1] & 0xff) << 16) |
    ((romData[off + 2] & 0xff) << 8) |
    (romData[off + 3] & 0xff)
  );
}

console.log('=== 资源分类分析 ===\n');

const typeNames = {
  0: 'TYPE_0',
  1: 'NibbleRLE',
  2: 'TYPE_2',
  3: 'LZSS',
  4: 'TYPE_4',
  5: 'TYPE_5',
  6: 'TYPE_6',
  7: 'TYPE_7',
  8: 'TYPE_8',
  9: 'TYPE_9',
};

const resources = [];
const typeStats = {};

for (let i = 0; i < MAX_ENTRIES; i++) {
  const tableOffset = RES_TABLE + i * 4;
  if (tableOffset + 4 > romData.length) break;

  const ptr = r32(tableOffset);
  if (ptr === 0 || ptr >= romData.length) continue;

  const type = r8(ptr);
  const resourceId = 0x8000 + i * 2; // 基于资源 ID 编码的推测

  // 计算资源大小 (到下一个资源指针之前)
  let nextPtr = romData.length;
  for (let j = i + 1; j < MAX_ENTRIES; j++) {
    const nextTableOffset = RES_TABLE + j * 4;
    if (nextTableOffset + 4 > romData.length) break;
    const np = r32(nextTableOffset);
    if (np !== 0 && np < romData.length) {
      nextPtr = np;
      break;
    }
  }
  const approxSize = nextPtr - ptr;

  resources.push({
    index: i,
    resourceId,
    romOffset: ptr,
    type,
    approxSize,
  });

  if (!typeStats[type]) typeStats[type] = 0;
  typeStats[type]++;
}

// 按类型统计
console.log('资源类型统计:');
for (const type of Object.keys(typeStats).sort()) {
  console.log(`  类型 ${type} (${typeNames[type] || '?'}): ${typeStats[type]} 个`);
}
console.log(`  总计: ${resources.length} 个\n`);

// 按类型分组列出
for (const type of Object.keys(typeStats).sort()) {
  const typed = resources.filter(r => r.type == type);
  console.log(`\n═══ 类型 ${type} (${typeNames[type] || '?'}) - ${typed.length} 个 ═══`);
  console.log('索引 | 资源ID | ROM偏移    | 近似大小');
  console.log('-----|--------|------------|----------');

  for (const r of typed) {
    const idStr = `0x${r.resourceId.toString(16).padStart(4, '0')}`;
    const offStr = `0x${r.romOffset.toString(16).padStart(8, '0')}`;
    console.log(`${r.index.toString().padStart(4)} | ${idStr} | ${offStr} | ${r.approxSize.toString().padStart(8)}`);
  }
}

// 特别关注 LZSS 类型 (类型 3) - 这些可能是图形数据
const lzssResources = resources.filter(r => r.type === 3);
console.log(`\n\n=== LZSS 资源 (类型 3) 分析 ===\n`);
console.log('这些是压缩的图形/地图数据，解压后可能是 tile/nametable/palette\n');

// 计算解压后的大致大小
// LZSS 头部: 类型(1B) + 解压大小(3B?) 或 4B?
// 根据之前的分析，LZSS 的前 4 字节是解压后大小 (但第一个字节是类型=3)
// 所以解压大小 = bytes 1-3 组成的 24-bit 值? 或者是字节 1-4 (包含类型字节?)
// 让我们看看

console.log('LZSS 资源头部分析:');
console.log('索引 | 资源ID | ROM偏移    | 头4字节     | 推测解压大小');
console.log('-----|--------|------------|-------------|------------');

for (const r of lzssResources.slice(0, 20)) {
  const hdr = r32(r.romOffset);
  const idStr = `0x${r.resourceId.toString(16).padStart(4, '0')}`;
  const offStr = `0x${r.romOffset.toString(16).padStart(8, '0')}`;
  const hdrStr = '0x' + hdr.toString(16).padStart(8, '0');

  // 推测: 类型 1 字节 + 大小 3 字节 = 24-bit 大小
  const size24 = hdr & 0x00FFFFFF;
  // 或者: 大小是从字节 1 开始的 32-bit (不对齐)
  const size32 = (r8(r.romOffset + 1) << 24) | (r8(r.romOffset + 2) << 16) | (r8(r.romOffset + 3) << 8) | r8(r.romOffset + 4);

  console.log(`${r.index.toString().padStart(4)} | ${idStr} | ${offStr} | ${hdrStr} | 24bit=${size24} / 32bit=${size32}`);
}

// 保存完整列表
const outPath = path.resolve(root, 'resources-classified.json');
fs.writeFileSync(outPath, JSON.stringify(resources, null, 2));
console.log(`\n完整列表已保存到: ${outPath}`);
