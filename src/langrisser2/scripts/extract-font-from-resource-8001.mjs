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

console.log('=== 从资源 0x8001 提取字体数据 ===\n');

// ============================================================
// 资源指针表查找
// ============================================================
const RESOURCE_TABLE = 0x0B0000;

function resolveResource(resourceId) {
  const shiftCount = (resourceId & 0xFFFF) % 64;
  const index = (resourceId & 0x7FFF) >> shiftCount;
  const entryAddr = RESOURCE_TABLE + index * 4;
  return RL(entryAddr);
}

const resourceId = 0x8001;
const resourcePtr = resolveResource(resourceId);
console.log(`资源 ${hex(resourceId)}: 指针=${hex(resourcePtr)}`);

const type = RB(resourcePtr);
console.log(`资源类型: ${type}`);

// ============================================================
// Type 3: LZSS 解压
// ============================================================
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
  return { data: output, size: decompressedSize, type: 3 };
}

// ============================================================
// Type 2: 位平面压缩
// ============================================================
function decompressType2(addr) {
  const b1 = RB(addr + 1);
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;
  
  if (!compressed) {
    const size = RW(addr + 2);
    const outputSize = size * planes * 8;
    const data = new Uint8Array(outputSize);
    for (let i = 0; i < outputSize; i++) {
      data[i] = RB(addr + 4 + i);
    }
    return { data, size: outputSize, type: 2, planes };
  }
  
  const lut = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = RB(addr + 2 + i);
    lut[i * 2] = (b >> 4) & 0xf;
    lut[i * 2 + 1] = b & 0xf;
  }
  
  const sz = RW(addr + 10);
  let pc = planes;
  if (pc !== 2) pc ^= 5;
  
  const ctrlStart = addr + 12;
  const pixelStart = ctrlStart + sz;
  const outSize = sz * planes * 8;
  const bpt = pc * 8 * planes;
  const tc = Math.floor(sz / pc);
  
  const out = new Uint8Array(outSize);
  let cp = ctrlStart;
  let pp = pixelStart;
  
  for (let t = 0; t < tc; t++) {
    const wb = new Uint8Array(bpt);
    let wp = 0;
    
    for (let pl = 0; pl < pc; pl++) {
      const cb = RB(cp++);
      for (let bt = 7; bt >= 0; bt--) {
        if ((cb >> bt) & 1) {
          for (let p = 0; p < planes; p++) wb[wp++] = RB(pp++);
        } else {
          for (let p = 0; p < planes; p++) wb[wp++] = 0;
        }
      }
    }
    
    const to = new Uint8Array(32);
    let ow = 0;
    const np = Math.min(pc, 4);
    
    for (let outer = 0; outer < 4; outer++) {
      const ps = [];
      for (let p = 0; p < np; p++) {
        const bo = (outer + p * 4) * 2;
        ps.push((wb[bo] << 8) | wb[bo + 1]);
      }
      
      for (let inner = 0; inner < 4; inner++) {
        let pix = 0;
        for (let px = 0; px < 4; px++) {
          const b0 = np > 0 ? (ps[0] & 0x8000 ? 1 : 0) : 0;
          const b1 = np > 1 ? (ps[1] & 0x8000 ? 1 : 0) : 0;
          const b2 = np > 2 ? (ps[2] & 0x8000 ? 1 : 0) : 0;
          const b3 = np > 3 ? (ps[3] & 0x8000 ? 1 : 0) : 0;
          pix = (pix << 4) | lut[(b3 << 3) | (b1 << 2) | (b2 << 1) | b0];
          for (let p = 0; p < np; p++) ps[p] = (ps[p] << 1) & 0xFFFF;
        }
        to[ow * 2] = (pix >> 8) & 0xFF;
        to[ow * 2 + 1] = pix & 0xFF;
        ow++;
      }
    }
    
    out.set(to, t * 32);
  }
  
  return { data: out, size: outSize, type: 2, planes };
}

