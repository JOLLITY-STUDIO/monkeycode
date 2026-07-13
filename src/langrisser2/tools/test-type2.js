/**
 * 测试 Type 2 解压
 * 验证 Entry 112 (0x80e1) 的解压结果
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const romData = new Uint8Array(fs.readFileSync(romPath));

function r8(off) { return romData[off & 0xFFFFF] & 0xff; }
function r16(off) { return (r8(off) << 8) | r8(off + 1); }
function r32(off) { return (r8(off) << 24) | (r8(off + 1) << 16) | (r8(off + 2) << 8) | r8(off + 3); }

// 加载编译后的 resource.js
const { ArrayBufferRomReader, decompressType2, dispatchByType } = await import(
  pathToFileURL(path.resolve(root, 'dist/game/hw/resource.js')).href
);

const rom = new ArrayBufferRomReader(romData);

console.log('=== Type 2 解压测试 ===\n');

// 查找所有 Type 2 资源
const type2Entries = [];
for (let entry = 0; entry < 256; entry++) {
  const ptr = r32(0x000B0000 + entry * 4);
  if (ptr === 0 || ptr >= romData.length) continue;
  const typeByte = r8(ptr);
  if (typeByte === 2) {
    type2Entries.push({ entry, ptr });
  }
}
console.log(`共找到 ${type2Entries.length} 个 Type 2 资源\n`);

// 测试 Entry 112
const e112 = type2Entries.find(e => e.entry === 112);
if (!e112) {
  console.log('Entry 112 不是 Type 2, 尝试第一个 Type 2 资源');
}

// 测试前 5 个 Type 2 资源
const testEntries = type2Entries.slice(0, 5);
if (e112) testEntries.unshift(e112);

for (const { entry, ptr } of testEntries) {
  console.log(`--- Entry ${entry} @ 0x${ptr.toString(16)} ---`);

  // 头部分析
  const b1 = r8(ptr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;

  console.log(`  byte[1] = 0x${b1.toString(16)} → planes=${planes}, compressed=${compressed}`);

  if (compressed) {
    const size = r16(ptr + 10);
    const planeCount = planes !== 2 ? planes ^ 5 : planes;
    const outputSize = size * planes * 8;
    console.log(`  byte[10-11] = 0x${size.toString(16)} = ${size}`);
    console.log(`  planeCount = ${planeCount} (planes=${planes}, XOR=${planes ^ 5})`);
    console.log(`  预期输出 = ${outputSize} 字节 = ${outputSize / 32} tiles`);

    try {
      const result = decompressType2(rom, ptr);
      console.log(`  实际输出 = ${result.size} 字节 = ${result.size / 32} tiles`);

      // 检查输出是否全零
      let nonZero = 0;
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i] !== 0) nonZero++;
      }
      console.log(`  非零字节: ${nonZero}/${result.data.length} (${(nonZero / result.data.length * 100).toFixed(1)}%)`);

      // 显示前 32 字节 (第 1 个 tile)
      let hex = '';
      for (let i = 0; i < 32 && i < result.data.length; i++) {
        hex += result.data[i].toString(16).padStart(2, '0') + ' ';
      }
      console.log(`  第 1 tile: ${hex}`);
    } catch (err) {
      console.log(`  解压失败: ${err.message}`);
    }
  } else {
    const size = r16(ptr + 2);
    const outputSize = size * planes * 8;
    console.log(`  byte[2-3] = 0x${size.toString(16)} = ${size}`);
    console.log(`  预期输出 = ${outputSize} 字节 (未压缩分支)`);
  }
  console.log('');
}

// 测试通过 dispatchByType
console.log('--- dispatchByType 测试 ---');
for (const { entry, ptr } of testEntries.slice(0, 3)) {
  try {
    const result = dispatchByType(rom, ptr);
    console.log(`  Entry ${entry}: size=${result.size}, type=${result.type}`);
  } catch (err) {
    console.log(`  Entry ${entry}: 失败 - ${err.message}`);
  }
}
