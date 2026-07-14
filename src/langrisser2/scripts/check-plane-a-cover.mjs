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

console.log('=== Plane A和Plane B标题区域覆盖分析 ===');
console.log('');

console.log('标题区域 (行4-9, 列4-17):');
console.log('');

for (let row = 4; row < 10; row++) {
  let aTiles = [];
  let bTiles = [];
  for (let col = 4; col < 18; col++) {
    const aOffset = PLANE_A_BASE + row * 64 + col * 2;
    const aLo = vram[aOffset];
    const aHi = vram[aOffset + 1];
    const aEntry = (aHi << 8) | aLo;
    const aTile = aEntry & 0x7FF;
    
    const bOffset = PLANE_B_BASE + row * 64 + col * 2;
    const bLo = vram[bOffset];
    const bHi = vram[bOffset + 1];
    const bEntry = (bHi << 8) | bLo;
    const bTile = bEntry & 0x7FF;
    
    aTiles.push(aTile !== 0 ? `${aTile}` : '---');
    bTiles.push(bTile !== 0 ? `${bTile}` : '---');
  }
  console.log(`行${row} Plane A: ${aTiles.join(' ')}`);
  console.log(`行${row} Plane B: ${bTiles.join(' ')}`);
  console.log('');
}

console.log('');
console.log('=== Plane A标题区域Tile内容 ===');

function decodeTile(tileIdx) {
  const offset = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    const rowOffset = offset + y * 4;
    const p0 = vram[rowOffset];
    const p1 = vram[rowOffset + 1];
    const p2 = vram[rowOffset + 2];
    const p3 = vram[rowOffset + 3];
    for (let x = 0; x < 8; x++) {
      const bit = 7 - x;
      const b0 = (p0 >> bit) & 1;
      const b1 = (p1 >> bit) & 1;
      const b2 = (p2 >> bit) & 1;
      const b3 = (p3 >> bit) & 1;
      pixels[y * 8 + x] = b0 | (b1 << 1) | (b2 << 2) | (b3 << 3);
    }
  }
  return pixels;
}

const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

const palette = [];
for (let i = 0; i < 64; i++) {
  palette.push(decodeCRAM_LE(i));
}

console.log('');
console.log('调色板2颜色:');
for (let i = 0; i < 16; i++) {
  const c = palette[32 + i];
  console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
}

console.log('');
console.log('Plane A标题区域非空Tile的颜色索引:');

for (let row = 4; row < 10; row++) {
  for (let col = 4; col < 18; col++) {
    const aOffset = PLANE_A_BASE + row * 64 + col * 2;
    const aLo = vram[aOffset];
    const aHi = vram[aOffset + 1];
    const aEntry = (aHi << 8) | aLo;
    const aTile = aEntry & 0x7FF;
    
    if (aTile !== 0) {
      const tile = decodeTile(aTile);
      const colors = new Set();
      for (let i = 0; i < 64; i++) {
        if (tile[i] !== 0) colors.add(tile[i]);
      }
      console.log(`位置(${row},${col}) Tile ${aTile}: 颜色 ${Array.from(colors).sort((a,b)=>a-b).join(', ')}`);
    }
  }
}
