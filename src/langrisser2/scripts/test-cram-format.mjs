import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== MD CRAM标准格式测试 ===');
console.log('');

function decodeCRAM_MD_STANDARD(i) {
  const word = (cram[i * 2] << 8) | cram[i * 2 + 1];
  const r = ((word >> 5) & 0x07);
  const g = ((word >> 8) & 0x07);
  const b = ((word >> 11) & 0x07);
  return { r, g, b, word };
}

function decodeCRAM_LITTLE_ENDIAN(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = ((word >> 5) & 0x07);
  const g = ((word >> 8) & 0x07);
  const b = ((word >> 11) & 0x07);
  return { r, g, b, word };
}

console.log('CRAM[4] (背景色):');
console.log('');

const standard4 = decodeCRAM_MD_STANDARD(4);
console.log(`标准格式 (大端序):`);
console.log(`  原始字: 0x${standard4.word.toString(16).padStart(4,'0')}`);
console.log(`  R位(5-7): ${standard4.r} (0x${standard4.r.toString(16)})`);
console.log(`  G位(8-10): ${standard4.g} (0x${standard4.g.toString(16)})`);
console.log(`  B位(11-13): ${standard4.b} (0x${standard4.b.toString(16)})`);
console.log(`  rgb(${standard4.r*36},${standard4.g*36},${standard4.b*36})`);
console.log('');

const le4 = decodeCRAM_LITTLE_ENDIAN(4);
console.log(`小端序格式:`);
console.log(`  原始字: 0x${le4.word.toString(16).padStart(4,'0')}`);
console.log(`  R位(5-7): ${le4.r} (0x${le4.r.toString(16)})`);
console.log(`  G位(8-10): ${le4.g} (0x${le4.g.toString(16)})`);
console.log(`  B位(11-13): ${le4.b} (0x${le4.b.toString(16)})`);
console.log(`  rgb(${le4.r*36},${le4.g*36},${le4.b*36})`);
console.log('');

console.log('=== 调色板3颜色 (条目48-63) ===');
console.log('');
console.log('使用MD标准格式 (大端序):');
console.log('条目 | 原始字 | R | G | B | RGB');
console.log('-----|--------|---|---|---|-----');
for (let i = 48; i < 64; i++) {
  const c = decodeCRAM_MD_STANDARD(i);
  console.log(`${i} | 0x${c.word.toString(16).padStart(4,'0')} | ${c.r} | ${c.g} | ${c.b} | rgb(${c.r*36},${c.g*36},${c.b*36})`);
}

console.log('');
console.log('=== 调色板2颜色 (条目32-47) ===');
console.log('');
console.log('使用MD标准格式 (大端序):');
console.log('条目 | 原始字 | R | G | B | RGB');
console.log('-----|--------|---|---|---|-----');
for (let i = 32; i < 48; i++) {
  const c = decodeCRAM_MD_STANDARD(i);
  console.log(`${i} | 0x${c.word.toString(16).padStart(4,'0')} | ${c.r} | ${c.g} | ${c.b} | rgb(${c.r*36},${c.g*36},${c.b*36})`);
}

console.log('');
console.log('=== 调色板0颜色 (条目0-15) ===');
console.log('');
console.log('使用MD标准格式 (大端序):');
console.log('条目 | 原始字 | R | G | B | RGB');
console.log('-----|--------|---|---|---|-----');
for (let i = 0; i < 16; i++) {
  const c = decodeCRAM_MD_STANDARD(i);
  console.log(`${i} | 0x${c.word.toString(16).padStart(4,'0')} | ${c.r} | ${c.g} | ${c.b} | rgb(${c.r*36},${c.g*36},${c.b*36})`);
}
