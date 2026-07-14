import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createCanvas } from 'canvas';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');

const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM 字节序分析 ===');
console.log('');

console.log('CRAM 文件原始字节 (前 16 字节):');
for (let i = 0; i < 16; i++) {
  console.log(`  CRAM[${i}]: 0x${cram[i].toString(16).padStart(2, '0')}`);
}
console.log('');

console.log('=== 两种字节序对比 ===');

function decodeBigEndian(i) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  return word;
}

function decodeLittleEndian(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return word;
}

console.log('颜色索引 | Big-Endian | Little-Endian');
console.log('---------|-------------|--------------');
for (let i = 0; i < 8; i++) {
  const be = decodeBigEndian(i);
  const le = decodeLittleEndian(i);
  console.log(`    ${i}     |   0x${be.toString(16).padStart(4, '0')}   |   0x${le.toString(16).padStart(4, '0')}`);
}
console.log('');

function cramToRgb(word) {
  const r = ((word >> 1) & 7) * 36;
  const g = ((word >> 4) & 7) * 36;
  const b = ((word >> 7) & 7) * 36;
  return { r, g, b };
}

console.log('=== Little-Endian 解码 ===');
for (let i = 0; i < 16; i++) {
  const word = decodeLittleEndian(i);
  const color = cramToRgb(word);
  const binary = word.toString(2).padStart(16, '0');
  console.log(`颜色 ${i}: 0x${word.toString(16).padStart(4, '0')} = ${binary} -> rgb(${color.r},${color.g},${color.b})`);
}
console.log('');

const color0_le = cramToRgb(decodeLittleEndian(0));
const color1_le = cramToRgb(decodeLittleEndian(1));
const color3_le = cramToRgb(decodeLittleEndian(3));
console.log(`颜色 0 (背景): rgb(${color0_le.r},${color0_le.g},${color0_le.b})`);
console.log(`颜色 1 (边框): rgb(${color1_le.r},${color1_le.g},${color1_le.b})`);
console.log(`颜色 3 (亮色): rgb(${color3_le.r},${color3_le.g},${color3_le.b})`);
console.log('');

console.log('=== 重新渲染标题画面 (Little-Endian CRAM) ===');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 224;
const TILE_SIZE = 8;
const TILES_X = SCREEN_WIDTH / TILE_SIZE;
const TILES_Y = SCREEN_HEIGHT / TILE_SIZE;

const canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
const ctx = canvas.getContext('2d');

const palette = [];
for (let i = 0; i < 64; i++) {
  if (i * 2 + 1 < cram.length) {
    const word = decodeLittleEndian(i);
    palette.push(cramToRgb(word));
  } else {
    palette.push({ r: 0, g: 0, b: 0 });
  }
}

const bgColor = palette[0];
ctx.fillStyle = `rgb(${bgColor.r},${bgColor.g},${bgColor.b})`;
ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

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
        if (color) {
          ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
        } else {
          ctx.fillStyle = '#000';
        }
        ctx.fillRect(tx * 8 + px, ty * 8 + py, 1, 1);
      }
    }
  }
}

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/title-screen-le.png');
import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));
console.log('输出:', OUT_PATH);
console.log('');
console.log('=== 如果还是不对，可能的问题 ===');
console.log('1. Nametable 地址不正确');
console.log('2. VDP 寄存器配置需要考虑');
console.log('3. 显示模式可能不是标准模式');
console.log('4. 需要从真实模拟器获取 VDP 寄存器值');