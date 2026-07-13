const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const root = path.join(__dirname, '..', '20260713');
const rom = fs.readFileSync(path.join(root, 'Langrisser II (Japan).md'));
const vram = fs.readFileSync(path.join(root, 'Langrisser II (Japan)_VRAM-TITILE-SCEEN.ram'));

const rd = (a) => rom[a & 0xFFFFF] & 0xFF;
const rw = (a) => (rd(a) << 8) | rd(a + 1);
const rl = (a) => (rd(a) << 24) | (rd(a + 1) << 16) | (rd(a + 2) << 8) | rd(a + 3);

function decompressLZSS(romAddr) {
  const decompSize = rw(romAddr + 1);
  const srcStart = romAddr + 3;
  const win = new Uint8Array(0x1000).fill(0x20);
  let wpos = 0x0FEE, out = new Uint8Array(decompSize), opos = 0;
  let spos = srcStart, remain = decompSize;
  while (remain > 0) {
    const flag = rd(spos++);
    for (let b = 0; b < 8 && remain > 0; b++) {
      if ((flag >> b) & 1) {
        const by = rd(spos++);
        win[wpos] = by; out[opos++] = by;
        wpos = (wpos + 1) & 0xFFF; remain--;
      } else {
        const b1 = rd(spos++), b2 = rd(spos++);
        let off = (b1 | ((b2 & 0xF0) << 4)) & 0xFFF;
        const len = (b2 & 0x0F) + 2;
        for (let i = 0; i < len && remain > 0; i++) {
          const by = win[off];
          win[wpos] = by; out[opos++] = by;
          off = (off + 1) & 0xFFF; wpos = (wpos + 1) & 0xFFF; remain--;
        }
      }
    }
  }
  return out;
}

function findBytes(data, target) {
  const matches = [];
  if (!data || data.length < target.length) return matches;
  for (let i = 0; i < data.length - target.length; i++) {
    let match = true;
    for (let j = 0; j < target.length; j++) {
      if (data[i + j] !== target[j]) { match = false; break; }
    }
    if (match) matches.push(i);
  }
  return matches;
}

// Pick a few VRAM tiles from different regions
const sampleTiles = [
  { name: 'title-region-0x20', addr: 0x20 },
  { name: 'title-region-0x100', addr: 0x100 },
  { name: 'title-region-0x800', addr: 0x800 },
  { name: 'region-0x2020', addr: 0x2020 },
  { name: 'region-0x3b20', addr: 0x3b20 },
  { name: 'region-0x9e00', addr: 0x9e00 },
];

console.log('Searching LZSS-only resources for VRAM tile samples:');
for (let idx = 0; idx < 64; idx++) {
  const ptr = rl(0x0B0000 + idx * 4);
  if (rd(ptr) !== 3) continue;
  try {
    const data = decompressLZSS(ptr);
    let any = false;
    for (const tile of sampleTiles) {
      const target = vram.slice(tile.addr, tile.addr + 32);
      const matches = findBytes(data, target);
      if (matches.length > 0) {
        console.log(`  Resource #${idx} (ptr=0x${ptr.toString(16).padStart(6,'0')}, size=${data.length}) contains ${tile.name} at offset 0x${matches[0].toString(16).padStart(4,'0')}`);
        any = true;
      }
    }
  } catch (e) {}
}

console.log('Done.');
