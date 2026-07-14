import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_B_BASE = 0xE000;

console.log('=== Plane B标题区域Nametable条目分析 ===');
console.log('');

const titleTiles = [];
for (let row = 4; row < 10; row++) {
  for (let col = 4; col < 18; col++) {
    const ntOffset = PLANE_B_BASE + row * 64 + col * 2;
    const lo = vram[ntOffset];
    const hi = vram[ntOffset + 1];
    const entry = (hi << 8) | lo;
    const priority = (entry >> 15) & 1;
    const palette = (entry >> 13) & 3;
    const hFlip = (entry >> 12) & 1;
    const vFlip = (entry >> 11) & 1;
    const tileIdx = entry & 0x7FF;
    if (tileIdx !== 0) {
      titleTiles.push({ row, col, ntOffset, entry, priority, palette, hFlip, vFlip, tileIdx });
    }
  }
}

console.log('位置 | 条目 | 优先级 | 调色板 | H翻转 | V翻转 | Tile索引');
console.log('-----|------|--------|--------|-------|-------|----------');
for (const t of titleTiles) {
  console.log(`(${t.row},${t.col}) | 0x${t.entry.toString(16).padStart(4,'0')} | ${t.priority} | ${t.palette} | ${t.hFlip} | ${t.vFlip} | ${t.tileIdx}`);
}

console.log('');
console.log('=== 调色板使用统计 ===');
const paletteCount = {};
for (const t of titleTiles) {
  paletteCount[t.palette] = (paletteCount[t.palette] || 0) + 1;
}
console.log(JSON.stringify(paletteCount, null, 2));

console.log('');
console.log('=== 检查所有调色板 ===');
const CRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_CRAM-TITILE-SCEEN.ram');
const cram = new Uint8Array(readFileSync(CRAM_PATH));

function decodeCRAM_LE(i) {
  const word = (cram[i * 2 + 1] << 8) | cram[i * 2];
  const r = (word & 0x07) * 36;
  const g = ((word >> 3) & 0x07) * 36;
  const b = ((word >> 6) & 0x07) * 36;
  return { r, g, b };
}

for (let p = 0; p < 8; p++) {
  console.log('');
  console.log(`调色板${p} (条目${p*16}~${p*16+15}):`);
  for (let i = 0; i < 16; i++) {
    const c = decodeCRAM_LE(p * 16 + i);
    console.log(`  [${i}]: rgb(${c.r},${c.g},${c.b})`);
  }
}
