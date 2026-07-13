/**
 * 列出资源指针表中所有资源, 按大小排序
 * 找出可能是标题画面的资源 (大量 tile 数据)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url).replace(/^\//, ''));
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan)_68K-gens-rom-dump.bin');
const rom = new Uint8Array(fs.readFileSync(romPath));

function r8(off) { return rom[off & 0xFFFFF]; }
function r16(off) { return (r8(off) << 8) | r8(off + 1); }
function r32(off) { return (r8(off) << 24) | (r8(off + 1) << 16) | (r8(off + 2) << 8) | r8(off + 3); }

const resources = [];

// 读前 256 个资源条目
for (let entry = 0; entry < 256; entry++) {
  const ptr = r32(0x000B0000 + entry * 4);
  if (ptr === 0 || ptr >= rom.length) continue;
  
  const typeByte = r8(ptr);
  let typeName = `T${typeByte}`;
  if (typeByte === 1) typeName = 'RLE';
  else if (typeByte === 3) typeName = 'LZSS';
  
  let size = 0;
  if (typeByte === 1 || typeByte === 3) {
    size = r16(ptr + 1); // 解压后大小
  } else if (typeByte === 2) {
    // Type 2: 可能不同的头部格式
    size = r16(ptr + 1);
  }
  
  const numTiles = Math.floor(size / 32);
  resources.push({ entry, ptr, type: typeByte, typeName, size, numTiles });
}

// 按大小排序 (从大到小)
resources.sort((a, b) => b.size - a.size);

console.log('=== 最大的 30 个资源 (可能是标题画面) ===\n');
console.log('Entry  ROM地址     类型   解压大小  Tile数');
console.log('-----  ----------  ----  --------  ------');

for (let i = 0; i < Math.min(30, resources.length); i++) {
  const r = resources[i];
  console.log(
    `${r.entry.toString().padStart(5)}  0x${r.ptr.toString(16).padStart(8, '0')}  ${r.typeName.padEnd(4)}  ${r.size.toString().padStart(8)}  ${r.numTiles.toString().padStart(6)}`
  );
}

// 看看哪些资源的大小适合标题画面
// 标题画面通常需要:
// - 256-512 tiles for background (8192-16384 bytes)
// - 64-128 tiles for sprites (2048-4096 bytes)
// - Nametable: 64x32 tiles * 2 bytes = 4096 bytes
console.log('\n=== 大小在 4000-20000 字节之间的资源 (可能是标题画面) ===\n');

for (const r of resources) {
  if (r.size >= 4000 && r.size <= 20000) {
    console.log(
      `  Entry ${r.entry.toString().padStart(3)}: 0x${r.ptr.toString(16).padStart(8, '0')} ${r.typeName} ${r.size}B (${r.numTiles} tiles)`
    );
  }
}

// 也看看前 20 个资源按 entry 顺序
console.log('\n=== 前 20 个资源 (按 entry 顺序) ===\n');
const byEntry = [...resources].sort((a, b) => a.entry - b.entry);
for (let i = 0; i < Math.min(20, byEntry.length); i++) {
  const r = byEntry[i];
  console.log(
    `  Entry ${r.entry.toString().padStart(3)}: 0x${r.ptr.toString(16).padStart(8, '0')} ${r.typeName} ${r.size}B (${r.numTiles} tiles)`
  );
}
