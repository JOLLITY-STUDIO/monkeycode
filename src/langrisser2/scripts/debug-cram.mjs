import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log(`CRAM文件大小: ${cram.length} bytes`);
console.log('');

console.log('=== CRAM前128字节原始数据 ===');
for (let i = 0; i < 128; i += 16) {
  let line = `0x${i.toString(16).padStart(4,'0')}: `;
  for (let j = 0; j < 16 && i+j < 128; j++) {
    line += `${cram[i+j].toString(16).padStart(2,'0')} `;
  }
  console.log(line);
}
console.log('');

console.log('=== CRAM[4] (背景色) 的详细分析 ===');
const idx = 4;
const byte0 = cram[idx * 2];
const byte1 = cram[idx * 2 + 1];

console.log(`CRAM[${idx}] 原始字节:`);
console.log(`  字节0 (低): 0x${byte0.toString(16).padStart(2,'0')} = ${byte0.toString(2).padStart(8,'0')}`);
console.log(`  字节1 (高): 0x${byte1.toString(16).padStart(2,'0')} = ${byte1.toString(2).padStart(8,'0')}`);
console.log('');

console.log('=== 不同解码方式对比 ===');
console.log('');

console.log('方式1: 小端序 + 位0-8 (BGR)');
const word1 = (byte1 << 8) | byte0;
console.log(`  word = 0x${word1.toString(16).padStart(4,'0')}`);
console.log(`  二进制: ${word1.toString(2).padStart(16,'0')}`);
const b1 = (word1 & 0x07) * 36;
const g1 = ((word1 >> 3) & 0x07) * 36;
const r1 = ((word1 >> 6) & 0x07) * 36;
console.log(`  rgb(${r1},${g1},${b1})`);
console.log('');

console.log('方式2: 小端序 + 位5-13 (BGR)');
const r2 = ((word1 >> 5) & 0x07) * 36;
const g2 = ((word1 >> 8) & 0x07) * 36;
const b2 = ((word1 >> 11) & 0x07) * 36;
console.log(`  rgb(${r2},${g2},${b2})`);
console.log('');

console.log('方式3: 大端序 + 位0-8 (BGR)');
const word3 = (byte0 << 8) | byte1;
console.log(`  word = 0x${word3.toString(16).padStart(4,'0')}`);
console.log(`  二进制: ${word3.toString(2).padStart(16,'0')}`);
const b3 = (word3 & 0x07) * 36;
const g3 = ((word3 >> 3) & 0x07) * 36;
const r3 = ((word3 >> 6) & 0x07) * 36;
console.log(`  rgb(${r3},${g3},${b3})`);
console.log('');

console.log('方式4: 大端序 + 位5-13 (BGR)');
const r4 = ((word3 >> 5) & 0x07) * 36;
const g4 = ((word3 >> 8) & 0x07) * 36;
const b4 = ((word3 >> 11) & 0x07) * 36;
console.log(`  rgb(${r4},${g4},${b4})`);
console.log('');

console.log('方式5: 小端序 + 位0-8 (RGB)');
const r5 = (word1 & 0x07) * 36;
const g5 = ((word1 >> 3) & 0x07) * 36;
const b5 = ((word1 >> 6) & 0x07) * 36;
console.log(`  rgb(${r5},${g5},${b5})`);
console.log('');

console.log('方式6: 大端序 + 位0-8 (RGB)');
const r6 = (word3 & 0x07) * 36;
const g6 = ((word3 >> 3) & 0x07) * 36;
const b6 = ((word3 >> 6) & 0x07) * 36;
console.log(`  rgb(${r6},${g6},${b6})`);
console.log('');

console.log('=== 目标: 背景色应为 rgb(0,0,72) ===');
console.log('');

console.log('要得到 rgb(0,0,72):');
console.log('  r = 0  → 红色通道值 = 0');
console.log('  g = 0  → 绿色通道值 = 0');
console.log('  b = 72 → 蓝色通道值 = 2 (因为 2 * 36 = 72)');
console.log('');
console.log('所以蓝色通道的3位应该是 010 (二进制)');
