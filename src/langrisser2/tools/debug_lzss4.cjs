const fs = require('fs');
const rom = fs.readFileSync('20260713/Langrisser II (Japan).md');
function read8(a) { return rom[a]; }
function read16(a) { return (rom[a] << 8) | rom[a + 1]; }
function read32(a) { return ((rom[a] << 24) | (rom[a + 1] << 16) | (rom[a + 2] << 8) | rom[a + 3]) >>> 0; }
function h(v,p) { return v.toString(16).toUpperCase().padStart(p||4,'0'); }

const index = 1;
const ptr = read32(0x0B0000 + index * 4);
const expectedSize = read16(ptr + 1); // 0x2000 = 8192

console.log(`ptr=0x${h(ptr,6)}, expectedSize=${expectedSize} (0x${h(expectedSize,4)})`);

// Theory 1: NO end marker, stop when dst reaches expectedSize
console.log('\n=== Theory 1: No end marker, stop at expectedSize ===');
for (const useHeader of [true, false]) {
  let src = useHeader ? ptr + 3 : ptr + 1;
  let dst = 0;
  const buf = new Uint8Array(0x10000);
  let flagsRead = 0;
  let offsetZeroSeen = 0;
  
  while (dst < expectedSize && src < rom.length) {
    flagsRead++;
    const flags = read8(src); src++;
    for (let bit = 0; bit < 8; bit++) {
      if (dst >= expectedSize) break;
      if ((flags >> bit) & 1) {
        if (src >= rom.length) break;
        buf[dst] = read8(src); src++; dst++;
      } else {
        if (src >= rom.length) break;
        const b0 = read8(src); src++;
        if (src >= rom.length) break;
        const b1 = read8(src); src++;
        const offset = ((b1 & 0x0F) << 8) | b0;
        if (offset === 0) offsetZeroSeen++;
        let len = (b1 >> 4) + 3;
        const srcPos = dst - offset;
        for (let i = 0; i < len && dst < expectedSize; i++) {
          buf[dst] = (srcPos + i < dst && srcPos + i >= 0) ? buf[srcPos + i] : 0;
          dst++;
        }
      }
    }
  }
  console.log(`  header=${useHeader}: dst=${dst} match=${dst===expectedSize} offsetZero=${offsetZeroSeen} flagsRead=${flagsRead} src=0x${h(src,6)}`);
  // check first bytes
  console.log(`    first 16:`, [...buf.slice(0,16)].map(b=>h(b,2)).join(' '));
}

// Theory 2: try reading expectedSize from ptr+3's first 2 bytes when ptr+1 is not expectedSize
console.log('\n=== Theory 2: Decompress from ptr+3, expectedSize from ptr+3 ===');
{
  let src = ptr + 3;
  const embeddedSize = read16(src); // read16 at ptr+3
  src += 2;
  console.log(`  embeddedSize at ptr+3: ${embeddedSize} (0x${h(embeddedSize,4)}) stream=0x${h(src,6)}`);
  
  let dst = 0;
  const buf = new Uint8Array(0x10000);
  while (dst < 0x10000 && src < rom.length) {
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
        if (offset === 0) {
          console.log(`  end marker at dst=${dst}, match=${dst===embeddedSize}`);
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
  console.log(`  final dst=${dst}`);
}
