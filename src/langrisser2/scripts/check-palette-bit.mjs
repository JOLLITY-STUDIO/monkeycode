import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_B_BASE = 0xE000;

console.log('=== MD Nametable条目格式详解 ===');
console.log('');
console.log('MD Nametable条目是16位大端序:');
console.log('  Bit 15:    优先级 (0=低, 1=高)');
console.log('  Bit 14-13: 调色板索引 (0-3)');
console.log('  Bit 12:    H翻转');
console.log('  Bit 11:    V翻转');
console.log('  Bit 10-0:  Tile索引');
console.log('');
console.log('VRAM存储格式:');
console.log('  如果是大端序(MSB在前): 字节1=Bit15-8, 字节2=Bit7-0');
console.log('  如果是小端序(LSB在前): 字节1=Bit7-0, 字节2=Bit15-8');
console.log('');

const ntOffset = PLANE_B_BASE + 6 * 64 + 4 * 2;
const byte1 = vram[ntOffset];
const byte2 = vram[ntOffset + 1];

console.log(`位置(6,4)的VRAM数据:`);
console.log(`  字节1: 0x${byte1.toString(16).padStart(2,'0')} = ${byte1.toString(2).padStart(8,'0')}`);
console.log(`  字节2: 0x${byte2.toString(16).padStart(2,'0')} = ${byte2.toString(2).padStart(8,'0')}`);
console.log('');

console.log('小端序解码 (字节1=LSB, 字节2=MSB):');
console.log(`  条目 = (字节2 << 8) | 字节1 = 0x${((byte2 << 8) | byte1).toString(16).padStart(4,'0')}`);
console.log(`  二进制: ${((byte2 << 8) | byte1).toString(2).padStart(16,'0')}`);
console.log(`  Bit15: ${((byte2 << 8) | byte1) >> 15 & 1}`);
console.log(`  Bit14-13: ${(((byte2 << 8) | byte1) >> 13) & 3} (调色板${(((byte2 << 8) | byte1) >> 13) & 3})`);
console.log(`  Bit12: ${(((byte2 << 8) | byte1) >> 12) & 1}`);
console.log(`  Bit11: ${(((byte2 << 8) | byte1) >> 11) & 1}`);
console.log(`  Bit10-0: ${((byte2 << 8) | byte1) & 0x7FF}`);
console.log('');

console.log('大端序解码 (字节1=MSB, 字节2=LSB):');
console.log(`  条目 = (字节1 << 8) | 字节2 = 0x${((byte1 << 8) | byte2).toString(16).padStart(4,'0')}`);
console.log(`  二进制: ${((byte1 << 8) | byte2).toString(2).padStart(16,'0')}`);
console.log(`  Bit15: ${((byte1 << 8) | byte2) >> 15 & 1}`);
console.log(`  Bit14-13: ${(((byte1 << 8) | byte2) >> 13) & 3} (调色板${(((byte1 << 8) | byte2) >> 13) & 3})`);
console.log(`  Bit12: ${(((byte1 << 8) | byte2) >> 12) & 1}`);
console.log(`  Bit11: ${(((byte1 << 8) | byte2) >> 11) & 1}`);
console.log(`  Bit10-0: ${((byte1 << 8) | byte2) & 0x7FF}`);
console.log('');

console.log('=== 标题区域所有条目的调色板位 ===');
console.log('');

console.log('小端序:');
let paletteCountsLE = {};
for (let row = 6; row < 10; row++) {
  for (let col = 4; col < 18; col++) {
    const offset = PLANE_B_BASE + row * 64 + col * 2;
    const lo = vram[offset];
    const hi = vram[offset + 1];
    const entry = (hi << 8) | lo;
    const paletteIdx = (entry >> 13) & 3;
    paletteCountsLE[paletteIdx] = (paletteCountsLE[paletteIdx] || 0) + 1;
  }
}
console.log('调色板使用:', paletteCountsLE);

console.log('');
console.log('大端序:');
let paletteCountsBE = {};
for (let row = 6; row < 10; row++) {
  for (let col = 4; col < 18; col++) {
    const offset = PLANE_B_BASE + row * 64 + col * 2;
    const lo = vram[offset];
    const hi = vram[offset + 1];
    const entry = (lo << 8) | hi;
    const paletteIdx = (entry >> 13) & 3;
    paletteCountsBE[paletteIdx] = (paletteCountsBE[paletteIdx] || 0) + 1;
  }
}
console.log('调色板使用:', paletteCountsBE);

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i));
}

console.log('');
console.log('=== 调色板1颜色 ===');
for (let i = 0; i < 16; i++) {
  const c = palette[16 + i];
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 调色板2颜色 ===');
for (let i = 0; i < 16; i++) {
  const c = palette[32 + i];
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 调色板3颜色 ===');
for (let i = 0; i < 16; i++) {
  const c = palette[48 + i];
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}
