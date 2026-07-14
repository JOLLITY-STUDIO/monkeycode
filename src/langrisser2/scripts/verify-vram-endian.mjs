import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_B_BASE = 0xE000;

console.log('=== MD VRAM字节序验证 ===');
console.log('');
console.log('MD VDP Nametable格式:');
console.log('  每个条目16位: Bit15(优先级), Bit14-13(调色板), Bit12(H翻转), Bit11(V翻转), Bit10-0(Tile索引)');
console.log('');

console.log('=== 标题区域 (行6-9, 列4-17) ===');
console.log('');

console.log('小端序解码 (字节1=LSB, 字节2=MSB):');
console.log('格式: 行,列 | 原始数据 | 解码值 | 调色板 | Tile索引');
for (let row = 6; row < 10; row++) {
  for (let col = 4; col < 8; col++) {
    const offset = PLANE_B_BASE + row * 64 + col * 2;
    const lo = vram[offset];
    const hi = vram[offset + 1];
    const word = (hi << 8) | lo;
    const paletteIdx = (word >> 13) & 3;
    const tileIdx = word & 0x7FF;
    console.log(`  ${row},${col} | 0x${lo.toString(16).padStart(2,'0')} 0x${hi.toString(16).padStart(2,'0')} | 0x${word.toString(16).padStart(4,'0')} | 调色板${paletteIdx} | ${tileIdx}`);
  }
}

console.log('');
console.log('大端序解码 (字节1=MSB, 字节2=LSB):');
console.log('格式: 行,列 | 原始数据 | 解码值 | 调色板 | Tile索引');
for (let row = 6; row < 10; row++) {
  for (let col = 4; col < 8; col++) {
    const offset = PLANE_B_BASE + row * 64 + col * 2;
    const lo = vram[offset];
    const hi = vram[offset + 1];
    const word = (lo << 8) | hi;
    const paletteIdx = (word >> 13) & 3;
    const tileIdx = word & 0x7FF;
    console.log(`  ${row},${col} | 0x${lo.toString(16).padStart(2,'0')} 0x${hi.toString(16).padStart(2,'0')} | 0x${word.toString(16).padStart(4,'0')} | 调色板${paletteIdx} | ${tileIdx}`);
  }
}

console.log('');
console.log('=== 关键分析 ===');
console.log('');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAM_LE(i, scale) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * scale;
  const g = ((word >> 3) & 0x07) * scale;
  const b = ((word >> 6) & 0x07) * scale;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i, 36));
}

console.log('调色板2颜色 (缩放36):');
for (let i = 0; i < 16; i++) {
  const c = palette[32 + i];
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('调色板3颜色 (缩放36):');
for (let i = 0; i < 16; i++) {
  const c = palette[48 + i];
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 标题画面字母区域特征 ===');
console.log('');
console.log('目标截图字母颜色: rgb(59,30,41)');
console.log('这是一个偏暗红/紫色调的颜色');
console.log('');

console.log('调色板2的颜色更偏向红色系');
console.log('调色板3的颜色更偏向紫色/蓝色系');
console.log('');
console.log('如果小端序使用调色板3，颜色会偏紫');
console.log('如果大端序使用调色板2，颜色会偏红');
console.log('');
console.log('根据截图颜色rgb(59,30,41)，更接近紫色系，说明可能应该使用调色板3');
console.log('这意味着VRAM应该使用小端序解码！');
