/**
 * 假设字体是 1bpp 存储在 ROM 中，DMA 时展开成 4bpp
 * 1bpp tile = 8 字节 (每字节 = 1 行 8 像素)
 * 4bpp tile = 32 字节 (4 planes × 8 字节)
 * 
 * 将 VRAM 4bpp tile 提取为 1bpp: 任何 palette index > 0 视为 "on"
 * 然后在 ROM 里搜这个 8 字节 pattern
 */
import fs from 'fs';

const base = 'd:/studio/github/monkeycode/src/langrisser2/20260713';
const rom = new Uint8Array(fs.readFileSync(`${base}/Langrisser II (Japan).md`));
const vram = new Uint8Array(fs.readFileSync(`${base}/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram`));

// VRAM tile → 1bpp (8 bytes)
function vramTo1bpp(tileIdx) {
  const off = tileIdx * 32;
  const bytes = [];
  for (let y = 0; y < 8; y++) {
    let byte = 0;
    for (let x = 0; x < 8; x++) {
      // Read 4bpp pixel from 4 interleaved bitplanes
      let pixel = 0;
      for (let p = 0; p < 4; p++) {
        const planeByte = vram[off + y + p * 8];
        const bit = (planeByte >> (7 - x)) & 1;
        pixel |= bit << p;
      }
      if (pixel !== 0) byte |= (1 << (7 - x));
    }
    bytes.push(byte);
  }
  return new Uint8Array(bytes);
}

// Decode VRAM 4bpp tile to pixel array (for display)
function tileToPixels(tileIdx) {
  const off = tileIdx * 32;
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      let p = 0;
      for (let b = 0; b < 4; b++) {
        p |= ((vram[off + y + b * 8] >> (7 - x)) & 1) << b;
      }
      pixels[y * 8 + x] = p;
    }
  }
  return pixels;
}

// Display tile as ASCII art
function tileToPre(tileIdx) {
  const p = tileToPixels(tileIdx);
  let s = `Tile 0x${tileIdx.toString(16).padStart(3, '0')}:\n`;
  for (let y = 0; y < 8; y++) {
    s += '  ';
    for (let x = 0; x < 8; x++) {
      const px = p[y * 8 + x];
      s += px === 0 ? '.' : px.toString(16);
    }
    s += '\n';
  }
  return s;
}

// Display 1bpp as ASCII
function bpp1ToPre(bytes) {
  let s = '  1bpp:\n';
  for (let y = 0; y < 8; y++) {
    const b = bytes[y];
    s += '  ';
    for (let x = 0; x < 8; x++) {
      s += (b >> (7 - x)) & 1 ? '#' : '.';
    }
    s += `  0x${b.toString(16).padStart(2, '0')}\n`;
  }
  return s;
}

// ===== Check copyright text tiles =====
console.log('=== 版权文字 VRAM tile 内容 ===\n');

// From nametable: "1994 NCS" 
// Row 23 tiles: 0x080, 0x0c1(?), ... let's decode properly
const copyrightCodes = [0x4080, 0x3180, 0x3980, 0x3980, 0x3480, 0x0080, 0x4e80, 0x4380, 0x5380, 0x4380, 0x4f80, 0x5280, 0x5080, 0x2e80];
const copyrightTiles = copyrightCodes.map(w => w & 0x7FF);
const uniqueTiles = [...new Set(copyrightTiles)].filter(t => t !== 0).sort((a,b)=>a-b);

for (const idx of uniqueTiles) {
  console.log(tileToPre(idx));
  console.log(bpp1ToPre(vramTo1bpp(idx)));
  console.log('');
}

// ===== Search ROM for 1bpp patterns ====
console.log('=== 在 ROM 中搜索 1bpp font pattern ===\n');

for (const idx of uniqueTiles) {
  const bpp1 = vramTo1bpp(idx);
  const target = Array.from(bpp1);
  
  let hits = [];
  for (let off = 0; off < rom.length - 8; off++) {
    let match = true;
    for (let i = 0; i < 8; i++) {
      if (rom[off + i] !== target[i]) { match = false; break; }
    }
    if (match) hits.push(off);
  }
  
  console.log(`VRAM tile 0x${idx.toString(16).padStart(3,'0')}: ${hits.length} ROM matches`);
  if (hits.length > 0 && hits.length <= 10) {
    hits.forEach(h => console.log(`  ROM 0x${h.toString(16)}`));
  }
}

// ===== Also try: ROM 1bpp → VRAM 4bpp expansion check =====
// On Mega Drive, fonts are often stored as 1bpp with 
// row data first (not bitplane). But we need to index a palette.
// Try: 1bpp 8 bytes → 4bpp 32 bytes (copy source byte to all 4 planes)
console.log('\n=== 搜索 ROM 中作为 tiles 存储的 1bpp font (8-byte tiles) ===\n');

// More useful: group all unique tiles and search consecutively
// If fonts are stored contiguously in ROM, we'd find consecutive tiles

// Actually, let's search for known font layout.
// "1994 NCS" → characters: '1','9','9','4',' ','N','C','S'
// The VRAM tiles might be:
// 0x080 = '1'? 0x0c0/0x0c1 = '9'? etc.

// Let me search for '1' pattern specifically
// Character '1' in typical 8x8 font:
const CHAR_1 = [0x06,0x0E,0x1E,0x06,0x06,0x06,0x3F,0x00]; // simple vertical stroke
console.log('Searching for character "1" pattern:');
let h1 = 0;
for (let o = 0; o < rom.length - 8; o++) {
  if (rom[o]==CHAR_1[0]&&rom[o+1]==CHAR_1[1]&&rom[o+2]==CHAR_1[2]&&rom[o+3]==CHAR_1[3]&&
      rom[o+4]==CHAR_1[4]&&rom[o+5]==CHAR_1[5]&&rom[o+6]==CHAR_1[6]&&rom[o+7]==CHAR_1[7]) {
    console.log(`  Found at 0x${o.toString(16)}`);
    // Show context (nearby bytes)
    console.log(`  Context: ${Array.from(rom.slice(o-8, o+24)).map(b=>b.toString(16).padStart(2,'0')).join(' ')}`);
    h1++;
    if (h1 >= 5) break;
  }
}
if (h1 === 0) console.log('  Not found');

// Try a generic pattern for the first non-empty tile (0x080)
console.log('\n=== First copyright tile 0x080 - direct 1bpp ROM search ===');
const tile080 = vramTo1bpp(0x080);
console.log('Bytes:', Array.from(tile080).map(b=>b.toString(16).padStart(2,'0')).join(' '));
const arr080 = Array.from(tile080);
let count080 = 0;
for (let o = 0; o < rom.length - 8; o++) {
  if (rom[o]==arr080[0]&&rom[o+1]==arr080[1]&&rom[o+2]==arr080[2]&&rom[o+3]==arr080[3]&&
      rom[o+4]==arr080[4]&&rom[o+5]==arr080[5]&&rom[o+6]==arr080[6]&&rom[o+7]==arr080[7]) {
    console.log(`  Match at ROM 0x${o.toString(16)}`);
    count080++;
    if (count080 >= 5) break;
  }
}
if (count080 === 0) console.log('  NOT FOUND');
