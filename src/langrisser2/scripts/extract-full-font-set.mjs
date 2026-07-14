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

console.log('=== 提取完整字体集 ===\n');

// ============================================================
// 资源指针表和解压函数
// ============================================================
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

// ============================================================
// 查看0x08223a和0x0822ba处的数据
// ============================================================
console.log('--- 查看0x08223a和0x0822ba处的数据 ---');

const ptrs = [0x08223a, 0x0822ba, 0x08233a];

for (const ptr of ptrs) {
  console.log(`\n地址 ${hex(ptr)} 处的64字节:`);
  const data = rom.slice(ptr, ptr + 64);
  console.log(Array.from(data).map(b => b.toString(16).padStart(2, '0')).join(' '));
  
  // 尝试作为tile数据解析
  const tileCount = Math.floor(64 / 32);
  for (let i = 0; i < tileCount; i++) {
    const tileBytes = data.slice(i * 32, (i + 1) * 32);
    const pixels = decodeTile4BPP(tileBytes);
    const hasData = pixels.some(p => p !== 0);
    console.log(`  Tile ${i}: ${hasData ? '有数据' : '空'}`);
  }
}

// ============================================================
// 查看ROM中更大范围的字体数据区域
// ============================================================
console.log('\n--- 查看ROM中0x082000附近的字体数据区域 ---');

const FONT_REGION_START = 0x082000;
const FONT_REGION_SIZE = 0x1000;

const regionData = rom.slice(FONT_REGION_START, FONT_REGION_START + FONT_REGION_SIZE);

console.log(`区域: ${hex(FONT_REGION_START)} - ${hex(FONT_REGION_START + FONT_REGION_SIZE)}`);

// 按32字节tile分析
const tileCount = Math.floor(FONT_REGION_SIZE / 32);
let nonEmptyCount = 0;

for (let i = 0; i < tileCount; i++) {
  const tileBytes = regionData.slice(i * 32, (i + 1) * 32);
  const hasData = tileBytes.some(b => b !== 0);
  if (hasData) nonEmptyCount++;
}

console.log(`总tile数: ${tileCount}, 非空tile数: ${nonEmptyCount}`);

// ============================================================
// 从资源0x8001提取字体
// ============================================================
console.log('\n--- 从资源0x8001提取字体 ---');

const resourceId = 0x8001;
const resourcePtr = resolveResource(resourceId);
const type = RB(resourcePtr);
const decompressed = decompressLZSS(resourcePtr);
const resTileCount = Math.floor(decompressed.size / 32);

console.log(`资源 ${hex(resourceId)}: ${resTileCount} 个 tile`);

const tiles = [];
for (let i = 0; i < resTileCount; i++) {
  const tileBytes = decompressed.data.slice(i * 32, i * 32 + 32);
  tiles.push(decodeTile4BPP(tileBytes));
}

// ============================================================
// 假名字符表分析
// ============================================================
console.log('\n--- 假名字符表分析 ---');

const KANA_TABLE_ADDR = 0x082114;
const KANA_TABLE_SIZE = 0x100;

const kanaData = [];
for (let i = 0; i < KANA_TABLE_SIZE; i++) {
  kanaData.push(RB(KANA_TABLE_ADDR + i));
}

// 已知的假名顺序
const KNOWN_KANA = [
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', '', 'ユ', '', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', '', '', '', 'ン',
];

const charMap = new Map();

for (let i = 0; i < KNOWN_KANA.length; i++) {
  const char = KNOWN_KANA[i];
  if (!char) continue;
  
  const tileIdx = kanaData[i];
  if (tileIdx !== 0 && tileIdx !== 0xFF) {
    charMap.set(char, tileIdx);
  }
}

console.log('构建的假名字符映射:');
for (const [char, idx] of charMap) {
  console.log(`  '${char}' → tile 0x${idx.toString(16).padStart(3, '0')}`);
}

// ============================================================
// 渲染所有假名字体
// ============================================================
console.log('\n--- 渲染假名字体预览 ---');

const maxTileIdx = Math.max(...charMap.values());
console.log(`最大tile索引: 0x${maxTileIdx.toString(16).padStart(3, '0')}`);

