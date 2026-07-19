const fs = require('fs');
const rom = fs.readFileSync('20260713/Langrisser II (Japan).md');
function read8(a) { return rom[a]; }
function read16(a) { return (rom[a] << 8) | rom[a + 1]; }
function h(v,p) { return v.toString(16).toUpperCase().padStart(p||4,'0'); }

const ptr = read16(0x0B0004) + 0x0B0000; // ptr = 0xB0A84
const expectedSize = read16(ptr + 1);

// Try both: with and without the 2-byte header
for (const test of ['WITH_HEADER', 'WITHOUT_HEADER']) {
  let src = test === 'WITH_HEADER' ? ptr + 3 : ptr + 1;
  let dst = 0;
  let buf = new Uint8Array(0x10000);
  let steps = 0;
  let literals = 0, backrefs = 0;

  while (dst < 0x10000 && src < rom.length) {
    steps++;
    if (steps > 10000) break;
    const flags = read8(src); src++;
    for (let bit = 0; bit < 8; bit++) {
      if (dst >= 0x10000) break;
      if ((flags >> bit) & 1) {
        if (src >= rom.length) break;
        buf[dst] = read8(src); src++; dst++; literals++;
      } else {
        if (src >= rom.length) break;
        const b0 = read8(src); src++;
        if (src >= rom.length) break;
        const b1 = read8(src); src++;
        const offset = ((b1 & 0x0F) << 8) | b0;
        if (offset === 0) {
          console.log(`[${test}] End marker at dst=${dst}, expected=${expectedSize}`);
          break;
        }
        let len = (b1 >> 4) + 3;
        backrefs++;
        const srcPos = dst - offset;
        for (let i = 0; i < len && dst < buf.length; i++) {
          buf[dst] = (srcPos + i < dst && srcPos + i >= 0) ? buf[srcPos + i] : 0;
          dst++;
        }
      }
    }
  }
  console.log(`  dst=${dst} literals=${literals} backrefs=${backrefs} steps=${steps}`);
}

// Also try MSB-first
console.log('\n--- MSB-FIRST ---');
{
  let src = ptr + 3;
  let dst = 0;
  let buf = new Uint8Array(0x10000);
  let steps = 0;

  while (dst < 0x10000 && src < rom.length) {
    steps++;
    if (steps > 10000) break;
    const flags = read8(src); src++;
    for (let bit = 7; bit >= 0; bit--) {
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
        if (offset === 0) {
          console.log(`MSB: End at dst=${dst}`);
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
  console.log(`MSB dst=${dst} steps=${steps}`);
}
