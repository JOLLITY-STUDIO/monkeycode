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

console.log('=== 分步验证: Tile 解码和 CRAM 颜色 ===');
console.log('');

console.log('--- 1. CRAM 原始数据分析 ---');
console.log('CRAM 大小:', cram.length, 'bytes');
console.log('CRAM 前 16 个颜色条目:');
for (let i = 0; i < 16; i++) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  console.log(`  颜色 ${i}: 0x${word.toString(16).padStart(4, '0')} = ${word.toString(2).padStart(16, '0')}`);
}
console.log('');

console.log('--- 2. CRAM 颜色格式测试 ---');
console.log('Genesis CRAM 格式: 9-bit BGR');
console.log('不同解码方式对比:');

function cramToRgb_v1(word) {
  const b = ((word >> 9) & 7) * 36;
  const g = ((word >> 5) & 7) * 36;
  const r = ((word >> 1) & 7) * 36;
  return { r, g, b };
}

function cramToRgb_v2(word) {
  const r = ((word >> 1) & 7) * 36;
  const g = ((word >> 4) & 7) * 36;
  const b = ((word >> 7) & 7) * 36;
  return { r, g, b };
}

function cramToRgb_v3(word) {
  const b = ((word >> 9) & 7) * 36;
  const g = ((word >> 6) & 7) * 36;
  const r = ((word >> 3) & 7) * 36;
  return { r, g, b };
}

function cramToRgb_v4(word) {
  const r = ((word >> 3) & 7) * 36;
  const g = ((word >> 6) & 7) * 36;
  const b = ((word >> 9) & 7) * 36;
  return { r, g, b };
}

const testWord = (cram[0] << 8) | cram[1];
console.log(`测试颜色 0x${testWord.toString(16)}:`);
console.log(`  v1 (b>>9,g>>5,r>>1):`, cramToRgb_v1(testWord));
console.log(`  v2 (r>>1,g>>4,b>>7):`, cramToRgb_v2(testWord));
console.log(`  v3 (b>>9,g>>6,r>>3):`, cramToRgb_v3(testWord));
console.log(`  v4 (r>>3,g>>6,b>>9):`, cramToRgb_v4(testWord));
console.log('');

console.log('--- 3. Tile 数据分析 ---');
console.log('VRAM 大小:', vram.length, 'bytes');
console.log('');

const tileIndex = 1;
const tileOffset = tileIndex * 32;
const tile = vram.slice(tileOffset, tileOffset + 32);

console.log(`Tile ${tileIndex} 原始数据 (32 bytes):`);
for (let i = 0; i < 8; i++) {
  let row = '';
  for (let j = 0; j < 4; j++) {
    row += tile[i * 4 + j].toString(16).padStart(2, '0').toUpperCase() + ' ';
  }
  console.log(`  行 ${i}: ${row}`);
}
console.log('');

console.log('--- 4. Tile 解码验证 ---');
console.log('Genesis tile 格式: 4bpp, 4位平面交错');
console.log('每行 4 字节 = 4 个位平面');
console.log('每个像素 = bit0 | bit1<<1 | bit2<<2 | bit3<<3');
console.log('');

const palette = [];
for (let i = 0; i < 16; i++) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  palette.push(cramToRgb_v4(word));
}

console.log('使用格式 v4 (r>>3,g>>6,b>>9) 渲染 Tile 1:');
const canvas = createCanvas(8, 8);
const ctx = canvas.getContext('2d');

for (let y = 0; y < 8; y++) {
  let rowBits = '';
  for (let x = 0; x < 8; x++) {
    const bit = 7 - x;
    const p0 = (tile[y * 4 + 0] >> bit) & 1;
    const p1 = ((tile[y * 4 + 1] >> bit) & 1) << 1;
    const p2 = ((tile[y * 4 + 2] >> bit) & 1) << 2;
    const p3 = ((tile[y * 4 + 3] >> bit) & 1) << 3;
    const colorIndex = p0 | p1 | p2 | p3;
    rowBits += colorIndex.toString(16);
    
    const color = palette[colorIndex];
    ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
    ctx.fillRect(x, y, 1, 1);
  }
  console.log(`  行 ${y}: ${rowBits} (颜色索引)`);
}
console.log('');

const OUT_PATH = join(ROOT, 'src/langrisser2/20260713/output/tile-1-decode.png');
import('fs').then(fs => fs.writeFileSync(OUT_PATH, canvas.toBuffer('image/png')));
console.log('Tile 1 渲染输出:', OUT_PATH);
console.log('');

console.log('--- 5. PPM 文件分析 ---');
console.log('PPM 头:', ppm.slice(0, 20).toString('ascii'));
const ppmHeader = ppm.slice(0, ppm.indexOf(0x0a));
console.log('PPM 完整头:', ppmHeader.toString('ascii'));
console.log('PPM 文件大小:', ppm.length);
console.log('');

console.log('--- 6. Nametable 分析 ---');
console.log('VRAM 0x4000 区域前 32 字节 (16 个条目):');
for (let i = 0; i < 16; i++) {
  const addr = 0x4000 + i * 2;
  const entry = (vram[addr] << 8) | vram[addr + 1];
  const tileIdx = entry & 0x3FF;
  const paletteLine = (entry >> 13) & 3;
  const hFlip = (entry >> 12) & 1;
  const vFlip = (entry >> 11) & 1;
  console.log(`  条目 ${i}: 0x${entry.toString(16).padStart(4, '0')} -> tile=${tileIdx}, palette=${paletteLine}, h=${hFlip}, v=${vFlip}`);
}
console.log('');

console.log('--- 7. 问题排查 ---');
console.log('可能的问题:');
console.log('1. CRAM 颜色格式是否正确？');
console.log('2. Nametable 地址是否正确？');
console.log('3. Tile 解码算法是否正确？');
console.log('4. 是否需要考虑 VDP 寄存器配置？');
console.log('');
console.log('建议: 用正确的颜色格式重新渲染整屏');
console.log('标准 Genesis CRAM: bits[10-8]=B, bits[7-5]=G, bits[4-2]=R');
console.log('即: r=((word>>2)&7), g=((word>>5)&7), b=((word>>8)&7)');