import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const ROM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = new Uint8Array(readFileSync(ROM_PATH));
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const PLANE_A_BASE = 0xC000;
const PLANE_B_BASE = 0xE000;
const WINDOW_BASE = 0x7800;
const SPRITE_BASE = 0xD800;
const SCREEN_WIDTH = 64;
const SCREEN_HEIGHT = 32;

function readByte(offset) { return rom[offset] & 0xff; }
function readWord(offset) { return ((rom[offset] & 0xff) << 8) | (rom[offset + 1] & 0xff); }
function readLong(offset) {
  return (((rom[offset] & 0xff) << 24) | ((rom[offset + 1] & 0xff) << 16) | ((rom[offset + 2] & 0xff) << 8) | (rom[offset + 3] & 0xff)) >>> 0;
}

function decompressLZSS(resourceAddr) {
  const decompressedSize = readWord(resourceAddr + 1);
  const compressedDataStart = resourceAddr + 3;
  const window = new Uint8Array(0x1000).fill(0x20);
  let windowPos = 0x0fee;
  let remaining = decompressedSize;
  const output = new Uint8Array(decompressedSize);
  let outputPos = 0;
  let compressedPos = compressedDataStart;
  while (remaining > 0) {
    const flagByte = rom[compressedPos++];
    for (let bit = 0; bit < 8 && remaining > 0; bit++) {
      if ((flagByte >> bit) & 1) {
        const byte = rom[compressedPos++];
        window[windowPos] = byte;
        output[outputPos++] = byte;
        windowPos = (windowPos + 1) & 0xfff;
        remaining--;
      } else {
        const b1 = rom[compressedPos++];
        const b2 = rom[compressedPos++];
        let matchOffset = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const matchLength = (b2 & 0x0f) + 2;
        for (let i = 0; i < matchLength && remaining > 0; i++) {
          const byte = window[matchOffset];
          window[windowPos] = byte;
          output[outputPos++] = byte;
          matchOffset = (matchOffset + 1) & 0xfff;
          windowPos = (windowPos + 1) & 0xfff;
          remaining--;
        }
      }
    }
  }
  return output;
}

function decompressType2(resourceAddr) {
  const b1 = rom[resourceAddr + 1];
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;
  if (!compressed) {
    const size = readWord(resourceAddr + 2);
    const outputSize = size * planes * 8;
    return rom.slice(resourceAddr + 4, resourceAddr + 4 + outputSize);
  }
  const lookupTable = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = rom[resourceAddr + 2 + i];
    lookupTable[i * 2] = (b >> 4) & 0x0f;
    lookupTable[i * 2 + 1] = b & 0x0f;
  }
  const size = readWord(resourceAddr + 10);
  const ctrlStart = resourceAddr + 12;
  const pixelStart = ctrlStart + size;
  let planeCount = planes;
  if (planeCount !== 2) planeCount ^= 5;
  const outputSize = size * planes * 8;
  const bytesPerTile = planeCount * 8 * planes;
  const tileCount = Math.floor(size / planeCount);
  const output = new Uint8Array(outputSize);
  let ctrlPos = ctrlStart;
  let pixelPos = pixelStart;
  for (let tile = 0; tile < tileCount; tile++) {
    const workBuf = new Uint8Array(bytesPerTile);
    let workPos = 0;
    for (let plane = 0; plane < planeCount; plane++) {
      const ctrlByte = rom[ctrlPos++];
      for (let bit = 7; bit >= 0; bit--) {
        const isData = (ctrlByte >> bit) & 1;
        if (isData) for (let p = 0; p < planes; p++) workBuf[workPos++] = rom[pixelPos++];
        else for (let p = 0; p < planes; p++) workBuf[workPos++] = 0;
      }
    }
    const tileOutput = new Uint8Array(32);
    let outWordPos = 0;
    const numPlanes = Math.min(planeCount, 4);
    for (let outer = 0; outer < 4; outer++) {
      const planeShorts = [];
      for (let p = 0; p < numPlanes; p++) {
        const byteOffset = (outer + p * 4) * 2;
        planeShorts.push(((workBuf[byteOffset] || 0) << 8) | (workBuf[byteOffset + 1] || 0));
      }
      for (let inner = 0; inner < 4; inner++) {
        let pixels = 0;
        for (let pix = 0; pix < 4; pix++) {
          const bit0 = numPlanes > 0 ? ((planeShorts[0] & 0x8000) ? 1 : 0) : 0;
          const bit1 = numPlanes > 1 ? ((planeShorts[1] & 0x8000) ? 1 : 0) : 0;
          const bit2 = numPlanes > 2 ? ((planeShorts[2] & 0x8000) ? 1 : 0) : 0;
          const bit3 = numPlanes > 3 ? ((planeShorts[3] & 0x8000) ? 1 : 0) : 0;
          const index = (bit3 << 3) | (bit1 << 2) | (bit2 << 1) | bit0;
          pixels = (pixels << 4) | lookupTable[index];
          for (let p = 0; p < numPlanes; p++) planeShorts[p] = (planeShorts[p] << 1) & 0xffff;
        }
        tileOutput[outWordPos * 2] = (pixels >> 8) & 0xff;
        tileOutput[outWordPos * 2 + 1] = pixels & 0xff;
        outWordPos++;
      }
    }
    output.set(tileOutput, tile * 32);
  }
  return output;
}

