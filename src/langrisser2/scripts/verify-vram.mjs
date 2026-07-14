import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

console.log('=== VRAM数据验证 ===');
console.log(`VRAM长度: ${vram.length} 字节`);
console.log('');

console.log('关键地址检查:');
console.log(`0x0000: ${vram[0x0000].toString(16).padStart(2,'0')}`);
console.log(`0x4000: ${vram[0x4000].toString(16).padStart(2,'0')}`);
console.log(`0xC000: ${vram[0xC000].toString(16).padStart(2,'0')}`);
console.log(`0xE000: ${vram[0xE000].toString(16).padStart(2,'0')}`);
console.log(`0xFFFF: ${vram[0xFFFF].toString(16).padStart(2,'0')}`);
console.log('');

console.log('=== Plane A起始数据 (0xC000) ===');
for (let i = 0; i < 32; i += 8) {
  const line = [];
  for (let j = 0; j < 8; j++) {
    line.push(vram[0xC000 + i + j].toString(16).padStart(2, '0'));
  }
  console.log(`0xC0${(i).toString(16).toUpperCase().padStart(2, '0')}: ${line.join(' ')}`);
}

console.log('');
console.log('=== Plane B起始数据 (0xE000) ===');
for (let i = 0; i < 32; i += 8) {
  const line = [];
  for (let j = 0; j < 8; j++) {
    line.push(vram[0xE000 + i + j].toString(16).padStart(2, '0'));
  }
  console.log(`0xE0${(i).toString(16).toUpperCase().padStart(2, '0')}: ${line.join(' ')}`);
}

console.log('');
console.log('=== Tile 546数据 (0x4440) ===');
for (let i = 0; i < 32; i += 8) {
  const line = [];
  for (let j = 0; j < 8; j++) {
    line.push(vram[0x4440 + i + j].toString(16).padStart(2, '0'));
  }
  console.log(`0x44${(40+i).toString(16).toUpperCase()}: ${line.join(' ')}`);
}

console.log('');
console.log('=== 检查VRAM大小是否正确 ===');
console.log(`VRAM应该是64KB = 65536字节`);
console.log(`实际大小: ${vram.length} 字节`);
console.log(`是否正确: ${vram.length === 65536 ? '是' : '否'}`);

console.log('');
console.log('=== 检查VRAM数据是否全部为零 ===');
let zeroCount = 0;
for (let i = 0; i < vram.length; i++) {
  if (vram[i] === 0) zeroCount++;
}
console.log(`零字节数: ${zeroCount}`);
console.log(`非零字节数: ${vram.length - zeroCount}`);
console.log(`非零比例: ${((vram.length - zeroCount) / vram.length * 100).toFixed(2)}%`);

console.log('');
console.log('=== 检查CRAM大小 ===');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));
console.log(`CRAM长度: ${cram.length} 字节`);
console.log(`CRAM应该是128字节 (64色 × 2字节/色)`);
console.log(`是否正确: ${cram.length === 128 ? '是' : '否'}`);

console.log('');
console.log('=== CRAM前32字节 ===');
for (let i = 0; i < 32; i += 8) {
  const line = [];
  for (let j = 0; j < 8; j++) {
    line.push(cram[i + j].toString(16).padStart(2, '0'));
  }
  console.log(`${i.toString(16).padStart(4,'0')}: ${line.join(' ')}`);
}
