import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log(`CRAM文件大小: ${cram.length} 字节`);
console.log('');

console.log('=== CRAM前128字节 (标准CRAM大小) ===');
for (let i = 0; i < 128; i += 16) {
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(cram[i + j].toString(16).padStart(2, '0'));
  }
  console.log(`${i.toString(16).padStart(4,'0')}: ${line.join(' ')}`);
}

console.log('');
console.log('=== CRAM后128字节 (128-255) ===');
for (let i = 128; i < 256; i += 16) {
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(cram[i + j].toString(16).padStart(2, '0'));
  }
  console.log(`${i.toString(16).padStart(4,'0')}: ${line.join(' ')}`);
}

console.log('');
console.log('=== 检查是否重复 ===');
let allSame = true;
for (let i = 0; i < 128; i++) {
  if (cram[i] !== cram[i + 128]) {
    allSame = false;
    break;
  }
}
console.log(`前128字节与后128字节相同: ${allSame}`);

console.log('');
console.log('=== 检查CRAM[4]的可能值 ===');
console.log(`CRAM[8]=0x${cram[8].toString(16)}, CRAM[9]=0x${cram[9].toString(16)}`);
console.log(`小端序: 0x${(cram[9] << 8 | cram[8]).toString(16).padStart(4,'0')}`);
console.log(`大端序: 0x${(cram[8] << 8 | cram[9]).toString(16).padStart(4,'0')}`);
console.log('');

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07);
  const g = ((word >> 3) & 0x07);
  const b = ((word >> 6) & 0x07);
  return { r, g, b, word };
}

console.log('=== 所有调色板颜色 (小端序, 位0-8) ===');
for (let p = 0; p < 4; p++) {
  console.log('');
  console.log(`调色板${p}:`);
  for (let i = 0; i < 16; i++) {
    const c = decodeCRAM_LE(p * 16 + i);
    console.log(`  [${i}]: 0x${c.word.toString(16).padStart(4,'0')} -> R=${c.r}, G=${c.g}, B=${c.b} -> rgb(${c.r*36},${c.g*36},${c.b*36})`);
  }
}