// ============================================================
// 解压资源 0x8001
// ============================================================
let decompressed = null;

try {
  if (type === 3) {
    decompressed = decompressLZSS(resourcePtr);
  } else if (type === 2) {
    decompressed = decompressType2(resourcePtr);
  }
} catch(e) {
  console.error('解压失败:', e);
  process.exit(1);
}

if (!decompressed) {
  console.error('无法解压资源');
  process.exit(1);
}

console.log(`解压后大小: ${decompressed.size} 字节`);
if (decompressed.planes !== undefined) {
  console.log(`位平面数: ${decompressed.planes}`);
}

const tileCount = Math.floor(decompressed.size / 32);
console.log(`Tile 数量: ${tileCount}`);

// ============================================================
// 解码4bpp tile
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

// ============================================================
// 渲染tile图集
// ============================================================
function renderTiles(tiles, cols = 16) {
  if (tiles.length === 0) return null;
  const rows = Math.ceil(tiles.length / cols);
  const canvas = createCanvas(cols * 8, rows * 8);
  const ctx = canvas.getContext('2d');
  const img = ctx.createImageData(cols * 8, rows * 8);
  
  const palette = [];
  for (let i = 0; i < 16; i++) {
    palette.push([i * 17, i * 17, i * 17]);
  }
  
  for (let ti = 0; ti < tiles.length; ti++) {
    const tx = ti % cols;
    const ty = Math.floor(ti / cols);
    const tile = tiles[ti];
    
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const ci = tile[py * 8 + px];
        const ix = ((ty * 8 + py) * (cols * 8) + (tx * 8 + px)) * 4;
        
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
  return canvas;
}

// ============================================================
// 提取所有tile并渲染
// ============================================================
const tiles = [];
const nonEmptyTiles = [];
const nonEmptyIndices = [];

for (let i = 0; i < tileCount; i++) {
  const tileBytes = decompressed.data.slice(i * 32, i * 32 + 32);
  const pixels = decodeTile4BPP(tileBytes);
  tiles.push(pixels);
  
  const hasData = pixels.some(p => p !== 0);
  if (hasData) {
    nonEmptyTiles.push(pixels);
    nonEmptyIndices.push(i);
  }
}

console.log(`非空 tile 数量: ${nonEmptyTiles.length}/${tileCount}`);

const canvas = renderTiles(nonEmptyTiles, 16);
if (canvas) {
  const outputPath = path.join(OUTPUT_DIR, 'font-resource-8001-all-tiles.png');
  fs.writeFileSync(outputPath, canvas.toBuffer('image/png'));
  console.log(`\n已保存字体图集: ${outputPath}`);
}

// ============================================================
// 分析假名字符映射表 (ROM 0x082114)
// ============================================================
console.log('\n--- 分析假名字符映射表 (ROM 0x082114) ---');

const KANA_TABLE_ADDR = 0x082114;
const KANA_TABLE_SIZE = 0x100;

const kanaData = [];
for (let i = 0; i < KANA_TABLE_SIZE; i++) {
  kanaData.push(RB(KANA_TABLE_ADDR + i));
}

console.log(`假名字符表: ${hex(KANA_TABLE_ADDR)} - ${hex(KANA_TABLE_ADDR + KANA_TABLE_SIZE)}`);
console.log(`数据长度: ${KANA_TABLE_SIZE} 字节`);

console.log('\n前64个条目 (索引: tile索引):');
for (let i = 0; i < 64; i++) {
  if (i % 16 === 0) console.log('');
  const tileIdx = kanaData[i];
  process.stdout.write(` ${i.toString().padStart(2)}:${tileIdx.toString(16).padStart(2, '0')}`);
}
console.log('');

// ============================================================
// 尝试从假名字符表反向构建字符映射
// ============================================================
console.log('\n--- 尝试构建字符映射 ---');

const KNOWN_KANA = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', 'ユ', 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヲ', 'ン',
];

