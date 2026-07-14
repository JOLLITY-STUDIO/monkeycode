import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const RAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_68K-ram-in-title-page.ram');
const ram = new Uint8Array(readFileSync(RAM_PATH));

console.log(`RAM大小: ${ram.length} 字节`);
console.log('');

console.log('=== VDP影子寄存器检查 (标题画面) ===');
console.log('');

const shadowBase = 0xFFFF81A0;
const ramOffset = 0xFF0000;

for (let i = 0; i <= 24; i++) {
  const addr = shadowBase + i;
  const idx = addr - ramOffset;
  
  if (idx < 0 || idx >= ram.length) {
    console.log(`  R${i}: 地址越界 (0x${addr.toString(16)})`);
    continue;
  }
  
  const val = ram[idx];
  
  let desc = '';
  let vramAddr = 0;
  
  switch(i) {
    case 0:
      desc = `模式0: ${val.toString(2).padStart(8,'0')}`;
      break;
    case 1:
      desc = `模式1: ${val.toString(2).padStart(8,'0')}`;
      break;
    case 2:
      vramAddr = (val & 0x38) << 9;
      desc = `Plane A: VRAM 0x${vramAddr.toString(16).toUpperCase()} (R2=0x${val.toString(16)})`;
      break;
    case 3:
      vramAddr = (val & 0x38) << 9;
      desc = `Window: VRAM 0x${vramAddr.toString(16).toUpperCase()} (R3=0x${val.toString(16)})`;
      break;
    case 4:
      vramAddr = (val & 0x07) << 13;
      desc = `Plane B: VRAM 0x${vramAddr.toString(16).toUpperCase()} (R4=0x${val.toString(16)})`;
      break;
    case 5:
      vramAddr = (val & 0xFE) << 7;
      desc = `Sprite attr: VRAM 0x${vramAddr.toString(16).toUpperCase()} (R5=0x${val.toString(16)})`;
      break;
    case 6:
      vramAddr = (val & 0x07) << 13;
      desc = `Sprite tile: VRAM 0x${vramAddr.toString(16).toUpperCase()} (R6=0x${val.toString(16)})`;
      break;
    case 7:
      desc = `背景色: CRAM[${val}] (R7=0x${val.toString(16)})`;
      break;
    case 10:
      desc = `H中断计数: ${val} (R10=0x${val.toString(16)})`;
      break;
    case 11:
      desc = `模式2: ${val.toString(2).padStart(8,'0')} (R11=0x${val.toString(16)})`;
      break;
    case 12:
      desc = `模式3: ${val.toString(2).padStart(8,'0')} (R12=0x${val.toString(16)})`;
      break;
    default:
      if (val !== 0) {
        desc = `R${i}=0x${val.toString(16)}`;
      }
  }
  
  if (desc) {
    console.log(`  R${i}: 0x${val.toString(16).toUpperCase()} - ${desc}`);
  }
}

console.log('');
console.log('=== Plane B nametable内容抽样 ===');
const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const planeBAddr = 0xE000;
console.log(`地址范围: 0x${planeBAddr.toString(16)} - 0x${(planeBAddr + 64*32*2).toString(16)}`);

const samplePositions = [
  { tx: 10, ty: 8 },
  { tx: 15, ty: 8 },
  { tx: 20, ty: 8 },
  { tx: 10, ty: 12 },
  { tx: 15, ty: 12 },
];

for (const pos of samplePositions) {
  const addr = planeBAddr + (pos.ty * 64 + pos.tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  const priority = (word >> 15) & 1;
  const palette = (word >> 13) & 3;
  const hflip = (word >> 12) & 1;
  const vflip = (word >> 11) & 1;
  const tileIdx = word & 0x7FF;
  
  console.log(`  (${pos.tx},${pos.ty}): addr=0x${addr.toString(16)}, word=0x${word.toString(16).padStart(4,'0')}`);
  console.log(`    priority=${priority}, palette=${palette}, hflip=${hflip}, vflip=${vflip}, tileIdx=${tileIdx}`);
}

console.log('');
console.log('=== CRAM数据抽样 ===');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

for (let i = 0; i < 64; i += 8) {
  process.stdout.write(`CRAM[${i}-${i+7}]: `);
  for (let j = 0; j < 8; j++) {
    const idx = i + j;
    const word = (cram[idx * 2 + 1] << 8) | cram[idx * 2];
    process.stdout.write(`0x${word.toString(16).padStart(4,'0')} `);
  }
  console.log('');
}
