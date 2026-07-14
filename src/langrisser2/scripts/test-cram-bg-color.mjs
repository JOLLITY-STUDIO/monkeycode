import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM 背景色分析 ===');
console.log('目标背景色: rgb(0,0,72)');
console.log('');

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

function decodeCRAM_BE(i) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

function decodeCRAM_Gens(i) {
  const byte0 = cram[i * 2];
  const byte1 = cram[i * 2 + 1];
  const b = (byte0 >> 5) & 7;
  const g = (byte0 >> 2) & 7;
  const r2r1 = byte0 & 3;
  const r0 = (byte1 >> 7) & 1;
  const r = r2r1 | (r0 << 2);
  return {
    r: r * 36,
    g: g * 36,
    b: b * 36,
  };
}

console.log('=== Little-Endian 解码 (标准) ===');
for (let i = 0; i < 32; i++) {
  const c = decodeCRAM_LE(i);
  console.log(`CRAM[${i}]: rgb(${c.r},${c.g},${c.b})`);
  if (c.r === 0 && c.g === 0 && c.b === 72) {
    console.log(`  ⭐ 匹配目标背景色!`);
  }
}

console.log('');
console.log('=== Big-Endian 解码 ===');
for (let i = 0; i < 32; i++) {
  const c = decodeCRAM_BE(i);
  console.log(`CRAM[${i}]: rgb(${c.r},${c.g},${c.b})`);
  if (c.r === 0 && c.g === 0 && c.b === 72) {
    console.log(`  ⭐ 匹配目标背景色!`);
  }
}

console.log('');
console.log('=== Gens格式解码 (r0单独) ===');
for (let i = 0; i < 32; i++) {
  const c = decodeCRAM_Gens(i);
  console.log(`CRAM[${i}]: rgb(${c.r},${c.g},${c.b})`);
  if (c.r === 0 && c.g === 0 && c.b === 72) {
    console.log(`  ⭐ 匹配目标背景色!`);
  }
}

console.log('');
console.log('=== 原始CRAM字节 ===');
for (let i = 0; i < 64; i += 2) {
  console.log(`CRAM[${i}]=0x${cram[i].toString(16).padStart(2,'0')}, CRAM[${i+1}]=0x${cram[i+1].toString(16).padStart(2,'0')}`);
}

console.log('');
console.log('=== 寻找 rgb(0,0,72) 即 B=2 ===');
console.log('B=2 意味着蓝色通道值为 2 (0x02), 乘以36得到72');
console.log('');
console.log('标准LE格式中 B位在 bit6-8');
for (let i = 0; i < 64; i++) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const b = (word >> 6) & 7;
  const g = (word >> 3) & 7;
  const r = word & 7;
  if (b === 2 && g === 0 && r === 0) {
    console.log(`CRAM[${i}]: word=0x${word.toString(16).padStart(4,'0')}, BGR=(2,0,0) -> rgb(0,0,72) ⭐`);
  }
}

console.log('');
console.log('=== 尝试不同缩放系数 ===');
for (const scale of [32, 36, 40, 42, 44]) {
  console.log(`缩放系数 ×${scale}:`);
  for (let i = 0; i < 8; i++) {
    const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
    const r = ((word & 0x07) * scale).toString().padStart(3);
    const g = (((word >> 3) & 0x07) * scale).toString().padStart(3);
    const b = (((word >> 6) & 0x07) * scale).toString().padStart(3);
    console.log(`  CRAM[${i}]: rgb(${r},${g},${b})`);
  }
}
