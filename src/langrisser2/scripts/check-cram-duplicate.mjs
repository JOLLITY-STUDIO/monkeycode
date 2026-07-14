import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

console.log('=== CRAM数据重复检查 ===');
console.log(`CRAM长度: ${cram.length} 字节`);
console.log('');

console.log('检查四个128字节块是否相同:');
let allSame = true;
for (let i = 0; i < 128; i++) {
  const b0 = cram[i];
  const b1 = cram[128 + i];
  const b2 = cram[256 + i];
  const b3 = cram[384 + i];
  if (b0 !== b1 || b1 !== b2 || b2 !== b3) {
    console.log(`位置 ${i}: ${b0}, ${b1}, ${b2}, ${b3} - 不相同!`);
    allSame = false;
  }
}
console.log(allSame ? '所有块都相同' : '存在不同的块');
console.log('');

console.log('使用不同块解码背景色(条目4):');
function decodeEntry(offset, i) {
  const word = (cram[offset + i * 2 + 1] << 8) | cram[offset + i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b, word };
}

for (let block = 0; block < 4; block++) {
  const c = decodeEntry(block * 128, 4);
  console.log(`块${block} (偏移0x${(block*128).toString(16)}): rgb(${c.r},${c.g},${c.b}) (0x${c.word.toString(16).padStart(4,'0')})`);
}

console.log('');
console.log('使用不同块解码调色板3颜色(条目48):');
for (let block = 0; block < 4; block++) {
  const c = decodeEntry(block * 128, 48);
  console.log(`块${block}: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('=== 检查CRAM数据是否正确 ===');
console.log('Genesis VDP CRAM:');
console.log('  - 64个颜色条目');
console.log('  - 每个条目16位(2字节)');
console.log('  - 总大小: 128字节');
console.log('');
console.log('截图背景色: rgb(0,0,72)');
console.log('这要求CRAM[4]的B值=2 (2*36=72)');
console.log('');

const entry4Word = (cram[9] << 8) | cram[8];
console.log(`CRAM[4]原始值: 0x${entry4Word.toString(16).padStart(4,'0')}`);
console.log(`二进制: ${entry4Word.toString(2).padStart(16,'0')}`);
console.log(`Bit6-8 (Blue): ${(entry4Word >> 6) & 0x07}`);
console.log(`Bit3-5 (Green): ${(entry4Word >> 3) & 0x07}`);
console.log(`Bit0-2 (Red): ${entry4Word & 0x07}`);

console.log('');
console.log('=== 结论 ===');
console.log('如果所有块都相同，那么使用哪个块都一样');
console.log('背景色差异可能是因为颜色缩放因子不同');
