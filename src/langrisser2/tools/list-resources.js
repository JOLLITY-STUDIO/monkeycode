/**
 * 列出资源指针表中的所有资源
 * 分析哪些可能是标题画面用的
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ArrayBufferRomReader, decompressLZSS, decompressNibbleRLE } from '../dist/game/hw/resource.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));
const rom = new ArrayBufferRomReader(romData);

const RES_TABLE = 0x000B0000;
const MAX_ENTRIES = 200; // 先看前 200 个

console.log('=== 资源指针表分析 (前 200 项) ===\n');
console.log('索引 | 资源ID | ROM偏移    | 原始大小 | 压缩大小 | 类型    | 解压大小');
console.log('-----|--------|------------|----------|----------|---------|----------');

const resources = [];

for (let i = 0; i < MAX_ENTRIES; i++) {
  const tableOffset = RES_TABLE + i * 4;
  if (tableOffset + 4 > romData.length) break;

  const ptr = rom.readLong(tableOffset);
  if (ptr === 0 || ptr >= romData.length) {
    // 空指针，可能到表尾了
    continue;
  }

  // 读取资源头
  // LZSS: 前 4 字节 = 解压后大小
  // Nibble RLE: 第一个字节可能是 0x00 或 0xFF?
  // 让我们尝试两种解压方式

  let type = 'unknown';
  let compressedSize = 0;
  let decompressedSize = 0;

  // 先试试能不能确定类型
  const firstByte = rom.readByte(ptr);
  const firstWord = rom.readWord(ptr);
  const firstLong = rom.readLong(ptr);

  // LZSS 特征: 前 4 字节是解压大小 (通常比较合理)
  if (firstLong > 0 && firstLong < 0x20000) {
    // 可能是 LZSS
    try {
      const result = decompressLZSS(rom, ptr);
      if (result && result.data && result.data.length > 0) {
        type = 'LZSS';
        decompressedSize = result.data.length;
        // 计算压缩大小: 我们不知道确切值，就估算一下
        compressedSize = -1; // 未知
      }
    } catch (e) {}
  }

  // Nibble RLE 特征: 高 nibble 可能是控制命令
  // 第一个字节的低 nibble 是颜色索引?
  if (type === 'unknown') {
    try {
      const result = decompressNibbleRLE(rom, ptr, 64); // 先解压 64 字节试试
      if (result && result.data && result.data.length > 0) {
        type = 'NibbleRLE';
        // 继续解压完整数据
        const full = decompressNibbleRLE(rom, ptr, 0x10000);
        decompressedSize = full.data.length;
        compressedSize = full.bytesRead;
      }
    } catch (e) {}
  }

  const resourceId = 0x8000 + i * 2; // 资源 ID 的低 15 位 = index * 2?

  resources.push({
    index: i,
    resourceId: resourceId,
    romOffset: ptr,
    firstByte,
    firstWord,
    firstLong,
    type,
    decompressedSize,
  });

  const sizeStr = decompressedSize > 0 ? decompressedSize.toString() : '?';
  const compSizeStr = compressedSize > 0 ? compressedSize.toString() : '?';
  const idStr = `0x${resourceId.toString(16).padStart(4, '0')}`;
  const offsetStr = `0x${ptr.toString(16).padStart(8, '0')}`;

  console.log(`${i.toString().padStart(4)} | ${idStr} | ${offsetStr} | ${compSizeStr.padStart(8)} | ${sizeStr.padStart(8)} | ${type.padStart(7)} |`);
}

console.log(`\n共找到 ${resources.length} 个有效资源\n`);

// 分类统计
const lzssCount = resources.filter(r => r.type === 'LZSS').length;
const rleCount = resources.filter(r => r.type === 'NibbleRLE').length;
console.log(`LZSS: ${lzssCount} 个`);
console.log(`NibbleRLE: ${rleCount} 个`);
console.log(`未知: ${resources.length - lzssCount - rleCount} 个`);

// 找出解压后比较大的资源 (可能是图形数据)
console.log('\n\n=== 解压后较大的资源 (可能是图形数据) ===\n');
const largeResources = resources
  .filter(r => r.decompressedSize >= 1024)
  .sort((a, b) => b.decompressedSize - a.decompressedSize)
  .slice(0, 30);

console.log('索引 | 资源ID  | 类型       | 解压大小 | 大约 tiles 数');
console.log('-----|---------|------------|----------|--------------');

for (const r of largeResources) {
  const idStr = `0x${r.resourceId.toString(16).padStart(4, '0')}`;
  const tiles = Math.floor(r.decompressedSize / 32); // 1 tile = 32 字节 (4bpp)
  console.log(`${r.index.toString().padStart(4)} | ${idStr}  | ${r.type.padStart(10)} | ${r.decompressedSize.toString().padStart(8)} | ${tiles}`);
}

// 保存完整列表
const outPath = path.resolve(root, 'resource-list.json');
fs.writeFileSync(outPath, JSON.stringify(resources, null, 2));
console.log(`\n完整资源列表已保存到: ${outPath}`);