function decompressNibbleRLE(resourceAddr) {
  const totalBytes = readWord(resourceAddr + 1);
  const compressedStart = resourceAddr + 3;
  let d5 = 0, bVar3 = false, bVar7 = 0x7f, sVar6 = 3, outputBytes = 0;
  const output = new Uint8Array(totalBytes);
  let outputPos = 0, puVar12 = compressedStart;
  function packNibble(nibble) {
    d5 = ((d5 << 4) | (nibble & 0x0f)) & 0xffff;
    sVar6--;
    if (sVar6 === -1) {
      sVar6 = 3;
      output[outputPos++] = (d5 >> 8) & 0xff;
      output[outputPos++] = d5 & 0xff;
      outputBytes += 2;
    }
  }
  while (outputBytes < totalBytes) {
    const bVar2 = !bVar3;
    let bVar9, puVar11;
    if (bVar2) { bVar9 = (rom[puVar12] >> 4) & 0x0f; puVar11 = puVar12; }
    else { puVar11 = puVar12 + 1; bVar9 = rom[puVar12] & 0x0f; }
    puVar12 = puVar11;
    if (bVar9 === bVar7) {
      let uVar8;
      if (bVar3) uVar8 = (rom[puVar11] >> 4) & 0x0f;
      else { puVar12 = puVar11 + 1; uVar8 = rom[puVar11] & 0x0f; }
      do { packNibble(bVar7); uVar8 = (uVar8 - 1) & 0xffff; } while (uVar8 !== 0xffff && outputBytes < totalBytes);
    } else { packNibble(bVar9); bVar3 = bVar2; bVar7 = bVar9; }
  }
  return output;
}

function tileHash(tileBytes) {
  return Array.from(tileBytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Build map from tile bytes to resource entry/tile number
const tileMap = new Map();
const TABLE_BASE = 0x000b0000;
console.log('Decompressing all resources...');
let entryCount = 0;
for (let entry = 0; entry < 256; entry++) {
  const pointer = readLong(TABLE_BASE + entry * 4);
  if (pointer === 0 || pointer >= rom.length) continue;
  const type = rom[pointer];
  let decompressed;
  try {
    if (type === 3) decompressed = decompressLZSS(pointer);
    else if (type === 2) decompressed = decompressType2(pointer);
    else if (type === 1) decompressed = decompressNibbleRLE(pointer);
    else continue;
  } catch (e) {
    console.log(`Entry ${entry} error: ${e.message}`);
    continue;
  }
  entryCount++;
  for (let offset = 0; offset + 32 <= decompressed.length; offset += 32) {
    const tileBytes = decompressed.slice(offset, offset + 32);
    const hash = tileHash(tileBytes);
    if (!tileMap.has(hash)) tileMap.set(hash, []);
    tileMap.get(hash).push({ entry, type, pointer, tileNo: offset / 32, resourceOffset: offset });
  }
}
console.log(`Decompressed ${entryCount} resources. Tile map has ${tileMap.size} unique tiles.`);

// Now read all tiles used in title screen name tables and look them up
function readNameWord(planeBase, row, col) {
  const offset = planeBase + (row * SCREEN_WIDTH + col) * 2;
  if (offset + 2 > vram.length) return 0;
  return (vram[offset] << 8) | vram[offset + 1];
}

function getVramTile(tileIndex) {
  const offset = (tileIndex & 0x7FF) * 32;
  if (offset + 32 > vram.length) return new Uint8Array(32);
  return vram.slice(offset, offset + 32);
}

console.log('\n=== Title screen tile sources ===');
const foundTiles = new Set();
for (const planeBase of [PLANE_A_BASE, PLANE_B_BASE, WINDOW_BASE]) {
  const planeName = planeBase === PLANE_A_BASE ? 'A' : planeBase === PLANE_B_BASE ? 'B' : 'W';
  for (let row = 0; row < SCREEN_HEIGHT; row++) {
    for (let col = 0; col < SCREEN_WIDTH; col++) {
      const word = readNameWord(planeBase, row, col);
      const tileIndex = word & 0x7FF;
      const key = `${planeName}:${tileIndex}`;
      if (foundTiles.has(key)) continue;
      foundTiles.add(key);
      const tileBytes = getVramTile(tileIndex);
      const hash = tileHash(tileBytes);
      const sources = tileMap.get(hash);
      if (sources) {
        console.log(`Plane ${planeName} tile 0x${tileIndex.toString(16).padStart(3, '0')} at row ${row}, col ${col} → Resource entry ${sources[0].entry}, type ${sources[0].type}, tileNo ${sources[0].tileNo}`);
      }
    }
  }
}

console.log('\n=== Sprite tile sources (first 80 sprites) ===');
for (let sprite = 0; sprite < 80; sprite++) {
  const offset = SPRITE_BASE + sprite * 8;
  if (offset + 8 > vram.length) break;
  const y = (vram[offset] << 8) | vram[offset + 1];
  const sizeAndLink = (vram[offset + 2] << 8) | vram[offset + 3];
  const tileIndex = ((vram[offset + 4] << 8) | vram[offset + 5]) & 0x7FF;
  const x = (vram[offset + 6] << 8) | vram[offset + 7];
  if (y >= 0x80 && y < 0x100) continue; // off-screen
  const tileBytes = getVramTile(tileIndex);
  const hash = tileHash(tileBytes);
  const sources = tileMap.get(hash);
  if (sources) {
    console.log(`Sprite ${sprite}: tile 0x${tileIndex.toString(16).padStart(3, '0')} at (${x},${y}) → Resource entry ${sources[0].entry}, type ${sources[0].type}, tileNo ${sources[0].tileNo}`);
  }
}
