const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, '..', '20260713');
const romPath = path.join(base, 'Langrisser II (Japan).md');
const vramPath = path.join(base, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram');
const outDir = path.join(base, 'output', 'verify');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const rom = fs.readFileSync(romPath);
const vram = fs.readFileSync(vramPath);

// Tile 0x40 is at VRAM offset 0x40*32 = 0x800
const tileOffset = 0x40 * 32;
const tileBytes = vram.slice(tileOffset, tileOffset + 32);

console.log('Tile 0x40 bytes:');
for (let i = 0; i < 32; i += 8) {
  console.log(Array.from(tileBytes.slice(i, i + 8)).map(b => b.toString(16).padStart(2, '0')).join(' '));
}

function findBuffer(buf, pat, start = 0, end = buf.length) {
  for (let i = start; i <= end - pat.length; i++) {
    let ok = true;
    for (let j = 0; j < pat.length; j++) {
      if (buf[i + j] !== pat[j]) { ok = false; break; }
    }
    if (ok) return i;
  }
  return -1;
}

function searchInBuffer(buf, bufName, transformations = null) {
  const results = [];
  if (!transformations) transformations = [{ name: 'raw', fn: b => b }];
  for (const { name, fn } of transformations) {
    const transformed = fn(tileBytes);
    const pos = findBuffer(buf, transformed);
    if (pos >= 0) results.push({ bufName, transform: name, pos });
  }
  return results;
}

const transforms = [
  { name: 'raw', fn: b => b },
  { name: 'swapBytes', fn: b => {
    const r = Buffer.alloc(b.length);
    for (let i = 0; i < b.length; i += 2) { r[i] = b[i+1]; r[i+1] = b[i]; }
    return r;
  }},
  { name: 'nibbleSwap', fn: b => Buffer.from(b.map(x => ((x & 0x0F) << 4) | ((x & 0xF0) >> 4))) },
  { name: 'reverse', fn: b => Buffer.from(b).reverse() },
  { name: 'swapRows', fn: b => {
    const r = Buffer.alloc(b.length);
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 4; col++) {
        r[row * 4 + col] = b[(7 - row) * 4 + col];
      }
    }
    return r;
  }},
];

console.log('\n=== Search in ROM raw ===');
const romHits = searchInBuffer(rom, 'ROM', transforms);
console.log('ROM hits:', romHits);

console.log('\n=== Search in ROM at 0x1FC6E6 area (320 bytes) ===');
const areaHits = searchInBuffer(rom.slice(0x1FC6E6, 0x1FC6E6 + 320), 'ROM@1FC6E6', transforms);
if (areaHits.length) console.log(areaHits);
else console.log('not found in that area');

// Decompress resources and search
function readByte(buf, a) { return buf[a] & 0xFF; }
function readWordBE(buf, a) { return (readByte(buf, a) << 8) | readByte(buf, a + 1); }
function readLongBE(buf, a) { return (readByte(buf, a) << 24) | (readByte(buf, a + 1) << 16) | (readByte(buf, a + 2) << 8) | readByte(buf, a + 3); }

function decompressType2(buf, src) {
  if (readByte(buf, src) !== 2) return null;
  const outLen = readWordBE(buf, src + 1);
  const out = new Uint8Array(outLen);
  let s = src + 3, d = 0;
  while (d < outLen) {
    const flags = readByte(buf, s++);
    for (let b = 0; b < 8 && d < outLen; b++) {
      if ((flags >> b) & 1) {
        out[d++] = readByte(buf, s++);
      } else {
        const b1 = readByte(buf, s++);
        const b2 = readByte(buf, s++);
        const off = ((b2 & 0xF0) << 4) | b1;
        const len = (b2 & 0x0F) + 2;
        for (let i = 0; i < len && d < outLen; i++) {
          out[d] = out[d - off - 1];
          d++;
        }
      }
    }
  }
  return out;
}