const charMap = new Map();

for (let i = 0; i < KNOWN_KANA.length && i < KANA_TABLE_SIZE; i++) {
  const tileIdx = kanaData[i];
  if (tileIdx !== 0) {
    charMap.set(KNOWN_KANA[i], tileIdx);
  }
}

console.log('构建的假名字符映射:');
for (const [char, idx] of charMap) {
  console.log(`  '${char}' → tile 0x${idx.toString(16).padStart(3, '0')}`);
}

// ============================================================
// 渲染假名字体预览
// ============================================================
console.log('\n--- 渲染假名字体预览 ---');

const kanaTiles = [];
for (const [char, idx] of charMap) {
  if (idx < tiles.length) {
    kanaTiles.push({ char, tile: tiles[idx] });
  }
}

const kanaCanvas = createCanvas(10 * 8, 5 * 8);
const kanaCtx = kanaCanvas.getContext('2d');
const kanaImg = kanaCtx.createImageData(10 * 8, 5 * 8);

const grayPalette = [];
for (let i = 0; i < 16; i++) {
  grayPalette.push([i * 17, i * 17, i * 17]);
}

for (let i = 0; i < kanaTiles.length; i++) {
  const tx = i % 10;
  const ty = Math.floor(i / 10);
  const tile = kanaTiles[i].tile;
  
  for (let py = 0; py < 8; py++) {
    for (let px = 0; px < 8; px++) {
      const ci = tile[py * 8 + px];
      const ix = ((ty * 8 + py) * 80 + (tx * 8 + px)) * 4;
      
      if (ci === 0) {
        kanaImg.data[ix + 3] = 0;
      } else {
        const c = grayPalette[ci] || [255, 0, 255];
        kanaImg.data[ix] = c[0];
        kanaImg.data[ix + 1] = c[1];
        kanaImg.data[ix + 2] = c[2];
        kanaImg.data[ix + 3] = 255;
      }
    }
  }
}

kanaCtx.putImageData(kanaImg, 0, 0);

const kanaOutputPath = path.join(OUTPUT_DIR, 'font-kana-preview.png');
fs.writeFileSync(kanaOutputPath, kanaCanvas.toBuffer('image/png'));
console.log(`已保存假名字体预览: ${kanaOutputPath}`);

// ============================================================
// 导出字体数据为TypeScript
// ============================================================
console.log('\n--- 导出字体数据为TypeScript ---');

const fontData = {
  tileWidth: 8,
  tileHeight: 8,
  tileCount: tiles.length,
  nonEmptyCount: nonEmptyTiles.length,
  kanaMapping: Array.from(charMap.entries()).map(([char, idx]) => ({ char, tileIdx: idx })),
};

const tsContent = `export const FontData8001 = {
  tileWidth: ${fontData.tileWidth},
  tileHeight: ${fontData.tileHeight},
  tileCount: ${fontData.tileCount},
  nonEmptyCount: ${fontData.nonEmptyCount},
  kanaMapping: ${JSON.stringify(fontData.kanaMapping, null, 2)},
};

export const FontTiles8001 = new Uint8Array([
${tiles.map(tile => '  ' + Array.from(tile).join(', ') + ',').join('\n')}
]);
`;

const tsOutputPath = path.join(__dirname, '..', 'game', 'data', 'FontData8001.ts');
fs.writeFileSync(tsOutputPath, tsContent);
console.log(`已导出字体数据: ${tsOutputPath}`);

console.log('\n=== 提取完成 ===');
console.log('');
console.log('关键发现:');
console.log(`- 资源 0x8001 包含 ${tileCount} 个 tile`);
console.log(`- 其中 ${nonEmptyTiles.length} 个非空 tile`);
console.log(`- 假名字符表在 ROM 0x082114, 包含 ${charMap.size} 个假名映射`);
console.log(`- 字体编码是自定义 tile 索引, 不是 Shift-JIS`);
