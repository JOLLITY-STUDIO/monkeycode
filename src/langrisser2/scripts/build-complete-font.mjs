import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', '20260713');
const ROM_FILE = path.join(BASE, 'Langrisser II (Japan).md');

const rom = new Uint8Array(fs.readFileSync(ROM_FILE));

const RL = (o) => ((rom[o] << 24) | (rom[o + 1] << 16) | (rom[o + 2] << 8) | rom[o + 3]) >>> 0;
const RB = (o) => rom[o];

console.log('=== 构建完整字体系统 ===\n');

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

const FONT_REGION_START = 0x082000;
const FONT_REGION_SIZE = 0x2000;

const regionData = rom.slice(FONT_REGION_START, FONT_REGION_START + FONT_REGION_SIZE);
const tileCount = Math.floor(FONT_REGION_SIZE / 32);

console.log(`从ROM 0x${FONT_REGION_START.toString(16)}提取 ${tileCount} 个tile`);

const tiles = [];
for (let i = 0; i < tileCount; i++) {
  const tileBytes = regionData.slice(i * 32, (i + 1) * 32);
  tiles.push(decodeTile4BPP(tileBytes));
}

const RESOURCE_TABLE = 0x0B0000;

function resolveResource(resourceId) {
  const shiftCount = (resourceId & 0xFFFF) % 64;
  const index = (resourceId & 0x7FFF) >> shiftCount;
  const entryAddr = RESOURCE_TABLE + index * 4;
  return RL(entryAddr);
}

function decompressLZSS(addr) {
  const headerAddr = addr + 1;
  const decompressedSize = ((rom[headerAddr] << 8) | rom[headerAddr + 1]);
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
  return output;
}

console.log('\n--- 从资源0x8001提取字体 ---');

const resourceId = 0x8001;
const resourcePtr = resolveResource(resourceId);
const decompressed = decompressLZSS(resourcePtr);
const resourceTileCount = Math.floor(decompressed.length / 32);

console.log(`资源0x8001: ${resourceTileCount} 个tile`);

for (let i = 0; i < resourceTileCount; i++) {
  const tileBytes = decompressed.slice(i * 32, (i + 1) * 32);
  if (i < tiles.length) {
    tiles[i] = decodeTile4BPP(tileBytes);
  }
}

console.log('\n--- 分析假名字符表 ---');

const KANA_TABLE_ADDR = 0x082114;

const kanaData = [];
for (let i = 0; i < 0x100; i++) {
  kanaData.push(RB(KANA_TABLE_ADDR + i));
}

const KATAKANA_FULL = [
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

for (let i = 0; i < KATAKANA_FULL.length; i++) {
  const char = KATAKANA_FULL[i];
  if (!char) continue;
  
  const tileIdx = kanaData[i];
  if (tileIdx !== 0 && tileIdx !== 0xFF) {
    charMap.set(char, tileIdx);
  }
}

console.log(`假名字符映射: ${charMap.size}个`);

const POINTER_TABLE_ADDR = 0x0821BE;
const pointers = [];
for (let i = 0; i < 32; i++) {
  pointers.push(RL(POINTER_TABLE_ADDR + i * 4));
}

const KATAKANA_LIST = [
  'ァ', 'ア', 'ィ', 'イ', 'ゥ', 'ウ', 'ェ', 'エ', 'ォ', 'オ',
  'カ', 'ガ', 'キ', 'ギ', 'ク', 'グ', 'ケ', 'ゲ', 'コ', 'ゴ',
  'サ', 'ザ', 'シ', 'ジ', 'ス', 'ズ', 'セ', 'ゼ', 'ソ', 'ゾ',
  'タ', 'ダ',
];

const pointerGroups = new Map();
for (let i = 0; i < pointers.length; i++) {
  const ptr = pointers[i];
  if (!pointerGroups.has(ptr)) {
    pointerGroups.set(ptr, []);
  }
  pointerGroups.get(ptr).push(i);
}

for (const [ptr, indices] of pointerGroups) {
  if (ptr === 0) continue;
  
  const data = [];
  for (let i = 0; i < 64; i++) {
    data.push(RB(ptr + i));
  }
  
  for (let i = 0; i < indices.length; i++) {
    const idx = indices[i];
    const char = KATAKANA_LIST[idx];
    if (!char) continue;
    
    const tileIdx = data[i];
    if (tileIdx !== 0 && tileIdx !== 0xFF) {
      charMap.set(char, tileIdx);
    }
  }
}

console.log(`完整字符映射: ${charMap.size}个`);

const OUTPUT_DIR = path.join(__dirname, '..', 'game', 'data');

const sortedChars = [...charMap.keys()].sort();
const charMappingArray = sortedChars.map(char => ({
  char,
  tileIdx: charMap.get(char)
}));

const tsContent = `export interface FontChar {
  char: string;
  tileIdx: number;
}

export interface FontTile {
  pixels: Uint8Array;
  width: number;
  height: number;
}

export const FontData8001 = {
  tileWidth: 8,
  tileHeight: 8,
  tileCount: ${tiles.length},
  charMapping: ${JSON.stringify(charMappingArray, null, 2)},
};

export const FontTiles8001: FontTile[] = [
${tiles.map((tile, i) => {
  const pixels = Array.from(tile).join(', ');
  return `  { pixels: new Uint8Array([${pixels}]), width: 8, height: 8 },`;
}).join('\n')}
];
`;

const outputPath = path.join(OUTPUT_DIR, 'FontData8001.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`\n已导出字体数据到: ${outputPath}`);
console.log('\n=== 构建完成 ===');