// 需要的tile数量
const neededTileCount = maxTileIdx + 1;
console.log(`需要 ${neededTileCount} 个 tile`);

// 创建完整的tile数组
const fullTiles = new Array(neededTileCount).fill(null);

// 从资源0x8001填充
for (let i = 0; i < Math.min(resTileCount, neededTileCount); i++) {
  fullTiles[i] = tiles[i];
}

// 检查哪些tile还需要
const missingTiles = [];
for (const [char, idx] of charMap) {
  if (idx >= resTileCount) {
    missingTiles.push({ char, idx });
  }
}

console.log(`\n需要从其他资源获取的tile (${missingTiles.length}个):`);
missingTiles.forEach(m => {
  console.log(`  '${m.char}' → tile 0x${m.idx.toString(16).padStart(3, '0')}`);
});

// ============================================================
// 搜索ROM中的其他字体资源
// ============================================================
console.log('\n--- 搜索ROM中的其他字体资源 ---');

const searchStart = 0x082000;
const searchEnd = 0x084000;

const fontBlocks = [];

for (let addr = searchStart; addr < searchEnd - 128; addr += 128) {
  let nonEmpty = 0;
  for (let i = 0; i < 128; i += 32) {
    const tileBytes = rom.slice(addr + i, addr + i + 32);
    if (tileBytes.some(b => b !== 0)) nonEmpty++;
  }
  if (nonEmpty >= 2) {
    fontBlocks.push({ addr, nonEmpty });
  }
}

console.log(`找到 ${fontBlocks.length} 个可能的字体数据块`);
fontBlocks.slice(0, 10).forEach(b => {
  console.log(`  ${hex(b.addr)}: ${b.nonEmpty}/4 tile有数据`);
});

// ============================================================
// 尝试从ROM 0x08223a开始提取更多字体
// ============================================================
console.log('\n--- 从ROM 0x08223a提取字体 ---');

const extraFontStart = 0x08223a;
const extraFontSize = 0x800;

const extraData = rom.slice(extraFontStart, extraFontStart + extraFontSize);
const extraTileCount = Math.floor(extraFontSize / 32);

console.log(`提取 ${extraTileCount} 个 tile`);

for (let i = 0; i < Math.min(extraTileCount, 32); i++) {
  const tileBytes = extraData.slice(i * 32, (i + 1) * 32);
  const pixels = decodeTile4BPP(tileBytes);
  const hasData = pixels.some(p => p !== 0);
  if (hasData) {
    console.log(`  Tile ${i}: 有数据`);
  }
}

// ============================================================
// 渲染完整字体图集
// ============================================================
console.log('\n--- 渲染字体图集 ---');

const canvas = createCanvas(16 * 8, Math.ceil(tiles.length / 16) * 8);
const ctx = canvas.getContext('2d');
const img = ctx.createImageData(16 * 8, Math.ceil(tiles.length / 16) * 8);

const palette = [];
for (let i = 0; i < 16; i++) {
  palette.push([i * 17, i * 17, i * 17]);
}

for (let ti = 0; ti < tiles.length; ti++) {
  const tx = ti % 16;
  const ty = Math.floor(ti / 16);
  const tile = tiles[ti];
  
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      const ci = tile[py * 8 + px];
      const ix = ((ty * 8 + py) * 128 + (tx * 8 + px)) * 4;
      
      if (ci === 0) {
        img.data[ix + 3] = 0;
      } else {
        const c = palette[ci] || [255, 0, 255];
        img.data[ix] = c[0];
        img.data[ix + 1] = c[1];
        img.data[ix + 2] = c[2];
        img.data[ix + 3] = 255;
      }
    }
  }
}

ctx.putImageData(img, 0, 0);
const outputPath = path.join(OUTPUT_DIR, 'font-resource-8001-tiles.png');
fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
console.log(`已保存字体图集: ${outputPath}`);

console.log('\n=== 提取完成 ===');
console.log('');
console.log('总结:');
console.log(`- 资源0x8001包含 ${resTileCount} 个字体tile`);
console.log(`- 假名字符表引用了 ${charMap.size} 个假名`);
console.log(`- 需要从其他资源获取 ${missingTiles.length} 个tile`);
console.log(`- 字体编码是自定义tile索引编码，不是Shift-JIS`);
