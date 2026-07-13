import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');

const rom = new Uint8Array(readFileSync(join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan).md')));
const vram = new Uint8Array(readFileSync(join(ROOT, 'src/langrisser2/20260713/Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram')));

function readLong(off) {
  return ((rom[off] & 0xff) << 24) | ((rom[off + 1] & 0xff) << 16) | ((rom[off + 2] & 0xff) << 8) | (rom[off + 3] & 0xff);
}
function readWord(off) { return ((rom[off] & 0xff) << 8) | (rom[off + 1] & 0xff); }

function tileToString(t) {
  return Array.from(t).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Decode VDP bit-plane tile to 64 pixel values
function decodeVdpTile(raw32) {
  const pixels = new Uint8Array(64);
  for (let y = 0; y < 8; y++) {
    for (let p = 0; p < 4; p++) {
      const byte = raw32[y + p * 8];
      for (let x = 0; x < 8; x++) {
        const bit = (byte >> (7 - x)) & 1;
        pixels[y * 8 + x] |= bit << p;
      }
    }
  }
  return pixels;
}

// LZSS decompress
function decompLZSS(addr) {
  const size = ((rom[addr + 1] & 0xff) << 8) | (rom[addr + 2] & 0xff);
  const window = new Uint8Array(0x1000).fill(0x20);
  let wp = 0x0fee, rem = size, out = new Uint8Array(size), op = 0, cp = addr + 3;
  while (rem > 0) {
    const f = rom[cp++];
    for (let b = 0; b < 8 && rem > 0; b++) {
      if ((f >> b) & 1) {
        const by = rom[cp++];
        window[wp] = by;
        out[op++] = by;
        wp = (wp + 1) & 0xfff;
        rem--;
      } else {
        const b1 = rom[cp++], b2 = rom[cp++];
        let mo = (b1 | ((b2 & 0xf0) << 4)) & 0xfff;
        const ml = (b2 & 0x0f) + 2;
        for (let i = 0; i < ml && rem > 0; i++) {
          const by = window[mo];
          window[wp] = by;
          out[op++] = by;
          mo = (mo + 1) & 0xfff;
          wp = (wp + 1) & 0xfff;
          rem--;
        }
      }
    }
  }
  return out;
}

// Type 2 decompress (returns VDP-format tiles = 32 bytes each)
function decompType2(addr) {
  const b1 = rom[addr + 1];
  const compressed = (b1 & 0x80) !== 0;
  const planes = b1 & 0x7f;
  if (!compressed) {
    const size = readWord(addr + 2);
    const outputSize = size * planes * 8;
    return rom.slice(addr + 4, addr + 4 + outputSize);
  }
  const lookupTable = new Uint8Array(16);
  for (let i = 0; i < 8; i++) {
    const b = rom[addr + 2 + i];
    lookupTable[i * 2] = (b >> 4) & 0x0f;
    lookupTable[i * 2 + 1] = b & 0x0f;
  }
  const size = readWord(addr + 10);
  const ctrlStart = addr + 12;
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

// Build hash map from decompressed resources
const TABLE = 0x0B0000;
const tileMap = new Map(); // hash -> [{entry, tileno, type}]

let totalEntries = 0;
for (let i = 0; i < 256; i++) {
  const p = readLong(TABLE + i * 4);
  if (p < 0x0B0000 || p >= rom.length) continue;
  const type = rom[p];
  let d = null;
  try {
    if (type === 3) d = decompLZSS(p);
    else if (type === 2) d = decompType2(p);
  } catch (e) {}
  if (!d) continue;
  totalEntries++;
  for (let o = 0; o + 32 <= d.length; o += 32) {
    const hash = tileToString(d.slice(o, o + 32));
    if (!tileMap.has(hash)) tileMap.set(hash, []);
    tileMap.get(hash).push({ entry: i, tileno: Math.floor(o / 32), type });
  }
}

console.log(`Decompressed ${totalEntries} entries (Type 2 + Type 3), ${tileMap.size} unique tiles\n`);

// The copyright text tiles as seen in Plane A nametable
const copyrightTiles = [0x080, 0x0c0, 0x0c1, 0x180, 0x1c1, 0x280, 0x2c1, 0x780];

console.log('=== Raw VRAM hash matching ===');
copyrightTiles.forEach(idx => {
  const raw = vram.slice(idx * 32, idx * 32 + 32);
  const hash = tileToString(raw);
  const match = tileMap.get(hash);
  if (match) {
    const uniq = [...new Set(match.map(m => `entry ${m.entry} tile#${m.tileno}`))];
    console.log(`VRAM 0x${idx.toString(16).padStart(3,'0')}: ${uniq.join(', ')}`);
  } else {
    console.log(`VRAM 0x${idx.toString(16).padStart(3,'0')}: NOT FOUND (raw bytes)`);
  }
});

// Try pixel-level match
console.log('\n=== Pixel-level matching (decode both sides) ===');
const pixelMap = new Map();
for (let i = 0; i < 256; i++) {
  const p = readLong(TABLE + i * 4);
  if (p < 0x0B0000 || p >= rom.length) continue;
  const type = rom[p];
  let d = null;
  try {
    if (type === 3) d = decompLZSS(p);
    else if (type === 2) d = decompType2(p);
  } catch (e) {}
  if (!d) continue;
  for (let o = 0; o + 32 <= d.length; o += 32) {
    const pixels = decodeVdpTile(d.slice(o, o + 32));
    const hash = tileToString(pixels);
    if (!pixelMap.has(hash)) pixelMap.set(hash, []);
    pixelMap.get(hash).push({ entry: i, tileno: Math.floor(o / 32), type });
  }
}

copyrightTiles.forEach(idx => {
  const raw = vram.slice(idx * 32, idx * 32 + 32);
  const pixels = decodeVdpTile(raw);
  const hash = tileToString(pixels);
  const match = pixelMap.get(hash);
  if (match) {
    const uniq = [...new Set(match.map(m => `entry ${m.entry} tile#${m.tileno}`))];
    console.log(`VRAM 0x${idx.toString(16).padStart(3,'0')}: ${uniq.join(', ')}`);
  } else {
    console.log(`VRAM 0x${idx.toString(16).padStart(3,'0')}: NOT FOUND (pixels)`);
  }
});
