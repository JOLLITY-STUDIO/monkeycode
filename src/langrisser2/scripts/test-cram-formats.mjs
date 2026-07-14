import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM格式详细分析 ===');
console.log('');

console.log('CRAM条目 4 (背景色)的原始字节:');
console.log(`  cram[8] = 0x${cram[8].toString(16).padStart(2, '0')} (十进制: ${cram[8]})`);
console.log(`  cram[9] = 0x${cram[9].toString(16).padStart(2, '0')} (十进制: ${cram[9]})`);
console.log('');

console.log('=== 测试不同的CRAM解码方式 ===');
console.log('');

function testDecode(name, getWord) {
  const word = getWord(4);
  console.log(`${name}:`);
  console.log(`  原始值: 0x${word.toString(16).padStart(4, '0')} (十进制: ${word})`);
  console.log(`  二进制: ${word.toString(2).padStart(16, '0')}`);
  
  const r1 = (word & 0x07);
  const g1 = ((word >> 3) & 0x07);
  const b1 = ((word >> 6) & 0x07);
  console.log(`  R(bit0-2): ${r1}, G(bit3-5): ${g1}, B(bit6-8): ${b1}`);
  console.log(`  使用scale36: rgb(${r1*36},${g1*36},${b1*36})`);
  console.log('');
}

testDecode('方式1: (cram[i*2+1] << 8) | cram[i*2]', (i) => (cram[i*2+1] << 8) | cram[i*2]);
testDecode('方式2: (cram[i*2] << 8) | cram[i*2+1]', (i) => (cram[i*2] << 8) | cram[i*2+1]);

console.log('');
console.log('=== Genesis VDP CRAM硬件格式 ===');
console.log('CRAM条目是16位，但只有低9位有效:');
console.log('  Bit 15-9: 未使用');
console.log('  Bit 8: Blue bit 2');
console.log('  Bit 7: Blue bit 1');
console.log('  Bit 6: Blue bit 0');
console.log('  Bit 5: Green bit 2');
console.log('  Bit 4: Green bit 1');
console.log('  Bit 3: Green bit 0');
console.log('  Bit 2: Red bit 2');
console.log('  Bit 1: Red bit 1');
console.log('  Bit 0: Red bit 0');
console.log('');

console.log('=== 调色板3颜色分析 ===');
console.log('调色板3使用CRAM条目48-63');
console.log('');

function decodeColor(word) {
  const r = (word >> 0) & 0x07;
  const g = (word >> 3) & 0x07;
  const b = (word >> 6) & 0x07;
  return { r, g, b, word };
}

console.log('方式1解码 (cram[i*2+1] << 8) | cram[i*2]:');
console.log('条目 | 原始值 | R | G | B | Scale36');
console.log('-----|--------|---|---|---|--------');
for (let i = 48; i < 64; i++) {
  const word = (cram[i*2+1] << 8) | cram[i*2];
  const c = decodeColor(word);
  console.log(`${i} | 0x${word.toString(16).padStart(4,'0')} | ${c.r} | ${c.g} | ${c.b} | rgb(${c.r*36},${c.g*36},${c.b*36})`);
}

console.log('');
console.log('方式2解码 (cram[i*2] << 8) | cram[i*2+1]:');
console.log('条目 | 原始值 | R | G | B | Scale36');
console.log('-----|--------|---|---|---|--------');
for (let i = 48; i < 64; i++) {
  const word = (cram[i*2] << 8) | cram[i*2+1];
  const c = decodeColor(word);
  console.log(`${i} | 0x${word.toString(16).padStart(4,'0')} | ${c.r} | ${c.g} | ${c.b} | rgb(${c.r*36},${c.g*36},${c.b*36})`);
}

console.log('');
console.log('=== 关键观察 ===');
console.log('截图背景色: rgb(0,0,72)');
console.log('截图字母色: rgb(59,30,41)');
console.log('');
console.log('方式1背景色(条目4): rgb(0,0,72) - 匹配!');
console.log('方式2背景色(条目4): rgb(144,0,0) - 不匹配');
console.log('');
console.log('方式1调色板3颜色2(条目50): rgb(0,36,108) - 深蓝');
console.log('方式1调色板3颜色5(条目53): rgb(72,144,36) - 绿色');
console.log('方式1调色板3颜色9(条目57): rgb(216,36,0) - 橙色');
console.log('方式1调色板3颜色15(条目63): rgb(216,180,108) - 浅橙色');
console.log('');
console.log('如果标题文字主要使用颜色2和颜色5，混合后会是:');
console.log('  rgb(36, 90, 72) - 偏蓝绿色');
console.log('如果标题文字主要使用颜色9和颜色15，混合后会是:');
console.log('  rgb(216, 108, 54) - 偏橙色');
