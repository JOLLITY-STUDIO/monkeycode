import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');

const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const PPM_PATH = join(ROOT, 'src/langrisser2/resource-0-tiles.ppm');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));
const ppm = readFileSync(PPM_PATH);

console.log('=== 对比 VRAM Tile 和 PPM 文件 ===');
console.log('');

function decodeLittleEndian(i) {
  return (cram[i * 2 + 1] << 8) | cram[i * 2];
}

function cramToRgb(word) {
  const r = ((word >> 1) & 7) * 36;
  const g = ((word >> 4) & 7) * 36;
  const b = ((word >> 7) & 7) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  if (i * 2 + 1 < cram.length) {
    palette.push(cramToRgb(decodeLittleEndian(i)));
  } else {
    palette.push({ r: 0, g: 0, b: 0 });
  }
}

console.log('--- PPM 文件解析 ---');
const ppmHeaderEnd = ppm.indexOf(0x0a, ppm.indexOf(0x0a) + 1) + 1;
const ppmData = ppm.slice(ppmHeaderEnd);
const ppmWidth = 256;
const ppmHeight = 16;

console.log('PPM 尺寸:', ppmWidth, 'x', ppmHeight);
console.log('PPM 数据大小:', ppmData.length);
console.log('');

console.log('--- 对比 Tile 0-63 (VRAM vs PPM) ---');
const canvas = createCanvas(512, 256);
const ctx = canvas.getContext('2d');

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let matchCount = 0;
let mismatchCount = 0;

for (let tileIdx = 0; tileIdx < 64; tileIdx++) {
  const vramOffset = tileIdx * 32;
  const tile = vram.slice(vramOffset, vramOffset + 32);
  
  const ppmTileX = tileIdx % 32;
  const ppmTileY = Math.floor(tileIdx / 32);
  
  let hasData = false;
  for (let i = 0; i < 32; i++) {
    if (tile[i] !== 0) { hasData = true; break; }
  }
  
  if (hasData) {
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const bit = 7 - px;
        const p0 = (tile[py * 4 + 0] >> bit) & 1;
        const p1 = ((tile[py * 4 + 1] >> bit) & 1) << 1;
        const p2 = ((tile[py * 4 + 2] >> bit) & 1) << 2;
        const p3 = ((tile[py * 4 + 3] >> bit) & 1) << 3;
        const colorIndex = p0 | p1 | p2 | p3;
        
        const color = palette[colorIndex];
        
        const ppmPixelOffset = ((ppmTileY * 8 + py) * ppmWidth + (ppmTileX * 8 + px)) * 3;
        const ppmR = ppmData[ppmPixelOffset];
        const ppmG = ppmData[ppmPixelOffset + 1];
        const ppmB = ppmData[ppmPixelOffset + 2];
        
        let match = false;
        if (Math.abs(color.r - ppmR) < 10 && 
            Math.abs(color.g - ppmG) < 10 && 
            Math.abs(color.b - ppmB) < 10) {
          match = true;
          matchCount++;
        } else {
          mismatchCount++;
        }
        
        const outputX = tileIdx % 16 * 32;
        const outputY = Math.floor(tileIdx / 16) * 32;
        
        ctx.fillStyle = match ? `rgb(${color.r},${color.g},${color.b})` : '#f00';
        ctx.fillRect(outputX + px, outputY + py, 1, 1);
        
        if (!match) {
          ctx.fillStyle = '#fff';
          ctx.font = '6px monospace';
          ctx.fillText(`M`, outputX + px, outputY + py);
        }
      }
    }
  }
}

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/tile-compare.png');
import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));

console.log('对比结果:');
console.log(`  匹配像素: ${matchCount}`);
console.log(`  不匹配像素: ${mismatchCount}`);
console.log(`  匹配率: ${((matchCount / (matchCount + mismatchCount)) * 100).toFixed(2)}%`);
console.log('');
console.log('输出:', OUT_PATH);
console.log('红色像素表示与 PPM 不匹配');
console.log('');

console.log('--- 手动检查单个 Tile ---');
const checkTile = 1;
const checkOffset = checkTile * 32;
const checkTileData = vram.slice(checkOffset, checkOffset + 32);

console.log(`Tile ${checkTile} 解码:`);
for (let y = 0; y < 8; y++) {
  let row = '';
  for (let x = 0; x < 8; x++) {
    const bit = 7 - x;
    const p0 = (checkTileData[y * 4 + 0] >> bit) & 1;
    const p1 = ((checkTileData[y * 4 + 1] >> bit) & 1) << 1;
    const p2 = ((checkTileData[y * 4 + 2] >> bit) & 1) << 2;
    const p3 = ((checkTileData[y * 4 + 3] >> bit) & 1) << 3;
    const colorIndex = p0 | p1 | p2 | p3;
    row += colorIndex.toString(16);
  }
  console.log(`  ${row}`);
}
console.log('');

console.log('PPM 中对应位置 (Tile 1 = 列1, 行0):');
const ppmTileX = 1;
const ppmTileY = 0;
for (let py = 0; py < 8; py++) {
  let row = '';
  for (let px = 0; px < 8; px++) {
    const ppmPixelOffset = ((ppmTileY * 8 + py) * ppmWidth + (ppmTileX * 8 + px)) * 3;
    const ppmR = ppmData[ppmPixelOffset];
    const ppmG = ppmData[ppmPixelOffset + 1];
    const ppmB = ppmData[ppmPixelOffset + 2];
    row += `(${ppmR},${ppmG},${ppmB}) `;
  }
  console.log(`  ${row}`);
}
console.log('');

console.log('=== 关键结论 ===');
if (mismatchCount === 0) {
  console.log('✅ Tile 解码和颜色格式完全正确！');
} else {
  console.log('❌ 存在不匹配，可能原因:');
  console.log('   1. CRAM 颜色格式仍不正确');
  console.log('   2. PPM 文件使用的调色板与当前 CRAM 不同');
  console.log('   3. Tile 解码算法有误');
  console.log('   4. 需要用真实模拟器截图作为 ground truth');
}