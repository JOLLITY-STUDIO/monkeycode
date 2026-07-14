import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', '20260713');
const ROM_FILE = path.join(BASE, 'Langrisser II (Japan).md');
const VRAM_FILE = path.join(BASE, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = new Uint8Array(fs.readFileSync(ROM_FILE));
const vram = new Uint8Array(fs.readFileSync(VRAM_FILE));

const RL = (o) => ((rom[o] << 24) | (rom[o + 1] << 16) | (rom[o + 2] << 8) | rom[o + 3]) >>> 0;
const RW = (o) => ((rom[o] << 8) | rom[o + 1]);
const RB = (o) => rom[o];

function hex(a, n = 6) { return '0x' + a.toString(16).padStart(n, '0'); }

console.log('=== 全面字体数据搜索 ===\n');

// ============================================================
// 策略1: 搜索ROM中的文字区域 (SJIS编码文本)
// ============================================================
console.log('--- 策略1: 搜索SJIS文本区域 ---');

function findSJISBlocks() {
  const blocks = [];
  let inBlock = false;
  let blockStart = 0;
  let sjisCount = 0;
  
  for (let i = 0; i < rom.length - 1; i++) {
    const b1 = rom[i];
    const isSJISLead = (b1 >= 0x81 && b1 <= 0x9F) || (b1 >= 0xE0 && b1 <= 0xFC);
    
    if (isSJISLead) {
      sjisCount++;
      if (!inBlock) {
        inBlock = true;
        blockStart = i;
      }
      i++;
    } else if (inBlock) {
      if (sjisCount >= 5) {
        blocks.push({ start: blockStart, end: i, count: sjisCount });
      }
      inBlock = false;
      sjisCount = 0;
    }
  }
  
  return blocks.sort((a, b) => b.count - a.count);
}

const sjisBlocks = findSJISBlocks();
console.log(`找到 ${sjisBlocks.length} 个SJIS文本块`);
sjisBlocks.slice(0, 10).forEach(b => {
  console.log(`  ${hex(b.start)}-${hex(b.end)}: ${b.count}个SJIS字符`);
});

// ============================================================
// 策略2: 分析标题画面VRAM中的文字tile
// ============================================================
console.log('\n--- 策略2: 分析标题画面文字tile ---');

function decodeNametableWord(word) {
  const tileIdx = word & 0x7FF;
  const palette = (word >> 12) & 0x0F;
  const flipH = (word >> 14) & 1;
  const flipV = (word >> 15) & 1;
  return { tileIdx, palette, flipH, flipV };
}

function decodeNametable(vramData, offset, width, height) {
  const entries = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const addr = offset + (y * width + x) * 2;
      const word = (vramData[addr] << 8) | vramData[addr + 1];
      entries.push({ x, y, ...decodeNametableWord(word) });
    }
  }
  return entries;
}

const titleNT = decodeNametable(vram, 0xC000, 64, 32);
const textTiles = new Set();
const textTileCoords = [];

for (const e of titleNT) {
  if (e.tileIdx >= 0x080 && e.tileIdx <= 0x7FF) {
    textTiles.add(e.tileIdx);
    textTileCoords.push(e);
  }
}

console.log(`标题画面文字区域 tile: ${textTiles.size} 个不同的tile`);

function decode4bppTile(tileBytes) {
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

function tileToAscii(pixels) {
  let s = '';
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const px = pixels[y * 8 + x];
      s += px === 0 ? ' ' : (px < 10 ? px.toString() : String.fromCharCode(px - 10 + 65));
    }
    s += '\n';
  }
  return s;
}

const sortedTextTiles = [...textTiles].sort((a, b) => a - b);
console.log('\n文字tile索引范围:', hex(sortedTextTiles[0]), '-', hex(sortedTextTiles[sortedTextTiles.length - 1]));

console.log('\n部分文字tile预览:');
for (let i = 0; i < Math.min(8, sortedTextTiles.length); i++) {
  const idx = sortedTextTiles[i];
  const tileBytes = vram.slice(idx * 32, idx * 32 + 32);
  const pixels = decode4bppTile(tileBytes);
  console.log(`Tile ${hex(idx, 3)}:`);
  console.log(tileToAscii(pixels));
}

// ============================================================
// 策略3: 在ROM中搜索4bpp tile模式
// ============================================================
console.log('--- 策略3: 在ROM中搜索4bpp tile模式 ---');

function searchTileInROM(tileBytes, maxHits = 5) {
  const hits = [];
  for (let off = 0; off < rom.length - 32; off++) {
    let match = true;
    for (let i = 0; i < 32; i++) {
      if (rom[off + i] !== tileBytes[i]) { match = false; break; }
    }
    if (match) {
      hits.push(off);
      if (hits.length >= maxHits) break;
    }
  }
  return hits;
}

const testTileIdx = sortedTextTiles[0];
const testTileBytes = vram.slice(testTileIdx * 32, testTileIdx * 32 + 32);
const hits = searchTileInROM(testTileBytes);

if (hits.length > 0) {
  console.log(`VRAM tile ${hex(testTileIdx, 3)} 在ROM中找到 ${hits.length} 个匹配:`);
  hits.forEach(h => console.log(`  ${hex(h)}`));
} else {
  console.log(`VRAM tile ${hex(testTileIdx, 3)} 在ROM中未找到匹配`);
  
  // 尝试搜索镜像/反转模式
  console.log('尝试搜索反转模式...');
  const reversed = new Uint8Array(32);
  for (let i = 0; i < 32; i++) reversed[i] = testTileBytes[31 - i];
  const revHits = searchTileInROM(reversed);
  if (revHits.length > 0) {
    console.log(`  反转模式找到 ${revHits.length} 个匹配:`);
    revHits.forEach(h => console.log(`    ${hex(h)}`));
  }
}

