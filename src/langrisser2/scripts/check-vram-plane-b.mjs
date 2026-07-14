import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

console.log('=== Plane B VRAM数据检查 ===');
console.log('');

const PLANE_B_BASE = 0xE000;

console.log('标题区域的Plane B条目 (ty=5, tx=8-15):');
for (let ty = 5; ty <= 8; ty++) {
  for (let tx = 8; tx <= 15; tx++) {
    const addr = PLANE_B_BASE + (ty * 64 + tx) * 2;
    const lo = vram[addr];
    const hi = vram[addr + 1];
    const word = (hi << 8) | lo;
    console.log(`位置(${ty},${tx}) addr=0x${addr.toString(16).toUpperCase()} lo=0x${lo.toString(16).padStart(2,'0')} hi=0x${hi.toString(16).padStart(2,'0')} word=0x${word.toString(16).padStart(4,'0')}`);
  }
}

console.log('');
console.log('=== 检查VRAM中0xE000附近的数据 ===');
console.log('地址范围 0xE000-0xE100:');
for (let i = 0; i < 256; i += 16) {
  const addr = PLANE_B_BASE + i;
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(vram[addr + j].toString(16).padStart(2, '0'));
  }
  console.log(`${addr.toString(16).toUpperCase()}: ${line.join(' ')}`);
}

console.log('');
console.log('=== 检查VRAM中0xC000附近的数据 ===');
console.log('地址范围 0xC000-0xC100:');
for (let i = 0; i < 256; i += 16) {
  const addr = 0xC000 + i;
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(vram[addr + j].toString(16).padStart(2, '0'));
  }
  console.log(`${addr.toString(16).toUpperCase()}: ${line.join(' ')}`);
}

console.log('');
console.log('=== 检查VRAM中0x4000附近的数据 (tile数据) ===');
console.log('地址范围 0x4000-0x403F:');
for (let i = 0; i < 64; i += 16) {
  const addr = 0x4000 + i;
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(vram[addr + j].toString(16).padStart(2, '0'));
  }
  console.log(`${addr.toString(16).toUpperCase()}: ${line.join(' ')}`);
}

console.log('');
console.log('=== 检查VRAM中0x0000附近的数据 ===');
console.log('地址范围 0x0000-0x003F:');
for (let i = 0; i < 64; i += 16) {
  const addr = 0x0000 + i;
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(vram[addr + j].toString(16).padStart(2, '0'));
  }
  console.log(`${addr.toString(16).toUpperCase()}: ${line.join(' ')}`);
}

console.log('');
console.log('=== 检查VRAM中0x8000附近的数据 ===');
console.log('地址范围 0x8000-0x803F:');
for (let i = 0; i < 64; i += 16) {
  const addr = 0x8000 + i;
  const line = [];
  for (let j = 0; j < 16; j++) {
    line.push(vram[addr + j].toString(16).padStart(2, '0'));
  }
  console.log(`${addr.toString(16).toUpperCase()}: ${line.join(' ')}`);
}
