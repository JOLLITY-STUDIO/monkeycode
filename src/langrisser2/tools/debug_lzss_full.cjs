const fs = require('fs');
const rom = fs.readFileSync('20260713/Langrisser II (Japan).md');

function read8(addr) { return rom[addr]; }
function read16(addr) { return (rom[addr] << 8) | rom[addr + 1]; }
function read32(addr) { return ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0; }
function h(v, p) { return v.toString(16).toUpperCase().padStart(p || 4, '0'); }

const index = 1;
const ptr = read32(0x0B0000 + index * 4);
console.log(`Resource index=${index}, ptr=0x${h(ptr,6)}`);

const typeByte = read8(ptr);
const streamStart = ptr + 3; // skip type(1) + outSize(2)
const expectedSize = read16(ptr + 1);

console.log(`type=0x${h(typeByte,2)}, expectedSize=${expectedSize} (0x${h(expectedSize,4)})`);
console.log(`streamStart=0x${h(streamStart,6)}`);

// Full decompression
let src = streamStart;
let dst = 0;
const buf = new Uint8Array(0x10000);
let steps = 0;

while (dst < 0x10000 && src < rom.length) {
  steps++;
  const flags = read8(src); src++;
  for (let bit = 0; bit < 8; bit++) {
    if (dst >= 0x10000) break;
    if ((flags >> bit) & 1) {
      if (src >= rom.length) break;
      buf[dst] = read8(src); src++; dst++;
    } else {
      if (src >= rom.length) break;
      const b0 = read8(src); src++;
      if (src >= rom.length) break;
      const b1 = read8(src); src++;
      const offset = ((b1 & 0x0F) << 8) | b0;
      let length = (b1 >> 4) + 3;
      if (offset === 0) {
        console.log(`END MARKER: src=0x${h(src,6)} dst=${dst} expected=${expectedSize} match=${dst===expectedSize} steps=${steps}`);
        process.exit(dst === expectedSize ? 0 : 1);
      }
      const srcPos = dst - offset;
      for (let i = 0; i < length && dst < buf.length; i++) {
        buf[dst] = (srcPos + i < dst && srcPos + i >= 0) ? buf[srcPos + i] : 0;
        dst++;
      }
    }
  }
}
console.log(`NO END MARKER: dst=${dst} steps=${steps} src=0x${h(src,6)}`);
process.exit(1);
