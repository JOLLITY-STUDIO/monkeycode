/**
 * 提取 Bank 1 RLE v3 — 正确解析指针表+数据
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PRG_BULK = join(PROJECT_ROOT, 'src', 'data', 'raw', 'prg_bulk.json');
const OUTPUT_DIR = join(PROJECT_ROOT, 'src', 'data', 'opening');

function loadBank(bankId) {
  const bulk = JSON.parse(readFileSync(PRG_BULK, 'utf-8'));
  return Buffer.from(bulk.find(e => e.bankId === bankId).base64, 'base64');
}

const bank1 = loadBank(1);

// ROM $05068 → Bank1 offset = $5068 - $4010 = $1058
// First 10B = pointer table (5 × 16-bit LE words)
// Then RLE data starts at +10

const BASE = 0x1058;
const ptrs = [];
for (let i = 0; i < 10; i += 2) {
  const lo = bank1[BASE + i];
  const hi = bank1[BASE + i + 1];
  ptrs.push((hi << 8) | lo);
}
console.log('Pointers:');
ptrs.forEach((p,i) => console.log('  ['+i+'] $'+p.toString(16).toUpperCase()));

// RLE data starts 10 bytes after BASE
const dataStart = BASE + 10;
console.log('\nRLE data at offset $' + dataStart.toString(16));

function decodeRLE(data, start) {
  let pos = start;
  const tiles = [];
  const segments = [];
  
  while (pos < data.length) {
    const ctrl = data[pos++];
    if (ctrl === 0) {
      // Check if next byte is also 0 (double-zero = end)
      if (pos < data.length && data[pos] === 0) {
        pos++;
        break;
      }
    }
    const count = (ctrl & 0x80) ? (ctrl & 0x7F) : ctrl;
    if (count === 0) continue; // skip count=0 pairs
    if (pos >= data.length) break;
    const val = data[pos++];
    for (let i = 0; i < count; i++) tiles.push(val);
    segments.push({count, val});
    if (tiles.length > 1200) break;
  }
  return {tiles, segments, endPos: pos};
}

const result = decodeRLE(bank1, dataStart);
console.log('Total tiles:', result.tiles.length);
console.log('Segments:', result.segments.length);
console.log('First 10 segments:');
result.segments.slice(0,10).forEach(s => 
  console.log('  count='+s.count+' val=$'+s.val.toString(16).padStart(2,'0'))
);

// Also decode from the "page 1" offset mentioned in ROM report
// $0507F → Bank1 offset $106F
// First check if there's another pointer table at $106F
console.log('\n=== At offset $106F (ROM $0507F) ===');
const raw106F = [];
for (let i=0;i<16;i++) raw106F.push(bank1[0x106F+i].toString(16).padStart(2,'0'));
console.log('Raw: ' + raw106F.join(' '));
const r2 = decodeRLE(bank1, 0x106F);
console.log('Tiles:', r2.tiles.length, 'Segments:', r2.segments.length);

// Page 2: $05093 → $1083
console.log('\n=== At offset $1083 (ROM $05093) ===');
const raw1083 = [];
for (let i=0;i<16;i++) raw1083.push(bank1[0x1083+i].toString(16).padStart(2,'0'));
console.log('Raw: ' + raw1083.join(' '));
const r3 = decodeRLE(bank1, 0x1083);
console.log('Tiles:', r3.tiles.length, 'Segments:', r3.segments.length);

// Page 3: $050A5 → $1095
console.log('\n=== At offset $1095 (ROM $050A5) ===');
const raw1095 = [];
for (let i=0;i<16;i++) raw1095.push(bank1[0x1095+i].toString(16).padStart(2,'0'));
console.log('Raw: ' + raw1095.join(' '));
const r4 = decodeRLE(bank1, 0x1095);
console.log('Tiles:', r4.tiles.length, 'Segments:', r4.segments.length);

// Save all decoded streams
if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
const output = {
  pointers: ptrs.map(p => p.toString(16)),
  pages: [
    { tiles: result.tiles.join(','), count: result.tiles.length },
    { tiles: r2.tiles.join(','), count: r2.tiles.length },
    { tiles: r3.tiles.join(','), count: r3.tiles.length },
    { tiles: r4.tiles.join(','), count: r4.tiles.length },
  ]
};
writeFileSync(join(OUTPUT_DIR, 'rle_decoded.json'), JSON.stringify(output));
console.log('\n✅ Saved to rle_decoded.json');
