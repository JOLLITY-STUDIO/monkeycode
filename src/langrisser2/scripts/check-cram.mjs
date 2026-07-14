import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM原始字节数据 ===');
console.log(`CRAM大小: ${cram.length} 字节`);
console.log('');

for (let i = 0; i < 64; i++) {
  const addr = i * 2;
  const byte0 = cram[addr];
  const byte1 = cram[addr + 1];
  const wordLE = (byte1 << 8) | byte0;
  const wordBE = (byte0 << 8) | byte1;
  
  let desc = '';
  if (i === 4) desc = ' <-- 背景色';
  
  console.log(`CRAM[${i}]: byte0=0x${byte0.toString(16).padStart(2,'0')}, byte1=0x${byte1.toString(16).padStart(2,'0')}, LE=0x${wordLE.toString(16).padStart(4,'0')}, BE=0x${wordBE.toString(16).padStart(4,'0')}${desc}`);
}

console.log('');
console.log('=== CRAM解码测试 ===');

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = ((word >> 1) & 0x0F) * 17;
  const g = ((word >> 5) & 0x0F) * 17;
  const b = ((word >> 9) & 0x0F) * 17;
  return { r, g, b };
}

function decodeCRAM_BE(i) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  const r = ((word >> 1) & 0x0F) * 17;
  const g = ((word >> 5) & 0x0F) * 17;
  const b = ((word >> 9) & 0x0F) * 17;
  return { r, g, b };
}

function decodeCRAM_3bit(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

console.log('');
console.log('背景色 (CRAM[4]):');
const bgLE = decodeCRAM_LE(4);
const bgBE = decodeCRAM_BE(4);
const bg3bit = decodeCRAM_3bit(4);
console.log(`  LE解码: rgb(${bgLE.r},${bgLE.g},${bgLE.b})`);
console.log(`  BE解码: rgb(${bgBE.r},${bgBE.g},${bgBE.b})`);
console.log(`  3bit解码: rgb(${bg3bit.r},${bg3bit.g},${bg3bit.b})`);

console.log('');
console.log('=== 调色板3颜色 (Plane B使用) ===');
for (let i = 0; i < 16; i++) {
  const c = decodeCRAM_LE(48 + i);
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}
