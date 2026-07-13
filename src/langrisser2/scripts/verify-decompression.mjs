import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const ROM_PATH = join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md');

const rom = new Uint8Array(readFileSync(ROM_PATH));

function readWord(offset) { return ((rom[offset] & 0xff) << 8) | (rom[offset + 1] & 0xff); }

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

console.log('=== Entry 0 (LZSS) ===');
const entry0 = decompressLZSS(0x0B06B4);
console.log('Entry 0 decompressed size:', entry0.length, 'expected 1568');

console.log('=== Entry 112 (Type2, compressed) ===');
const entry112 = decompressType2(0xE4EAC);
console.log('Entry 112 decompressed size:', entry112.length, 'expected 864');

console.log('=== Entry 29 (Type2) ===');
const entry29 = decompressType2(0xCC856);
console.log('Entry 29 decompressed size:', entry29.length, 'expected 3776');

console.log('=== Entry 0 header ===');
for (let i = 0; i < 16; i++) console.log('0x' + (0x0B06B4 + i).toString(16), rom[0x0B06B4 + i].toString(16));
console.log('=== Entry 112 header ===');
for (let i = 0; i < 16; i++) console.log('0x' + (0xE4EAC + i).toString(16), rom[0xE4EAC + i].toString(16));
