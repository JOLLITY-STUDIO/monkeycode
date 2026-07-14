import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM字节序测试 ===');
console.log('');

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b, word };
}

function decodeCRAM_BE(i) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b, word };
}

function decodeCRAM_LE_HIGH(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = ((word >> 8) & 0x07) * 36;
  const g = ((word >> 11) & 0x07) * 36;
  const b = ((word >> 14) & 0x07) * 36;
  return { r, g, b, word };
}

function decodeCRAM_BE_HIGH(i) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  const r = ((word >> 8) & 0x07) * 36;
  const g = ((word >> 11) & 0x07) * 36;
  const b = ((word >> 14) & 0x07) * 36;
  return { r, g, b, word };
}

function decodeCRAM_MD(i) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  const r = ((word >> 5) & 0x07) * 36;
  const g = ((word >> 8) & 0x07) * 36;
  const b = ((word >> 11) & 0x07) * 36;
  return { r, g, b, word };
}

const tests = [
  { name: '小端序(低位)', fn: decodeCRAM_LE },
  { name: '大端序(低位)', fn: decodeCRAM_BE },
  { name: '小端序(高位)', fn: decodeCRAM_LE_HIGH },
  { name: '大端序(高位)', fn: decodeCRAM_BE_HIGH },
  { name: 'MD标准格式', fn: decodeCRAM_MD },
];

console.log('背景色 CRAM[4] (期望: rgb(0,0,72)):');
console.log('');
for (const test of tests) {
  const c = test.fn(4);
  console.log(`${test.name}: 0x${c.word.toString(16).padStart(4,'0')} -> rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('调色板3颜色4 (期望: 紫色):');
console.log('');
for (const test of tests) {
  const c = test.fn(52);
  console.log(`${test.name}: 0x${c.word.toString(16).padStart(4,'0')} -> rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('调色板3颜色8 (期望: 橙色):');
console.log('');
for (const test of tests) {
  const c = test.fn(56);
  console.log(`${test.name}: 0x${c.word.toString(16).padStart(4,'0')} -> rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== MD CRAM格式说明 ===');
console.log('MD CRAM每个条目16位:');
console.log('  bit 15-14: 未使用');
console.log('  bit 13-11: Blue (3位)');
console.log('  bit 10-8:  Green (3位)');
console.log('  bit 7-5:   Red (3位)');
console.log('  bit 4-0:   未使用');
