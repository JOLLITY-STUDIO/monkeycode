const fs = require('fs');
const rom = fs.readFileSync('20260713/Langrisser II (Japan).md');
function read8(a) { return rom[a]; }
function read16(a) { return (rom[a] << 8) | rom[a + 1]; }
function read32(a) { return ((rom[a] << 24) | (rom[a + 1] << 16) | (rom[a + 2] << 8) | rom[a + 3]) >>> 0; }
function h(v,p) { return v.toString(16).toUpperCase().padStart(p||4,'0'); }

const index = 1;
const ptr = read32(0x0B0000 + index * 4);
console.log(`ptr=0x${h(ptr,6)}`);

// total expected size
const totalExpected = read16(ptr + 1);
console.log(`totalExpectedSize=${totalExpected} (0x${h(totalExpected,4)})`);

// Try multi-chunk LZSS where each chunk ends with offset=0,
// and after each end marker, the next chunk starts with [chunkSize:2B]
let src = ptr + 3; // skip type + totalSize
let dst = 0;
const buf = new Uint8Array(0x10000);
let chunkNum = 0;

while (dst < totalExpected && src < rom.length && chunkNum < 100) {
  chunkNum++;
  const chunkExpected = read16(src);
  src += 2;
  const chunkDstStart = dst;

  console.log(`  Chunk ${chunkNum}: expected=${chunkExpected} src=0x${h(src,6)} dst=${dst}`);

  while (dst < buf.length && src < rom.length) {
    const flags = read8(src); src++;
    for (let bit = 0; bit < 8; bit++) {
      if (dst >= chunkDstStart + chunkExpected) break;
      if (dst >= buf.length) break;
      
      if ((flags >> bit) & 1) {
        if (src >= rom.length) break;
        buf[dst] = read8(src); src++; dst++;
      } else {
        if (src >= rom.length) break;
        const b0 = read8(src); src++;
        if (src >= rom.length) break;
        const b1 = read8(src); src++;
        const offset = ((b1 & 0x0F) << 8) | b0;
        if (offset === 0) {
          const actual = dst - chunkDstStart;
          console.log(`    → end marker, actual=${actual} match=${actual===chunkExpected}`);
          // verify we're at src boundary for next chunk
          if (actual !== chunkExpected && chunkNum === 1) {
            // maybe there's extra padding? print next bytes
            let dbg = '';
            for (let i = 0; i < 8; i++) dbg += ' ' + h(read8(src + i), 2);
            console.log(`    → next bytes at 0x${h(src,6)}:${dbg}`);
          }
          break;
        }
        let len = (b1 >> 4) + 3;
        const srcPos = dst - offset;
        for (let i = 0; i < len && dst < buf.length; i++) {
          buf[dst] = (srcPos + i < dst && srcPos + i >= 0) ? buf[srcPos + i] : 0;
          dst++;
        }
      }
    }
  }
}

console.log(`\nFinal dst=${dst}, totalExpected=${totalExpected}, match=${dst===totalExpected}`);

// Check: is the data valid? Print first few bytes
console.log('First 32 decompressed bytes:', [...buf.slice(0,32)].map(b=>h(b,2)).join(' '));
