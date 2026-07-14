import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const DATA_DIR = join(ROOT, 'src/langrisser2/20260713');

const VRAM_PATH = join(DATA_DIR, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const vram = new Uint8Array(readFileSync(VRAM_PATH));

console.log('=== VRAM Tile数据原始字节 ===');
console.log('');

function printTileRaw(idx) {
  const offset = idx * 32;
  console.log(`Tile ${idx} (偏移 0x${offset.toString(16).padStart(4,'0')}):`);
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < 4; x++) {
      row += `${vram[offset + y * 4 + x].toString(16).padStart(2,'0')} `;
    }
    console.log(`  行${y}: ${row}`);
  }
  console.log('');
}

console.log('=== 小端序解码的Tile索引 ===');
console.log('');

const tileIndicesLE = [472, 482, 481, 484, 495, 494, 493, 497, 496];
for (const idx of tileIndicesLE) {
  printTileRaw(idx);
}

console.log('=== 大端序解码的Tile索引 ===');
console.log('');

const tileIndicesBE = [105, 617, 361, 1121, 1129, 873, 1897, 1641, 1385, 353];
for (const idx of tileIndicesBE) {
  printTileRaw(idx);
}

console.log('=== 分析 ===');
console.log('');
console.log('小端序解码:');
console.log('  Tile 472: 全0 -> 透明');
console.log('  Tile 482: 有内容');
console.log('  Tile索引范围: 472-497 (较小)');
console.log('');
console.log('大端序解码:');
console.log('  Tile 105: 有内容');
console.log('  Tile 617: 有少量内容');
console.log('  Tile 361: 有少量内容');
console.log('  Tile索引范围: 105-1897 (较大)');
console.log('');
console.log('关键问题:');
console.log('  如果小端序正确，Tile 472是透明的，但它在标题区域被使用');
console.log('  如果大端序正确，Tile索引很大，可能超出实际Tile数据范围');
console.log('');
console.log('MD VRAM布局:');
console.log('  0x0000-0xBFFF: Tile数据 (最多2048个Tile)');
console.log('  0xC000-0xDFFF: Plane A Nametable');
console.log('  0xE000-0xFFFF: Plane B Nametable');
console.log('');
console.log('大端序解码的Tile索引 1121, 1129, 873, 1897, 1641, 1385:');
console.log('  这些索引可能指向VRAM的后半部分');
console.log('  如果超出0xBFFF，可能会读取Nametable数据作为Tile');