function decompressType1(buf, src) {
  if (readByte(buf, src) !== 1) return null;
  const outLen = readWordBE(buf, src + 1);
  const out = new Uint8Array(outLen);
  let s = src + 3, d = 0;
  while (d < outLen) {
    const flags = readByte(buf, s++);
    for (let b = 0; b < 8 && d < outLen; b++) {
      if ((flags >> b) & 1) {
        out[d++] = readByte(buf, s++);
      } else {
        const b1 = readByte(buf, s++);
        const b2 = readByte(buf, s++);
        const len = ((b2 & 0xF0) >> 4) + 3;
        const off = (((b2 & 0x0F) << 8) | b1) + 1;
        for (let i = 0; i < len && d < outLen; i++) {
          out[d] = out[d - off];
          d++;
        }
      }
    }
  }
  return out;
}

function decompressType3(buf, src) {
  if (readByte(buf, src) !== 3) return null;
  const outLen = readWordBE(buf, src + 1);
  const out = new Uint8Array(outLen);
  const win = new Uint8Array(0x1000).fill(0x20);
  let w = 0x0FEE, s = src + 3, d = 0, r = outLen;
  while (r > 0) {
    const flags = readByte(buf, s++);
    for (let b = 0; b < 8 && r > 0; b++) {
      if ((flags >> b) & 1) {
        const v = readByte(buf, s++);
        win[w] = v; out[d++] = v; w = (w + 1) & 0xFFF; r--;
      } else {
        const b1 = readByte(buf, s++);
        const b2 = readByte(buf, s++);
        let off = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
        const len = (b2 & 0x0F) + 2;
        for (let i = 0; i < len && r > 0; i++) {
          const v = win[off];
          win[w] = v; out[d++] = v; off = (off + 1) & 0xFFF; w = (w + 1) & 0xFFF; r--;
        }
      }
    }
  }
  return out;
}

function decompress(buf, src) {
  const t = readByte(buf, src);
  if (t === 1) return decompressType1(buf, src);
  if (t === 2) return decompressType2(buf, src);
  if (t === 3) return decompressType3(buf, src);
  return null;
}

console.log('\n=== Decompress resource table and search ===');
for (let i = 0; i < 40; i++) {
  const ptr = readLongBE(rom, 0x0B0000 + i * 4);
  if (ptr === 0) continue;
  if (ptr >= rom.length) continue;
  const type = readByte(rom, ptr);
  if (type !== 1 && type !== 2 && type !== 3) continue;
  try {
    const dec = decompress(rom, ptr);
    if (!dec) continue;
    const hits = searchInBuffer(Buffer.from(dec), `res[${i}]`, transforms);
    if (hits.length) console.log(`Resource ${i} (type ${type}, size ${dec.length})`, hits);
  } catch (e) {}
}

// Also search all decompressed resources for the tile with all four bitplane orderings
console.log('\n=== Bitplane order search in resources ===');
const bitplaneOrders = [
  [0,1,2,3], [3,2,1,0], [0,2,1,3], [1,0,3,2]
];
function reorderBitplanes(b, order) {
  const r = Buffer.alloc(32);
  for (let row = 0; row < 8; row++) {
    for (let p = 0; p < 4; p++) {
      r[row * 4 + p] = b[row * 4 + order[p]];
    }
  }
  return r;
}
for (let i = 0; i < 40; i++) {
  const ptr = readLongBE(rom, 0x0B0000 + i * 4);
  if (ptr === 0 || ptr >= rom.length) continue;
  const type = readByte(rom, ptr);
  if (type !== 1 && type !== 2 && type !== 3) continue;
  try {
    const dec = decompress(rom, ptr);
    if (!dec) continue;
    for (const order of bitplaneOrders) {
      const reordered = reorderBitplanes(tileBytes, order);
      const pos = findBuffer(Buffer.from(dec), reordered);
      if (pos >= 0) {
        console.log(`Resource ${i} bitplane order ${order.join('')} at decompressed offset ${pos.toString(16)}`);
      }
    }
  } catch (e) {}
}

console.log('\n=== Done ===');
