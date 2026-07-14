import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;

function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    priority: (word >> 15) & 1,
    palette:  (word >> 13) & 3,
    hflip:    (word >> 12) & 1,
    vflip:    (word >> 11) & 1,
    tileIdx:  word & 0x7FF,
    word
  };
}

console.log('=== 标题区域Plane A覆盖情况 ===');
console.log('标题区域: ty=4-9, tx=5-35');
console.log('');

for (let ty = 4; ty <= 9; ty++) {
  let aCount = 0;
  let bCount = 0;
  for (let tx = 5; tx <= 35; tx++) {
    const a = readNametableEntry(PLANE_A_BASE, tx, ty);
    const b = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (a.word !== 0) aCount++;
    if (b.word !== 0) bCount++;
  }
  console.log(`行 ${ty}: Plane A=${aCount} 条目, Plane B=${bCount} 条目`);
}

console.log('');
console.log('=== Plane A标题区域详细内容 ===');
for (let ty = 4; ty <= 9; ty++) {
  console.log(`\n行 ${ty}:`);
  for (let tx = 5; tx <= 35; tx++) {
    const a = readNametableEntry(PLANE_A_BASE, tx, ty);
    if (a.word !== 0) {
      console.log(`  (${tx},${ty}): tile=${a.tileIdx}, palette=${a.palette}, hflip=${a.hflip}, vflip=${a.vflip}`);
    }
  }
}

console.log('');
console.log('=== Plane B标题区域详细内容 ===');
for (let ty = 4; ty <= 9; ty++) {
  console.log(`\n行 ${ty}:`);
  for (let tx = 5; tx <= 35; tx++) {
    const b = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (b.word !== 0) {
      console.log(`  (${tx},${ty}): tile=${b.tileIdx}, palette=${b.palette}, hflip=${b.hflip}, vflip=${b.vflip}`);
    }
  }
}

console.log('');
console.log('=== 检查Plane A和Plane B在相同位置的重叠 ===');
let overlapCount = 0;
let aOnlyCount = 0;
let bOnlyCount = 0;

for (let ty = 0; ty < 28; ty++) {
  for (let tx = 0; tx < 40; tx++) {
    const a = readNametableEntry(PLANE_A_BASE, tx, ty);
    const b = readNametableEntry(PLANE_B_BASE, tx, ty);
    if (a.word !== 0 && b.word !== 0) overlapCount++;
    else if (a.word !== 0) aOnlyCount++;
    else if (b.word !== 0) bOnlyCount++;
  }
}

console.log(`重叠位置: ${overlapCount}`);
console.log(`仅Plane A: ${aOnlyCount}`);
console.log(`仅Plane B: ${bOnlyCount}`);
