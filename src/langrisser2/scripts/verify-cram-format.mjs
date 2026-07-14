import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');

const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM 颜色格式详细分析 ===');
console.log('');

console.log('Genesis VDP CRAM 格式:');
console.log('  每个颜色条目 = 16-bit word');
console.log('  bit 15-10: 未使用');
console.log('  bit 9-7:   Blue (3 bits)');
console.log('  bit 6-4:   Green (3 bits)');
console.log('  bit 3-1:   Red (3 bits)');
console.log('  bit 0:     未使用');
console.log('');

function cramToRgb_std(word) {
  const r = ((word >> 1) & 7);
  const g = ((word >> 4) & 7);
  const b = ((word >> 7) & 7);
  return { r: r * 36, g: g * 36, b: b * 36 };
}

console.log('=== 所有颜色条目解码 ===');
for (let i = 0; i < 32; i++) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  const color = cramToRgb_std(word);
  const binary = word.toString(2).padStart(16, '0');
  console.log(`颜色 ${i}: 0x${word.toString(16).padStart(4, '0')} = ${binary} -> rgb(${color.r},${color.g},${color.b})`);
}
console.log('');

const canvas = createCanvas(32 * 20, 40);
const ctx = canvas.getContext('2d');

for (let i = 0; i < 32; i++) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  const color = cramToRgb_std(word);
  ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
  ctx.fillRect(i * 20, 0, 20, 30);
  ctx.fillStyle = '#fff';
  ctx.font = '10px monospace';
  ctx.fillText(i.toString(), i * 20 + 5, 38);
}

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/cram-palette.png');
import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));
console.log('调色板预览:', OUT_PATH);
console.log('');

console.log('=== 关键观察 ===');
const color0 = cramToRgb_std((cram[0] << 8) | cram[1]);
const color1 = cramToRgb_std((cram[2] << 8) | cram[3]);
const color3 = cramToRgb_std((cram[6] << 8) | cram[7]);
console.log(`颜色 0 (通常是背景): rgb(${color0.r},${color0.g},${color0.b})`);
console.log(`颜色 1 (通常是边框): rgb(${color1.r},${color1.g},${color1.b})`);
console.log(`颜色 3 (亮颜色): rgb(${color3.r},${color3.g},${color3.b})`);
console.log('');

console.log('=== 用正确格式重新渲染标题画面 ===');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 224;
const TILE_SIZE = 8;
const TILES_X = SCREEN_WIDTH / TILE_SIZE;
const TILES_Y = SCREEN_HEIGHT / TILE_SIZE;

const screenCanvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
const screenCtx = screenCanvas.getContext('2d');

const bgColor = cramToRgb_std((cram[0] << 8) | cram[1]);
screenCtx.fillStyle = `rgb(${bgColor.r},${bgColor.g},${bgColor.b})`;
screenCtx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

const palette = [];
for (let i = 0; i < 32; i++) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  palette.push(cramToRgb_std(word));
}

const nametableOffset = 0x4000;

for (let ty = 0; ty < TILES_Y; ty++) {
  for (let tx = 0; tx < TILES_X; tx++) {
    const nametableIndex = ty * TILES_X + tx;
    const nametableAddr = nametableOffset + nametableIndex * 2;
    
    if (nametableAddr + 2 > vram.length) continue;
    
    const nametableEntry = (vram[nametableAddr] << 8) | vram[nametableAddr + 1];
    const tileIndex = nametableEntry & 0x3FF;
    const paletteLine = (nametableEntry >> 13) & 3;
    const hFlip = (nametableEntry >> 12) & 1;
    const vFlip = (nametableEntry >> 11) & 1;
    
    const tileOffset = tileIndex * 32;
    if (tileOffset + 32 > vram.length) continue;
    
    const tile = vram.slice(tileOffset, tileOffset + 32);
    
    const basePaletteIndex = paletteLine * 16;
    
    for (let py = 0; py < 8; py++) {
      for (let px = 0; px < 8; px++) {
        const x = hFlip ? 7 - px : px;
        const y = vFlip ? 7 - py : py;
        
        const bit = 7 - x;
        const p0 = (tile[y * 4 + 0] >> bit) & 1;
        const p1 = ((tile[y * 4 + 1] >> bit) & 1) << 1;
        const p2 = ((tile[y * 4 + 2] >> bit) & 1) << 2;
        const p3 = ((tile[y * 4 + 3] >> bit) & 1) << 3;
        const colorIndex = p0 | p1 | p2 | p3;
        
        const color = palette[basePaletteIndex + colorIndex];
        screenCtx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
        screenCtx.fillRect(tx * 8 + px, ty * 8 + py, 1, 1);
      }
    }
  }
}

const SCREEN_OUT = join(ROOT, 'src/langrisser2/20260713/output/title-screen-fixed.png');
import('fs').then(fs => fs.writeFileSync(SCREEN_OUT, screenCanvas.toBuffer('image/png')));
console.log('修正后的标题画面:', SCREEN_OUT);
console.log('');
console.log('=== 检查 VRAM 其他区域 ===');
console.log('VRAM 0x0000-0x0FFF (Tile 0-63):');
let tilesWithData = 0;
for (let i = 0; i < 64; i++) {
  const offset = i * 32;
  let hasData = false;
  for (let j = 0; j < 32; j++) {
    if (vram[offset + j] !== 0) { hasData = true; break; }
  }
  if (hasData) tilesWithData++;
}
console.log(`  有数据的 tile: ${tilesWithData}/64`);
console.log('');
console.log('VRAM 0x8000-0x8FFF (可能的 Plane B):');
let planeBData = 0;
for (let i = 0; i < 4096; i++) {
  if (vram[0x8000 + i] !== 0) planeBData++;
}
console.log(`  非零字节: ${planeBData}/4096`);