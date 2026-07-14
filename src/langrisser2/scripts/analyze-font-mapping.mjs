import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', '20260713');
const ROM_FILE = path.join(BASE, 'Langrisser II (Japan).md');
const OUTPUT_DIR = path.join(__dirname, '..', 'output');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const rom = new Uint8Array(fs.readFileSync(ROM_FILE));

const RL = (o) => ((rom[o] << 24) | (rom[o + 1] << 16) | (rom[o + 2] << 8) | rom[o + 3]) >>> 0;
const RW = (o) => ((rom[o] << 8) | rom[o + 1]);
const RB = (o) => rom[o];

function hex(a, n = 6) { return '0x' + a.toString(16).padStart(n, '0'); }

console.log('=== 分析字体映射系统 ===\n');

// ============================================================
// 假名字符表 (ROM 0x082114)
// ============================================================
console.log('--- 假名字符表 (ROM 0x082114) ---');

const KANA_TABLE_ADDR = 0x082114;
const KANA_TABLE_SIZE = 0x100;

const kanaData = [];
for (let i = 0; i < KANA_TABLE_SIZE; i++) {
  kanaData.push(RB(KANA_TABLE_ADDR + i));
}

console.log(`地址: ${hex(KANA_TABLE_ADDR)} - ${hex(KANA_TABLE_ADDR + KANA_TABLE_SIZE)}`);

// 按行打印
console.log('\n假名字符表 (索引: tile索引):');
for (let row = 0; row < 16; row++) {
  let line = `  ${row.toString(16).toUpperCase()}: `;
  for (let col = 0; col < 16; col++) {
    const idx = row * 16 + col;
    const val = kanaData[idx];
    line += `${val.toString(16).padStart(2, '0')} `;
  }
  console.log(line);
}

// ============================================================
// 假名面板布局表 (ROM 0x0821BE)
// ============================================================
console.log('\n--- 假名面板布局表 (ROM 0x0821BE) ---');

const LAYOUT_TABLE_ADDR = 0x0821BE;
const LAYOUT_TABLE_SIZE = 0x80;

const layoutData = [];
for (let i = 0; i < LAYOUT_TABLE_SIZE; i++) {
  layoutData.push(RB(LAYOUT_TABLE_ADDR + i));
}

console.log(`地址: ${hex(LAYOUT_TABLE_ADDR)} - ${hex(LAYOUT_TABLE_ADDR + LAYOUT_TABLE_SIZE)}`);

console.log('\n假名面板布局表:');
for (let row = 0; row < 8; row++) {
  let line = `  ${row.toString(16).toUpperCase()}: `;
  for (let col = 0; col < 16; col++) {
    const idx = row * 16 + col;
    if (idx < layoutData.length) {
      const val = layoutData[idx];
      line += `${val.toString(16).padStart(2, '0')} `;
    } else {
      line += '-- ';
    }
  }
  console.log(line);
}

// ============================================================
// 资源0x8001解压
// ============================================================
console.log('\n--- 资源0x8001内容分析 ---');

const RESOURCE_TABLE = 0x0B0000;

function resolveResource(resourceId) {
  const shiftCount = (resourceId & 0xFFFF) % 64;
  const index = (resourceId & 0x7FFF) >> shiftCount;
  const entryAddr = RESOURCE_TABLE + index * 4;
  return RL(entryAddr);
}

function decompressLZSS(addr) {
  const headerAddr = addr + 1;
  const decompressedSize = RW(headerAddr);
  const compressedDataStart = addr + 3;
  
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;
  
  while (remaining > 0) {
    const flagByte = RB(compressedPos++);
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
        const byte = RB(compressedPos++);
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = RB(compressedPos++);
        const b2 = RB(compressedPos++);
        let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const matchLength = (b2 & 0x0f) + 2;
        for (let i = 0; i < matchLength && remaining > 0; i++) {
          const byte = window[matchOffset];
          window[windowPos] = byte;
          output[outputPos++] = byte;
          matchOffset = (matchOffset + 1) & 0xfff;
          windowPos = (windowPos + 1) & 0xfff;
          remaining--;
        }
      }
    }
  }
  return { data: output, size: decompressedSize };
}

const resourceId = 0x8001;
const resourcePtr = resolveResource(resourceId);
const type = RB(resourcePtr);
const decompressed = decompressLZSS(resourcePtr);
const tileCount = Math.floor(decompressed.size / 32);

