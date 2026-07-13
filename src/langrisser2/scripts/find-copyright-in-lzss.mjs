/**
 * Search all LZSS resource entries for the "1994 NCS" copyright tile data.
 * 
 * The copyright text occupies specific tiles in VRAM (0x080+ range).
 * We extract these tiles' pixel data from the VRAM dump and search
 * for them in every decompressed LZSS entry.
 */
import fs from 'fs';

const ROM_PATH = 'src/langrisser2/20260713/Langrisser II (Japan).md';

// Read ROM
const rom = fs.readFileSync(ROM_PATH);

// LZSS resource table at $01539A (from the resource system)
// Each entry: 2 bytes ROM offset (divided by 2), 2 bytes VRAM dest (divided by 32)
// Entry 0 starts the table
const RESOURCE_TABLE_OFFSET = 0x01539A;
const NUM_ENTRIES = 256; // generous estimate

function read16(arr, off) {
  return (arr[off] << 8) | arr[off + 1];
}
function read32(arr, off) {
  return (arr[off] << 24) | (arr[off + 1] << 16) | (arr[off + 2] << 8) | arr[off + 3];
}

// Read resource table
console.log(`Resource table at ROM $${RESOURCE_TABLE_OFFSET.toString(16)}`);
const entries = [];
for (let i = 0; i < NUM_ENTRIES; i++) {
  const off = RESOURCE_TABLE_OFFSET + i * 6;
  if (off + 6 > rom.length) break;
  const romOffset = read16(rom, off) * 2;
  const vramDest = read16(rom, off + 2) * 32;
  const uncompSize = read16(rom, off + 4);
  if (romOffset === 0 && vramDest === 0 && uncompSize === 0) continue;
  entries.push({ index: i, romOffset, vramDest, uncompSize });
}
console.log(`Found ${entries.length} resource entries`);

// LZSS decompressor (same algorithm as game's FUN_000099b2)
function lzssDecompress(rom, srcOff, dstSize) {
  if (dstSize === 0) return null;
  const dst = Buffer.alloc(dstSize);
  let src = srcOff;
  let dstPos = 0;
  
  while (dstPos < dstSize) {
    if (src >= rom.length) break;
    const flags = rom[src++];
    for (let bit = 0; bit < 8 && dstPos < dstSize; bit++) {
      if (flags & (0x80 >> bit)) {
        // Literal byte
        if (src >= rom.length) break;
        if (dstPos < dstSize) dst[dstPos++] = rom[src++];
      } else {
        // Back-reference
        if (src + 1 >= rom.length) break;
        const b1 = rom[src++];
        const b2 = rom[src++];
        const offset = ((b1 & 0x0F) << 8) | b2;
        const len = (b1 >> 4) + 3;
        const refPos = dstPos - offset - 1;
        for (let j = 0; j < len && dstPos < dstSize; j++) {
          if (refPos + j >= 0 && refPos + j < dstPos) {
            dst[dstPos++] = dst[refPos + j];
          } else {
            dst[dstPos++] = 0;
          }
        }
      }
    }
  }
  return dst.subarray(0, dstSize);
}

// We know from the VRAM dump that the copyright tiles are in the range
// VRAM $080-$0E0 area (tile indices 0x080-0x0DF).
// Each tile is 32 bytes (8x8 pixels @ 4bpp).
// Let's search for the first 4-8 tiles of the copyright text patterns.
// But first, let's figure out which tiles contain "1994 NCS"
// by constructing a "fingerprint" from the known tile data.

// From previous analysis, the Plane A nametable at the title screen
// showed "1994 NCS MASAMOTO" or similar at the bottom.
// The tiles used for this text are in the font region.

// Instead of pixel matching (which is complex with 4bpp),
// let's take a different approach: 
// For each resource entry, decompress and search for the ASCII string bytes
// that could represent the copyright text in any encoding.

// The text rendering function loc_0096D6 does:
// move.b (a1)+, d2  → reads one byte from string
// add.w d4, d2     → adds base tile offset  
// We know d4 is set to make ASCII '0' map to the correct tile

// So the string could be in Shift-JIS: "1994 NCS" = 
// $31 $39 $39 $34 $20 $4E $43 $53

const searchBytes = Buffer.from([0x31, 0x39, 0x39, 0x34, 0x20, 0x4E, 0x43, 0x53]);
const searchYear = Buffer.from([0x31, 0x39, 0x39, 0x34]); // "1994"

console.log('\n=== Searching for "1994 NCS" strings in LZSS entries ===');
for (const entry of entries) {
  // Calculate actual ROM position  
  const romAddr = entry.romOffset;
  if (romAddr + 4 > rom.length) continue;
  
  const romLen = read16(rom, romAddr + 2);
  const dataStart = romAddr + 4;
  
  console.log(`Entry ${entry.index}: ROM=$${entry.romOffset.toString(16)} VRAM=$${entry.vramDest.toString(16)} size=${entry.uncompSize} raw=${romLen}`);
  
  if (entry.uncompSize > 0 && entry.uncompSize < 256 * 1024) {
    try {
      const data = lzssDecompress(rom, dataStart, entry.uncompSize);
      if (!data) continue;
      
      const idxFull = data.indexOf(searchBytes);
      const idxYear = data.indexOf(searchYear);
      
      if (idxFull >= 0) {
        console.log(`  >> FOUND "1994 NCS" at byte ${idxFull} ($${(entry.vramDest + idxFull).toString(16)})`);
      }
      if (idxYear >= 0) {
        console.log(`  >> FOUND "1994" at byte ${idxYear} ($${(entry.vramDest + idxYear).toString(16)})`);
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
  }
}

// Also raw search in ROM for the compressed bytes
console.log('\n=== Raw search for "1994 NCS" in ROM ===');
let rawIdx = 0;
for (let i = 0; i < rom.length - 8; i++) {
  let match = true;
  for (let j = 0; j < 8; j++) {
    if (rom[i + j] !== searchBytes[j]) { match = false; break; }
  }
  if (match) {
    rawIdx++;
    console.log(`  Found at ROM address $${i.toString(16)}`);
    if (rawIdx > 10) { console.log(`  ...and more`); break; }
  }
}
console.log(`  Total raw matches: ${rawIdx}`);
