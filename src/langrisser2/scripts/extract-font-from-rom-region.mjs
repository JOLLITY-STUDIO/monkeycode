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

console.log('=== 从ROM区域提取字体数据 ===\n');

// ============================================================
// 从ROM 0x082000区域提取字体
// ============================================================
console.log('--- 从ROM 0x082000区域提取字体 ---');

const FONT_REGION_START = 0x082000;
const FONT_REGION_SIZE = 0x2000;

const regionData = rom.slice(FONT_REGION_START, FONT_REGION_START + FONT_REGION_SIZE);
const tileCount = Math.floor(FONT_REGION_SIZE / 32);

console.log(`区域: ${hex(FONT_REGION_START)} - ${hex(FONT_REGION_START + FONT_REGION_SIZE)}`);
console.log(`Tile数量: ${tileCount}`);

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
let nonEmptyCount = 0;

for (let i = 0; i < tileCount; i++) {
  const tileBytes = regionData.slice(i * 32, (i + 1) * 32);
  const pixels = decodeTile4BPP(tileBytes);
  tiles.push(pixels);
  
  if (pixels.some(p => p !== 0)) nonEmptyCount++;
}

console.log(`非空tile数量: ${nonEmptyCount}`);

// ============================================================
// 渲染字体图集
// ============================================================
console.log('\n--- 渲染字体图集 ---');

const canvas = createCanvas(16 * 8, Math.ceil(tileCount / 16) * 8);
const ctx = canvas.getContext('2d');
const img = ctx.createImageData(16 * 8, Math.ceil(tileCount / 16) * 8);

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
const outputPath = path.join(OUTPUT_DIR, 'font-rom-region-082000.png');
fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
console.log(`已保存字体图集: ${outputPath}`);

// ============================================================
// 分析假名字符表
// ============================================================
console.log('\n--- 分析假名字符表 ---');

const KANA_TABLE_ADDR = 0x082114;
const KANA_TABLE_SIZE = 0x100;

const kanaData = [];
for (let i = 0; i < KANA_TABLE_SIZE; i++) {
  kanaData.push(RB(KANA_TABLE_ADDR + i));
}

const tileIndices = new Set();
for (const val of kanaData) {
  if (val !== 0 && val !== 0xFF) {
    tileIndices.add(val);
  }
}

console.log(`假名字符表引用的tile索引范围: ${Math.min(...tileIndices)} - ${Math.max(...tileIndices)}`);
console.log(`唯一tile索引数量: ${tileIndices.size}`);

const sortedIndices = [...tileIndices].sort((a, b) => a - b);
console.log('引用的tile索引:');
console.log(sortedIndices.map(i => '0x' + i.toString(16).padStart(3, '0')).join(', '));

// ============================================================
// 构建完整的字符映射
// ============================================================
console.log('\n--- 构建完整的字符映射 ---');

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

console.log(`构建的假名字符映射 (${charMap.size}个):`);
for (const [char, idx] of charMap) {
  console.log(`  '${char}' → tile 0x${idx.toString(16).padStart(3, '0')}`);
}

// ============================================================
// 导出完整字体数据
// ============================================================
console.log('\n--- 导出完整字体数据 ---');

const OUTPUT_DIR_TS = path.join(__dirname, '..', 'game', 'data');

const maxTileIdx = Math.max(...tileIndices);
const neededTileCount = maxTileIdx + 1;

console.log(`最大tile索引: 0x${maxTileIdx.toString(16).padStart(3, '0')}`);
console.log(`需要 ${neededTileCount} 个 tile`);

const fullTiles = new Array(neededTileCount).fill(null);

for (let i = 0; i < Math.min(tiles.length, neededTileCount); i++) {
  fullTiles[i] = tiles[i];
}

const missingIndices = [];
for (const idx of tileIndices) {
  if (idx >= tiles.length) {
    missingIndices.push(idx);
  }
}

if (missingIndices.length > 0) {
  console.log(`\n警告: 以下tile索引超出ROM区域范围:`);
  missingIndices.forEach(idx => console.log(`  0x${idx.toString(16).padStart(3, '0')}`));
}

const tsContent = `export interface FontChar {
  char: string;
  tileIdx: number;
}

export const FontData8001 = {
  tileWidth: 8,
  tileHeight: 8,
  tileCount: ${neededTileCount},
  charMapping: ${JSON.stringify(Array.from(charMap.entries()).map(([char, idx]) => ({ char, tileIdx: idx })), null, 2)},
};

export const FontTiles8001 = new Uint8Array([
${fullTiles.map((tile, i) => {
  if (!tile) {
    return '  ' + '0, '.repeat(63) + '0,';
  }
  return '  ' + Array.from(tile).join(', ') + ',';
}).join('\n')}
]);
`;

const tsOutputPath = path.join(OUTPUT_DIR_TS, 'FontData8001.ts');
fs.writeFileSync(tsOutputPath, tsContent);

console.log(`\n已导出字体数据到: ${tsOutputPath}`);
console.log('\n=== 提取完成 ===');
