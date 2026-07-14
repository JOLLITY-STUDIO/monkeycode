import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM解码验证 ===');
console.log(`CRAM长度: ${cram.length} 字节`);
console.log('');

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b, word };
}

console.log('调色板3 (条目48-63):');
console.log('条目 | 字节1 | 字节2 | Word | R | G | B | RGB');
console.log('-----|-------|-------|------|---|---|---|------');
for (let i = 48; i < 64; i++) {
  const c = decodeCRAM_LE(i);
  const byte1 = cram[i * 2].toString(16).padStart(2, '0');
  const byte2 = cram[i * 2 + 1].toString(16).padStart(2, '0');
  console.log(`${i} | 0x${byte1} | 0x${byte2} | 0x${c.word.toString(16).padStart(4,'0')} | ${(c.word & 0x07)} | ${((c.word >> 3) & 0x07)} | ${((c.word >> 6) & 0x07)} | rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 关键颜色分析 ===');
console.log('截图背景色: rgb(0,0,72)');
const bgColor = decodeCRAM_LE(4);
console.log(`CRAM[4]: rgb(${bgColor.r},${bgColor.g},${bgColor.b})`);
console.log('');

console.log('调色板3颜色2(条目50)应该是深蓝色:');
const color2 = decodeCRAM_LE(50);
console.log(`CRAM[50]: rgb(${color2.r},${color2.g},${color2.b})`);

console.log('');
console.log('调色板3颜色4(条目52)应该是紫色:');
const color4 = decodeCRAM_LE(52);
console.log(`CRAM[52]: rgb(${color4.r},${color4.g},${color4.b})`);

console.log('');
console.log('=== 检查CRAM数据是否完整 ===');
console.log('CRAM[96-127] (调色板3数据):');
for (let i = 96; i < 128; i += 8) {
  const line = [];
  for (let j = 0; j < 8; j++) {
    line.push(cram[i + j].toString(16).padStart(2, '0'));
  }
  console.log(`${i.toString(16).padStart(4,'0')}: ${line.join(' ')}`);
}
