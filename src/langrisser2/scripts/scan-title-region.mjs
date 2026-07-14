import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');

const vram = new Uint8Array(readFileSync(VRAM_PATH));
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function readNametableEntry(base, tx, ty) {
  const addr = base + (ty * 64 + tx) * 2;
  const lo = vram[addr];
  const hi = vram[addr + 1];
  const word = (hi << 8) | lo;
  return {
    palette: (word >> 13) & 3,
    tileIdx: word & 0x7FF,
    word
  };
}

console.log('=== 标题区域扫描 (tx=0-40, ty=0-15) ===');
console.log('');

for (const base of [0x4000, 0xC000]) {
  console.log(`=== Plane A 基址: 0x${base.toString(16).toUpperCase()} ===`);
  
  for (let ty = 6; ty <= 10; ty++) {
    let row = `ty=${ty}: `;
    for (let tx = 0; tx < 40; tx++) {
      const e = readNametableEntry(base, tx, ty);
      if (e.word !== 0) {
        row += `${e.palette}`;
      } else {
        row += '.';
      }
    }
    console.log(row);
  }
  
  console.log('');
  console.log('各调色板使用统计:');
  const paletteCounts = {0:0, 1:0, 2:0, 3:0};
  for (let ty = 0; ty < 28; ty++) {
    for (let tx = 0; tx < 40; tx++) {
      const e = readNametableEntry(base, tx, ty);
      if (e.word !== 0) {
        paletteCounts[e.palette]++;
      }
    }
  }
  for (const p in paletteCounts) {
    console.log(`  调色板 ${p}: ${paletteCounts[p]} 个条目`);
  }
  console.log('');
}

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  return {
    r: (word & 0x07) * 36,
    g: ((word >> 3) & 0x07) * 36,
    b: ((word >> 6) & 0x07) * 36,
  };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i));
}

console.log('');
console.log('=== 所有调色板 ===');
for (let p = 0; p < 4; p++) {
  console.log(`调色板 ${p} (CRAM[${p*16}]-CRAM[${p*16+15}]):`);
  for (let i = 0; i < 16; i++) {
    const c = palette[p*16 + i];
    console.log(`  [${i}] rgb(${c.r},${c.g},${c.b})`);
  }
  console.log('');
}

console.log('');
console.log('=== 寻找暗红色/紫色系颜色 ===');
console.log('目标: rgb(59,30,41)');
console.log('');
for (let p = 0; p < 4; p++) {
  for (let i = 0; i < 16; i++) {
    const c = palette[p*16 + i];
    if (c.r > 50 && c.r < 100 && c.g < 50 && c.b < 100) {
      console.log(`调色板${p}[${i}]: rgb(${c.r},${c.g},${c.b}) -> 接近目标!`);
    }
  }
}