console.log(`资源 ${hex(resourceId)}: ${tileCount} 个 tile`);

// ============================================================
// 解码并渲染每个tile
// ============================================================
function decodeTile4BPP(tileBytes) {
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let p = 0;
      for (let b = 0; b < 4; b++) {
        const planeByte = tileBytes[y + b * 8];
        p |= ((planeByte >> (7 - x)) & 1) << b;
      }
      pixels[y * 8 + x] = p;
    }
  }
  return pixels;
}

const tiles = [];
for (let i = 0; i < tileCount; i++) {
  const tileBytes = decompressed.data.slice(i * 32, i * 32 + 32);
  tiles.push(decodeTile4BPP(tileBytes));
}

// ============================================================
// 查看假名字符表中引用的tile
// ============================================================
console.log('\n--- 假名字符表引用的tile与资源0x8001的关系 ---');

const referencedTiles = new Set();
for (const val of kanaData) {
  if (val !== 0 && val !== 0xFF) {
    referencedTiles.add(val);
  }
}

console.log('假名字符表引用的tile索引:');
const sortedRefs = [...referencedTiles].sort((a, b) => a - b);
console.log(sortedRefs.map(i => `0x${i.toString(16).padStart(3, '0')}`).join(', '));

console.log('\n资源0x8001中的tile索引范围: 0x000 - 0x' + (tileCount - 1).toString(16).padStart(3, '0'));

console.log('\n假名字符表引用的tile是否在资源0x8001范围内:');
for (const idx of sortedRefs) {
  const inResource = idx < tileCount;
  console.log(`  tile 0x${idx.toString(16).padStart(3, '0')}: ${inResource ? '✓ 在资源内' : '✗ 不在资源内'}`);
}

// ============================================================
// 查看更多资源
// ============================================================
console.log('\n--- 查看更多资源 ---');

const resourceIds = [0x8001, 0x8002, 0x8003, 0x8004, 0x8005, 0x8100];

for (const id of resourceIds) {
  const ptr = resolveResource(id);
  if (ptr < 0x0B0000) {
    console.log(`资源 ${hex(id)}: 无效指针`);
    continue;
  }
  
  const t = RB(ptr);
  let decomp = null;
  try {
    if (t === 3) decomp = decompressLZSS(ptr);
  } catch(e) {}
  
  if (decomp) {
    const tc = Math.floor(decomp.size / 32);
    console.log(`资源 ${hex(id)}: type=${t}, ${tc} 个 tile`);
    
    for (const refIdx of sortedRefs) {
      if (refIdx < tc) {
        const tileBytes = decomp.data.slice(refIdx * 32, refIdx * 32 + 32);
        const pixels = decodeTile4BPP(tileBytes);
        const hasData = pixels.some(p => p !== 0);
        if (hasData) {
          console.log(`    → tile 0x${refIdx.toString(16).padStart(3, '0')} 有数据`);
        }
      }
    }
  }
}

// ============================================================
// 搜索VRAM地址设置
// ============================================================
console.log('\n--- 搜索资源0x8001加载的VRAM地址 ---');

const searchPattern = [0x30, 0x20, 0x01, 0x80];
for (let off = 0; off < rom.length - 20; off++) {
  let match = true;
  for (let i = 0; i < searchPattern.length; i++) {
    if (rom[off + i] !== searchPattern[i]) { match = false; break; }
  }
  if (match) {
    console.log(`在 ${hex(off)} 发现资源0x8001引用`);
    
    const prevInst = rom.slice(off - 20, off);
    console.log(`  前20字节: ${Array.from(prevInst).map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
    
    const vramAddr = (rom[off - 4] << 8) | rom[off - 3];
    console.log(`  可能的VRAM地址: 0x${vramAddr.toString(16).padStart(4, '0')}`);
  }
}

// ============================================================
// 查看0x0821BE处的指针表
// ============================================================
console.log('\n--- 查看0x0821BE处的指针表 ---');

console.log('0x0821BE处的前32个字节:');
const beData = rom.slice(0x0821BE, 0x0821BE + 32);
console.log(Array.from(beData).map(b => b.toString(16).padStart(2, '0')).join(' '));

// 作为指针解析
console.log('\n作为指针解析 (每个指针4字节):');
for (let i = 0; i < 8; i++) {
  const ptr = RL(0x0821BE + i * 4);
  console.log(`  指针 ${i}: ${hex(ptr)}`);
}

console.log('\n=== 分析完成 ===');
