import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log(`CRAM文件大小: ${cram.length} bytes`);
console.log(`MD CRAM规范: 256 bytes (64 entries × 4 bytes each)`);
console.log('');

function decodeCRAM_LE(i, scale) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * scale;
  const g = ((word >> 3) & 0x07) * scale;
  const b = ((word >> 6) & 0x07) * scale;
  return { r, g, b };
}

console.log('=== 使用前128字节 (64条目 × 2字节) ===');
console.log('');

console.log('调色板0 (条目0-15):');
for (let i = 0; i < 16; i++) {
  const c = decodeCRAM_LE(i, 36);
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('调色板1 (条目16-31):');
for (let i = 16; i < 32; i++) {
  const c = decodeCRAM_LE(i, 36);
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('调色板2 (条目32-47):');
for (let i = 32; i < 48; i++) {
  const c = decodeCRAM_LE(i, 36);
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('调色板3 (条目48-63):');
for (let i = 48; i < 64; i++) {
  const c = decodeCRAM_LE(i, 36);
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 使用4字节条目格式 ===');
console.log('');

function decodeCRAM_4byte(i, scale) {
  const byte0 = cram[i * 4];
  const byte1 = cram[i * 4 + 1];
  const byte2 = cram[i * 4 + 2];
  const byte3 = cram[i * 4 + 3];
  
  const word = (byte3 << 24) | (byte2 << 16) | (byte1 << 8) | byte0;
  const r = ((word >> 24) & 0x07) * scale;
  const g = ((word >> 27) & 0x07) * scale;
  const b = ((word >> 30) & 0x07) * scale;
  return { r, g, b };
}

console.log('调色板0 (使用4字节格式):');
for (let i = 0; i < 16; i++) {
  const c = decodeCRAM_4byte(i, 36);
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== R7寄存器中的背景色索引 ===');
console.log('');
console.log('MD VDP R7寄存器: Bit5-0 = 背景色索引 (0-63)');
console.log('');

const R7_SHADOW_ADDR = 0xFFFF81AF;
console.log(`影子寄存器R7地址: 0x${R7_SHADOW_ADDR.toString(16)}`);
console.log('');

console.log('=== 关键问题 ===');
console.log('');
console.log('背景色应为 rgb(0,0,72)');
console.log(`当前CRAM[4]: rgb(${decodeCRAM_LE(4, 36).r},${decodeCRAM_LE(4, 36).g},${decodeCRAM_LE(4, 36).b})`);
console.log('');
console.log('如果CRAM[4]是背景色，那它应该是rgb(0,0,72)');
console.log('当前解码方式: 小端序 + RGB顺序');
console.log('CRAM[4]原始数据: 字节0=0x80, 字节1=0x08');
console.log('word = 0x0880');
console.log('r = (0x0880 & 0x07) * 36 = 0 * 36 = 0');
console.log('g = ((0x0880 >> 3) & 0x07) * 36 = 0 * 36 = 0');
console.log('b = ((0x0880 >> 6) & 0x07) * 36 = 2 * 36 = 72');
console.log('结果: rgb(0,0,72) ✓');
console.log('');
console.log('背景色解码是正确的！');
