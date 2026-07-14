import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

function decodeTileRowMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

function decodeTilePlaneMajor(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let plane = 0; plane < 4; plane++) {
    const planeOffset = offset + plane * 8;
    for (let y = 0; y < 8; y++) {
      const byte = vram[planeOffset + y];
      for (let x = 0; x < 8; x++) {
        const bit = 7 - x;
        if ((byte >> bit) & 1) {
          pixels[y * 8 + x] |= (1 << plane);
        }
      }
    }
  }
  return pixels;
}

console.log('=== 标题区域Tile颜色分析 ===');
console.log('');

const titleTiles = [505, 504, 503, 502, 501, 500, 499, 498, 520, 519, 518, 517, 516, 515, 514, 472, 534, 533, 532, 531, 530, 529, 548, 547, 546, 545, 544, 543];

console.log('行优先解码:');
console.log('Tile | 使用颜色索引');
console.log('-----|-------------');
const allColorsRow = new Set();
for (const idx of titleTiles) {
  const tile = decodeTileRowMajor(idx);
  const colors = new Set();
  for (let i = 0; i < 64; i++) {
    if (tile[i] !== 0) colors.add(tile[i]);
  }
  const colorList = Array.from(colors).sort((a,b)=>a-b);
  console.log(`${idx.toString().padStart(4)} | ${colorList.join(', ')}`);
  for (const c of colors) allColorsRow.add(c);
}
console.log(`\n行优先解码总共使用颜色: ${Array.from(allColorsRow).sort((a,b)=>a-b).join(', ')}`);

console.log('');
console.log('位平面优先解码:');
console.log('Tile | 使用颜色索引');
console.log('-----|-------------');
const allColorsPlane = new Set();
for (const idx of titleTiles) {
  const tile = decodeTilePlaneMajor(idx);
  const colors = new Set();
  for (let i = 0; i < 64; i++) {
    if (tile[i] !== 0) colors.add(tile[i]);
  }
  const colorList = Array.from(colors).sort((a,b)=>a-b);
  console.log(`${idx.toString().padStart(4)} | ${colorList.join(', ')}`);
  for (const c of colors) allColorsPlane.add(c);
}
console.log(`\n位平面优先解码总共使用颜色: ${Array.from(allColorsPlane).sort((a,b)=>a-b).join(', ')}`);

console.log('');
console.log('=== 调色板3颜色对应 ===');
const palette3Colors = {
  0: { r: 0,   g: 0,   b: 0   },
  1: { r: 144, g: 180, b: 108 },
  2: { r: 0,   g: 36,  b: 108 },
  3: { r: 216, g: 144, b: 72  },
  4: { r: 144, g: 0,   b: 72  },
  5: { r: 72,  g: 144, b: 36  },
  6: { r: 0,   g: 0,   b: 36  },
  7: { r: 0,   g: 144, b: 0   },
  8: { r: 216, g: 36,  b: 0   },
  9: { r: 216, g: 36,  b: 0   },
  10: { r: 216, g: 36,  b: 0   },
  11: { r: 216, g: 36,  b: 0   },
  12: { r: 216, g: 36,  b: 0   },
  13: { r: 216, g: 36,  b: 0   },
  14: { r: 0,   g: 144, b: 0   },
  15: { r: 216, g: 180, b: 108 }
};

console.log('');
console.log('行优先解码颜色对应的RGB:');
for (const ci of Array.from(allColorsRow).sort((a,b)=>a-b)) {
  const c = palette3Colors[ci];
  console.log(`  颜色${ci}: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('位平面优先解码颜色对应的RGB:');
for (const ci of Array.from(allColorsPlane).sort((a,b)=>a-b)) {
  const c = palette3Colors[ci];
  console.log(`  颜色${ci}: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 计算平均颜色 ===');
console.log('行优先解码:');
let totalR = 0, totalG = 0, totalB = 0, count = 0;
for (const idx of titleTiles) {
  const tile = decodeTileRowMajor(idx);
  for (let i = 0; i < 64; i++) {
    if (tile[i] !== 0) {
      const c = palette3Colors[tile[i]];
      totalR += c.r; totalG += c.g; totalB += c.b; count++;
    }
  }
}
console.log(`  平均RGB: rgb(${Math.round(totalR/count)},${Math.round(totalG/count)},${Math.round(totalB/count)})`);

console.log('');
console.log('位平面优先解码:');
totalR = 0; totalG = 0; totalB = 0; count = 0;
for (const idx of titleTiles) {
  const tile = decodeTilePlaneMajor(idx);
  for (let i = 0; i < 64; i++) {
    if (tile[i] !== 0) {
      const c = palette3Colors[tile[i]];
      totalR += c.r; totalG += c.g; totalB += c.b; count++;
    }
  }
}
console.log(`  平均RGB: rgb(${Math.round(totalR/count)},${Math.round(totalG/count)},${Math.round(totalB/count)})`);

console.log('');
console.log('截图字母区域: rgb(59,30,41)');
