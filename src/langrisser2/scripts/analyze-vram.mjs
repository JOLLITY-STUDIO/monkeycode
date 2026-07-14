/**
 * 分析 VRAM 中实际数据分布
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VRAM_PATH = path.join(__dirname, '../20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const vram = fs.readFileSync(VRAM_PATH);

console.log('=== VRAM 数据分布分析 ===');

function checkRegion(start, size, name) {
  let nonZero = 0;
  for (let i = 0; i < size; i++) {
    if (vram[start + i] !== 0) nonZero++;
  }
  console.log(`${name} (0x${start.toString(16)}-0x${(start+size-1).toString(16)}): ${nonZero}/${size} 非零字节 (${(nonZero/size*100).toFixed(2)}%)`);
}

checkRegion(0x0000, 8192, 'Tile 0-255');
checkRegion(0x2000, 8192, 'Tile 256-511');
checkRegion(0x4000, 8192, 'Tile 512-767');
checkRegion(0x6000, 8192, 'Tile 768-1023');
checkRegion(0x8000, 8192, 'Tile 1024-1279');
checkRegion(0xA000, 8192, 'Tile 1280-1535');
checkRegion(0xC000, 4096, 'Plane A Nametable');
checkRegion(0xE000, 4096, 'Plane B Nametable');

console.log('\n=== 检查实际使用的 tile 索引 ===');
const usedTiles = new Set();

function parseEntry(addr) {
  const lo = vram[addr] & 0xff;
  const hi = vram[addr + 1] & 0xff;
  const word = (hi << 8) | lo;
  return {
    tileIndex: word & 0x07FF,
    hFlip: !!(word & 0x1000),
    vFlip: !!(word & 0x0800),
    palette: (word >> 13) & 0x03,
    priority: (word >> 15) & 0x01,
  };
}

for (let i = 0; i < 4096; i += 2) {
  const entry = parseEntry(0xC000 + i);
  if (entry.tileIndex !== 0) usedTiles.add(entry.tileIndex);
}
for (let i = 0; i < 4096; i += 2) {
  const entry = parseEntry(0xE000 + i);
  if (entry.tileIndex !== 0) usedTiles.add(entry.tileIndex);
}

console.log(`使用的 tile 索引范围: [${Math.min(...usedTiles)}, ${Math.max(...usedTiles)}]`);
console.log(`使用的 tile 数量: ${usedTiles.size}`);

const sortedTiles = [...usedTiles].sort((a, b) => a - b);
console.log('前 30 个 tile 索引:', sortedTiles.slice(0, 30));
console.log('后 30 个 tile 索引:', sortedTiles.slice(-30));

console.log('\n=== 检查这些 tile 在 VRAM 中的数据 ===');
function decodeTile(tileIdx) {
  const addr = tileIdx * 32;
  const pixels = [];
  for (let y = 0; y < 8; y++) {
    let row = '';
    for (let x = 0; x < 8; x++) {
      const rowBase = addr + y * 4;
      const p0 = vram[rowBase];
      const p1 = vram[rowBase + 1];
      const p2 = vram[rowBase + 2];
      const p3 = vram[rowBase + 3];
      const bit = 7 - x;
      const pixel =
        ((p0 >> bit) & 1) |
        ((p1 >> bit) & 1) << 1 |
        ((p2 >> bit) & 1) << 2 |
        ((p3 >> bit) & 1) << 3;
      row += pixel ? '*' : '.';
    }
    pixels.push(row);
  }
  return pixels;
}

console.log('\nTile 46:');
for (const row of decodeTile(46)) console.log(row);

console.log('\nTile 256:');
for (const row of decodeTile(256)) console.log(row);

console.log('\nTile 442:');
for (const row of decodeTile(442)) console.log(row);

console.log('\n=== 检查 VRAM 0x0000-0x1FFF 的 tile ===');
let nonZeroTiles = [];
for (let i = 0; i < 256; i++) {
  const addr = i * 32;
  let hasData = false;
  for (let j = 0; j < 32; j++) {
    if (vram[addr + j] !== 0) {
      hasData = true;
      break;
    }
  }
  if (hasData) nonZeroTiles.push(i);
}
console.log(`Tile 0-255 中有数据的 tile: ${nonZeroTiles.length} 个`);
console.log('索引:', nonZeroTiles.slice(0, 30));
