/**
 * 标题画面渲染调试脚本
 *
 * 用于排查标题画面花屏问题:
 *   1. 解压标题相关 ROM 资源 (0x8001/0x8003/0x8008)
 *   2. 分析 TITLE_NAMETABLE_A/B 的 tile 索引分布
 *   3. 检查 VRAM 布局冲突
 *
 * 运行: node test/title-debug.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const romPath = path.resolve(root, '20260713/Langrisser II (Japan).md');
const romData = new Uint8Array(fs.readFileSync(romPath));

console.log('ROM size:', romData.length);

// ============================================================
// 1. 加载 TitleScreenData
// ============================================================
const dataModule = await import('../dist/game/data/TitleScreenData.js');
const TITLE_CRAM = dataModule.TITLE_CRAM;
const TITLE_NAMETABLE_A = dataModule.TITLE_NAMETABLE_A;
const TITLE_NAMETABLE_B = dataModule.TITLE_NAMETABLE_B;

console.log('\n--- TitleScreenData ---');
console.log('TITLE_CRAM length:', TITLE_CRAM.length);
console.log('TITLE_NAMETABLE_A length:', TITLE_NAMETABLE_A.length);
console.log('TITLE_NAMETABLE_B length:', TITLE_NAMETABLE_B.length);

// ============================================================
// 2. 解析资源指针表
// ============================================================
const RES_TABLE_BASE = 0x0B0000;

function readLong(addr) {
  return ((romData[addr] << 24) | (romData[addr + 1] << 16) | (romData[addr + 2] << 8) | romData[addr + 3]) >>> 0;
}

function readWord(addr) {
  return ((romData[addr] << 8) | romData[addr + 1]);
}

function readByte(addr) {
  return romData[addr];
}

const resourceIds = [0x8001, 0x8003, 0x8008];
console.log('\n--- Resource Pointers ---');
for (const id of resourceIds) {
  const index = id & 0x0FFF;
  const ptr = readLong(RES_TABLE_BASE + index * 4);
  const typeByte = romData[ptr];
  const size = readWord(ptr + 1);
  console.log(`Resource 0x${id.toString(16)} (index ${index}): ptr=0x${ptr.toString(16).padStart(8, '0')}, type=0x${typeByte.toString(16)}, declaredSize=${size}`);
}

// ============================================================
// 3. 使用项目内解压器解压
// ============================================================
const { RomLoader } = await import('../dist/game/core/RomLoader.js');
const { Lzss } = await import('../dist/game/resource/Lzss.js');
const { NibbleRle } = await import('../dist/game/resource/NibbleRle.js');
const { Bitplane } = await import('../dist/game/resource/Bitplane.js');

const romLoader = new RomLoader(romData.buffer);

function decompressResource(resId) {
  const index = resId & 0x0FFF;
  const ptr = romLoader.read32(RES_TABLE_BASE + index * 4);
  if (ptr === 0) return { size: 0, type: 0, data: null };

  const typeByte = romLoader.read8(ptr);
  const expectedSize = romLoader.read16(ptr + 1);
  const out = new Uint8Array(0x10000);
  let outSize = 0;

  switch (typeByte) {
    case 0x01: outSize = NibbleRle.decompress(romLoader, ptr + 1, out); break;
    case 0x02: outSize = Bitplane.decompress(romLoader, ptr + 1, out); break;
    case 0x03: outSize = Lzss.decompress(romLoader, ptr + 1, out); break;
    default: throw new Error(`Unknown type 0x${typeByte.toString(16)}`);
  }

  return { size: outSize, type: typeByte, expectedSize, data: out.slice(0, outSize) };
}

console.log('\n--- Decompressed Resources ---');
let totalTiles = 0;
for (const id of resourceIds) {
  const result = decompressResource(id);
  const tileCount = Math.floor(result.size / 32);
  console.log(`Resource 0x${id.toString(16)}: type=0x${result.type.toString(16)}, expected=${result.expectedSize}, actual=${result.size}, tiles=${tileCount}`);
  totalTiles += tileCount;
}
console.log(`Total tiles from resources: ${totalTiles}`);

// ============================================================
// 4. 解析 NAMETABLE_A/B 的 tile 索引
// ============================================================
function parseNametableEntries(bytes, label, littleEndian) {
  const entries = [];
  for (let i = 0; i < bytes.length; i += 2) {
    const lo = bytes[i];
    const hi = bytes[i + 1];
    const word = littleEndian ? ((hi << 8) | lo) : ((lo << 8) | hi);
    const tileIdx = word & 0x07FF;
    const palette = (word >> 13) & 0x03;
    const priority = (word >> 15) & 0x01;
    const hFlip = (word & 0x0800) !== 0;
    const vFlip = (word & 0x1000) !== 0;
    entries.push({ word, tileIdx, palette, priority, hFlip, vFlip });
  }

  const maxTile = Math.max(...entries.map(e => e.tileIdx));
  const minTile = Math.min(...entries.map(e => e.tileIdx));
  const uniqueTiles = new Set(entries.map(e => e.tileIdx)).size;
  const outOfRange = entries.filter(e => e.tileIdx >= totalTiles).length;

  console.log(`\n--- ${label} (littleEndian=${littleEndian}) ---`);
  console.log(`  entries: ${entries.length}, unique tiles: ${uniqueTiles}, min: ${minTile}, max: ${maxTile}`);
  console.log(`  out of range (>= ${totalTiles}): ${outOfRange}`);
  console.log(`  first 5 entries:`, entries.slice(0, 5).map(e => ({ w: `0x${e.word.toString(16).padStart(4, '0')}`, tile: e.tileIdx, pal: e.palette, pri: e.priority })));
  console.log(`  last 5 entries:`, entries.slice(-5).map(e => ({ w: `0x${e.word.toString(16).padStart(4, '0')}`, tile: e.tileIdx, pal: e.palette, pri: e.priority })));
}

parseNametableEntries(TITLE_NAMETABLE_A, 'NAMETABLE_A', true);
parseNametableEntries(TITLE_NAMETABLE_A, 'NAMETABLE_A', false);
parseNametableEntries(TITLE_NAMETABLE_B, 'NAMETABLE_B', true);
parseNametableEntries(TITLE_NAMETABLE_B, 'NAMETABLE_B', false);

// ============================================================
// 5. 模拟 VRAM 布局
// ============================================================
console.log('\n--- VRAM Layout Simulation ---');
const VRAM_SIZE = 0x10000;
let vramAddr = 0;
for (const id of resourceIds) {
  const result = decompressResource(id);
  console.log(`Resource 0x${id.toString(16)}: VRAM 0x${vramAddr.toString(16).padStart(4, '0')} - 0x${(vramAddr + result.size - 1).toString(16).padStart(4, '0')}`);
  vramAddr += result.size;
}
console.log(`Plane A nametable: 0xC000 - 0xCFFF (4096 bytes)`);
console.log(`Plane B nametable: 0x1C00 - 0x2BFF (4096 bytes) [CURRENT WRONG BASE] or 0xE000 - 0xEFFF [GENESIS CORRECT]`);
console.log(`VRAM conflict: tile data ends at 0x${vramAddr.toString(16).padStart(4, '0')}, Plane B at 0x1C00 -> ${vramAddr > 0x1C00 ? 'CONFLICT' : 'OK'}`);
console.log(`VRAM conflict: tile data ends at 0x${vramAddr.toString(16).padStart(4, '0')}, Plane B at 0xE000 -> ${vramAddr > 0xE000 ? 'CONFLICT' : 'OK'}`);
