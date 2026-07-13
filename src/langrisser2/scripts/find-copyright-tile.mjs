import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const ROM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');
const VRAM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');

const rom = new Uint8Array(readFileSync(ROM_PATH));
const vram = new Uint8Array(readFileSync(VRAM_PATH));

const TILE_SIZE = 32; // 4bpp 8x8 tile = 32 bytes
const tileIndex = 0x40;
const tileOffset = tileIndex * TILE_SIZE; // 0x800
const targetTile = vram.slice(tileOffset, tileOffset + TILE_SIZE);

console.log(`VRAM dump size: ${vram.length} bytes`);
console.log(`Target tile index: ${tileIndex} (offset 0x${tileOffset.toString(16)})`);
console.log('Target tile bytes:');
for (let i = 0; i < TILE_SIZE; i += 8) {
  console.log('  ' + Array.from(targetTile.slice(i, i + 8)).map(b => b.toString(16).padStart(2, '0')).join(' '));
}
console.log();

function readByte(offset) { return rom[offset] & 0xff; }
function readWord(offset) { return ((rom[offset] & 0xff) << 8) | (rom[offset + 1] & 0xff); }
function readLong(offset) {
  return (
    ((rom[offset] & 0xff) << 24) |
    ((rom[offset + 1] & 0xff) << 16) |
    ((rom[offset + 2] & 0xff) << 8) |
    (rom[offset + 3] & 0xff)
  );
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
      const isLiteral = (flagByte >> bit) & 1;
      if (isLiteral) {
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
        if (isData) {
          for (let p = 0; p < planes; p++) workBuf[workPos++] = rom[pixelPos++];
        } else {
          for (let p = 0; p < planes; p++) workBuf[workPos++] = 0;
        }
      }
    }
    const tileOutput = new Uint8Array(32);
    let outWordPos = 0;
    const numPlanes = Math.min(planeCount, 4);
    for (let outer = 0; outer < 4; outer++) {
      const planeShorts = [];
      for (let p = 0; p < numPlanes; p++) {
        const byteOffset = (outer + p * 4) * 2;
        const hi = workBuf[byteOffset] || 0;
        const lo = workBuf[byteOffset + 1] || 0;
        planeShorts.push((hi << 8) | lo);
      }
      for (let inner = 0; inner < 4; inner++) {
        let pixels = 0;
        for (let pix = 0; pix < 4; pix++) {
          const bit0 = numPlanes > 0 ? ((planeShorts[0] & 0x8000) ? 1 : 0) : 0;
          const bit1 = numPlanes > 1 ? ((planeShorts[1] & 0x8000) ? 1 : 0) : 0;
          const bit2 = numPlanes > 2 ? ((planeShorts[2] & 0x8000) ? 1 : 0) : 0;
          const bit3 = numPlanes > 3 ? ((planeShorts[3] & 0x8000) ? 1 : 0) : 0;
          const index = (bit3 << 3) | (bit1 << 2) | (bit2 << 1) | bit0;
          const pixel = lookupTable[index];
          pixels = (pixels << 4) | pixel;
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
  let d5 = 0;
  let bVar3 = false;
  let bVar7 = 0x7f;
  let sVar6 = 3;
  let outputBytes = 0;
  const output = new Uint8Array(totalBytes);
  let outputPos = 0;
  let puVar12 = compressedStart;

  function packNibble(nibble) {
    const shifted = (d5 << 4) & 0xffff;
    d5 = (shifted | (nibble & 0x0f)) & 0xffff;
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
    let bVar9;
    let puVar11;
    if (bVar2) {
      bVar9 = (rom[puVar12] >> 4) & 0x0f;
      puVar11 = puVar12;
    } else {
      puVar11 = puVar12 + 1;
      bVar9 = rom[puVar12] & 0x0f;
    }
    puVar12 = puVar11;
    if (bVar9 === bVar7) {
      let uVar8;
      if (bVar3) {
        uVar8 = (rom[puVar11] >> 4) & 0x0f;
      } else {
        puVar12 = puVar11 + 1;
        uVar8 = rom[puVar11] & 0x0f;
      }
      do {
        packNibble(bVar7);
        uVar8 = (uVar8 - 1) & 0xffff;
      } while (uVar8 !== 0xffff && outputBytes < totalBytes);
    } else {
      packNibble(bVar9);
      bVar3 = bVar2;
      bVar7 = bVar9;
    }
  }
  return output;
}

function findSubarray(haystack, needle) {
  const positions = [];
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let match = true;
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        match = false;
        break;
      }
    }
    if (match) positions.push(i);
  }
  return positions;
}

const TABLE_BASE = 0x000b0000;
console.log('Searching all 256 resource entries for target tile...\n');

let matches = [];
for (let entry = 0; entry < 256; entry++) {
  const pointer = readLong(TABLE_BASE + entry * 4);
  if (pointer === 0 || pointer >= rom.length) continue;
  const type = rom[pointer];

  let decompressed;
  let typeName = '?';
  try {
    if (type === 3) {
      decompressed = decompressLZSS(pointer);
      typeName = 'LZSS';
    } else if (type === 2) {
      decompressed = decompressType2(pointer);
      typeName = 'Type2';
    } else if (type === 1) {
      decompressed = decompressNibbleRLE(pointer);
      typeName = 'NibbleRLE';
    } else if (type === 0 || type === 4) {
      decompressed = new Uint8Array(0);
      typeName = `Type${type}`;
    } else {
      continue;
    }
  } catch (e) {
    console.log(`Entry ${entry}: type ${type} at 0x${pointer.toString(16)} - ERROR: ${e.message}`);
    continue;
  }

  const positions = findSubarray(decompressed, targetTile);
  if (positions.length > 0) {
    const tileNos = positions.map(pos => Math.floor(pos / TILE_SIZE));
    console.log(`MATCH Entry ${entry}: type=${typeName}, ROM=0x${pointer.toString(16)}, size=${decompressed.length}, positions=[${positions.map(p => '0x' + p.toString(16)).join(', ')}], tileNos=[${tileNos.join(', ')}]`);
    matches.push({ entry, pointer, type, typeName, size: decompressed.length, positions, tileNos, decompressed });
  }
}

console.log(`\nTotal matches: ${matches.length}`);

if (matches.length > 0) {
  console.log('\nTo load these resources via FUN_000099b2:');
  for (const m of matches) {
    const simpleResourceId = m.entry;
    const withDma = simpleResourceId | 0x8000;
    console.log(`  Entry ${m.entry}: D0 = 0x${withDma.toString(16).padStart(4, '0')} (DMA) or 0x${simpleResourceId.toString(16).padStart(4, '0')} (no DMA)`);
  }
}