// ============================================================
// 策略4: 搜索ROM中的字符映射表
// ============================================================
console.log('\n--- 策略4: 搜索字符映射表 ---');

function findCharMappingTables() {
  const candidates = [];
  
  for (let addr = 0; addr < rom.length - 1024; addr += 2) {
    let validCount = 0;
    let maxTile = 0;
    
    for (let i = 0; i < 256; i += 2) {
      const tileIdx = RW(addr + i);
      if (tileIdx >= 0 && tileIdx <= 0x7FF) {
        validCount++;
        if (tileIdx > maxTile) maxTile = tileIdx;
      }
    }
    
    if (validCount >= 200 && maxTile >= 0x100) {
      candidates.push({ addr, validCount, maxTile });
    }
  }
  
  return candidates.sort((a, b) => b.validCount - a.validCount);
}

const charTables = findCharMappingTables();
console.log(`找到 ${charTables.length} 个潜在的字符映射表`);
charTables.slice(0, 5).forEach(t => {
  console.log(`  ${hex(t.addr)}: ${t.validCount}/256有效, maxTile=${hex(t.maxTile, 3)}`);
  
  const sample = [];
  for (let i = 0; i < 16; i++) {
    sample.push(RW(t.addr + i * 2));
  }
  console.log(`    前16个映射: ${sample.map(v => hex(v, 3)).join(' ')}`);
});

// ============================================================
// 策略5: 查看资源指针表中的大型资源
// ============================================================
console.log('\n--- 策略5: 查看大型资源 (可能包含字体) ---');

const TABLE = 0x0B0000;
const largeResources = [];

for (let entry = 0; entry < 512; entry++) {
  const ptr = RL(TABLE + entry * 4);
  if (ptr < 0x0B0000 || ptr >= rom.length - 4) continue;
  
  const type = rom[ptr];
  let size = 0;
  
  try {
    if (type === 1) size = RW(ptr + 1);
    else if (type === 2) {
      const planes = rom[ptr + 1] & 0x7F;
      size = RW(ptr + 2) * planes * 8;
    }
    else if (type === 3) size = RW(ptr + 1);
  } catch(e) {}
  
  if (size > 4096) {
    largeResources.push({ entry, type, ptr, size });
  }
}

largeResources.sort((a, b) => b.size - a.size);
console.log(`找到 ${largeResources.length} 个大于4KB的资源:`);
largeResources.slice(0, 10).forEach(r => {
  console.log(`  Entry ${r.entry.toString().padStart(3)}: type=${r.type}, ptr=${hex(r.ptr)}, size=${r.size} bytes`);
});

// ============================================================
// 策略6: 搜索DMA描述符队列 (Path B)
// ============================================================
console.log('\n--- 策略6: 搜索DMA描述符队列 ---');

function findDMADescriptors() {
  const descriptors = [];
  
  for (let addr = 0; addr < rom.length - 8; addr += 4) {
    const src = RL(addr);
    const dst = RL(addr + 4);
    
    if (src >= 0x000000 && src < rom.length &&
        dst >= 0x000000 && dst <= 0xFFFFF &&
        (dst & 0x80000) !== 0) {
      descriptors.push({ addr, src, dst });
    }
  }
  
  return descriptors;
}

const dmaDescriptors = findDMADescriptors();
console.log(`找到 ${dmaDescriptors.length} 个潜在的DMA描述符`);
dmaDescriptors.slice(0, 5).forEach(d => {
  console.log(`  ${hex(d.addr)}: src=${hex(d.src)} → dst=${hex(d.dst)}`);
});

// ============================================================
// 策略7: 查看已知文本区域附近的数据
// ============================================================
console.log('\n--- 策略7: 分析已知文本区域附近的数据 ---');

const TEXT_REGION_START = 0x0C0000;
const TEXT_REGION_SIZE = 0x40000;

console.log(`文本区域: ${hex(TEXT_REGION_START)} - ${hex(TEXT_REGION_START + TEXT_REGION_SIZE)}`);

let byteCounts = new Array(256).fill(0);
for (let i = 0; i < TEXT_REGION_SIZE; i++) {
  byteCounts[rom[TEXT_REGION_START + i]]++;
}

console.log('\n文本区域字节频率 (前20):');
const sortedBytes = byteCounts.map((cnt, val) => ({ val, cnt }))
  .sort((a, b) => b.cnt - a.cnt);
sortedBytes.slice(0, 20).forEach(b => {
  console.log(`  0x${b.val.toString(16).padStart(2, '0')}: ${b.cnt} 次`);
});

// ============================================================
// 策略8: 搜索可能的字体数据区
// ============================================================
console.log('\n--- 策略8: 搜索连续的tile数据区 ---');

function findTileBlocks(minTiles = 128) {
  const blocks = [];
  
  for (let addr = 0; addr < rom.length - minTiles * 32; addr += 32) {
    let validTiles = 0;
    
    for (let t = 0; t < minTiles; t++) {
      const tileAddr = addr + t * 32;
      let hasData = false;
      for (let i = 0; i < 32; i++) {
        if (rom[tileAddr + i] !== 0) { hasData = true; break; }
      }
      if (hasData) validTiles++;
    }
    
    if (validTiles >= minTiles * 0.7) {
      blocks.push({ addr, validTiles, total: minTiles });
    }
  }
  
  return blocks;
}

const tileBlocks = findTileBlocks(128);
console.log(`找到 ${tileBlocks.length} 个连续tile数据区`);
tileBlocks.slice(0, 10).forEach(b => {
  console.log(`  ${hex(b.addr)}: ${b.validTiles}/${b.total} 有数据`);
});

console.log('\n=== 搜索完成 ===');
