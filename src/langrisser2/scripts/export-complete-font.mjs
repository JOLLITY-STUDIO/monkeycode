import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.join(__dirname, '..', '20260713');
const ROM_FILE = path.join(BASE, 'Langrisser II (Japan).md');

const rom = new Uint8Array(fs.readFileSync(ROM_FILE));

const RL = (o) => ((rom[o] << 24) | (rom[o + 1] << 16) | (rom[o + 2] << 8) | rom[o + 3]) >>> 0;
const RW = (o) => ((rom[o] << 8) | rom[o + 1]);
const RB = (o) => rom[o];

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
  return output;
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

console.log('=== 导出完整字体数据 ===\n');

const resourceId = 0x8001;
const resourcePtr = resolveResource(resourceId);
const type = RB(resourcePtr);

console.log(`资源 0x${resourceId.toString(16)}: 指针=0x${resourcePtr.toString(16)}, 类型=${type}`);

const decompressed = decompressLZSS(resourcePtr);
const tileCount = Math.floor(decompressed.length / 32);

console.log(`解压后大小: ${decompressed.length} 字节`);
console.log(`Tile数量: ${tileCount}`);

const tiles = [];
for (let i = 0; i < tileCount; i++) {
  const tileBytes = decompressed.slice(i * 32, i * 32 + 32);
  tiles.push(decodeTile4BPP(tileBytes));
}

console.log('\n--- 分析假名字符表 ---');

const KANA_TABLE_ADDR = 0x082114;
const KANA_TABLE_SIZE = 0x100;

const kanaData = new Uint8Array(KANA_TABLE_SIZE);
for (let i = 0; i < KANA_TABLE_SIZE; i++) {
  kanaData[i] = RB(KANA_TABLE_ADDR + i);
}

const tileIndices = new Set();
for (const val of kanaData) {
  if (val !== 0 && val !== 0xFF) {
    tileIndices.add(val);
  }
}

console.log(`假名字符表引用的tile索引范围: ${Math.min(...tileIndices)} - ${Math.max(...tileIndices)}`);
console.log(`唯一tile索引数量: ${tileIndices.size}`);

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

console.log(`\n构建的假名字符映射 (${charMap.size}个):`);
for (const [char, idx] of charMap) {
  console.log(`  '${char}' → tile 0x${idx.toString(16).padStart(3, '0')}`);
}

const OUTPUT_DIR = path.join(__dirname, '..', 'game', 'data');

const tsContent = `export interface FontChar {
  char: string;
  tileIdx: number;
}

export const FontData8001 = {
  tileWidth: 8,
  tileHeight: 8,
  tileCount: ${tileCount},
  charMapping: ${JSON.stringify(Array.from(charMap.entries()).map(([char, idx]) => ({ char, tileIdx: idx })), null, 2)},
};

export const FontTiles8001 = new Uint8Array([
${tiles.map(tile => '  ' + Array.from(tile).join(', ') + ',').join('\n')}
]);
`;

const outputPath = path.join(OUTPUT_DIR, 'FontData8001.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`\n已导出字体数据到: ${outputPath}`);
console.log('\n=== 导出完成 ===');
