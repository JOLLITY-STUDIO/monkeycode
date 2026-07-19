const fs = require('fs');
const rom = fs.readFileSync('20260713/Langrisser II (Japan).md');

function read8(addr) { return rom[addr]; }
function read16(addr) { return (rom[addr] << 8) | rom[addr + 1]; }
function read32(addr) { return ((rom[addr] << 24) | (rom[addr + 1] << 16) | (rom[addr + 2] << 8) | rom[addr + 3]) >>> 0; }
function h(v, p) { return v.toString(16).toUpperCase().padStart(p || 4, '0'); }

// ── 资源指针表 ──
const RES_PTR_TABLE = 0x0B0000;
const index = 1; // resource $8001 → index=1

const ptr = read32(RES_PTR_TABLE + index * 4);
console.log(`Resource index=${index}, ptr=0x${h(ptr, 6)}`);

const typeByte = read8(ptr);
console.log(`Type byte at ptr: 0x${h(typeByte, 2)}`);

const outSizeAddr = ptr + 1; // skip type byte
const expectedSize = read16(outSizeAddr);
console.log(`Expected outSize at ${h(outSizeAddr, 6)}: ${expectedSize} (0x${h(expectedSize, 4)})`);

const streamStart = ptr + 3; // type(1B) + outSize(2B)
console.log(`LZSS stream starts at: 0x${h(streamStart, 6)}`);

// print first 40 bytes of stream
let hexStr = '';
for (let i = 0; i < 40; i++) hexStr += ' ' + h(read8(streamStart + i), 2);
console.log(`Stream head:${hexStr}`);

console.log('\n--- LZSS decompression simulation ---');

let src = streamStart;
let dst = 0;
const buf = new Uint8Array(0x10000);
let debugSteps = 30;

while (dst < expectedSize && src < rom.length && debugSteps > 0) {
  const flags = read8(src);
  src++;
  debugSteps--;

  for (let bit = 0; bit < 8; bit++) {
    if (dst >= expectedSize) break;

    if ((flags >> bit) & 1) {
      // literal
      if (src >= rom.length) break;
      buf[dst] = read8(src);
      src++;
      dst++;
      console.log(`  literal: dst=${dst-1} val=0x${h(buf[dst-1], 2)}`);
    } else {
      // back-reference
      if (src >= rom.length) break;
      const b0 = read8(src); src++;
      if (src >= rom.length) break;
      const b1 = read8(src); src++;

      const offset = ((b1 & 0x0F) << 8) | b0;
      let length = (b1 >> 4) + 3;

      console.log(`  backref: offset=${offset} length=${length} dst=${dst} srcPos=${dst-offset} (src=0x${h(src,6)})`);

      if (offset === 0) {
        console.log(`  → END MARKER: dst=${dst}, expected=${expectedSize}`);
        debugSteps = 0;
        break;
      }

      const srcPos = dst - offset;
      for (let i = 0; i < length && dst < buf.length; i++) {
        if (srcPos + i < dst && srcPos + i >= 0) {
          buf[dst] = buf[srcPos + i];
        } else {
          buf[dst] = 0;
        }
        dst++;
      }
    }
  }
}

console.log(`\nFinal dst=${dst}, expected=${expectedSize}, match=${dst === expectedSize}`);
