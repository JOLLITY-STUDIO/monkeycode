import fs from 'fs';

const ram = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan)_68K-ram-in-title-page.ram');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');

// MD work RAM starts at $FF0000
const RAM_BASE = 0xFF0000;

function hex(addr) { return '$' + addr.toString(16).toUpperCase().padStart(6, '0'); }
function toMDAddr(offset) { return RAM_BASE + offset; }

// Search for ASCII strings
const patterns = ['1994', 'NCS', 'START', 'MASA', 'COPY', 'SEGA', 'MEGA'];
console.log('=== ASCII strings in RAM ===');
for (const pat of patterns) {
  const buf = Buffer.from(pat, 'ascii');
  for (let i = 0; i <= ram.length - buf.length; i++) {
    let match = true;
    for (let j = 0; j < buf.length && match; j++) {
      if (ram[i + j] !== buf[j]) match = false;
    }
    if (match) {
      // Show surrounding context (32 bytes)
      const ctxStart = Math.max(0, i - 8);
      const ctxEnd = Math.min(ram.length, i + buf.length + 24);
      const ctx = Array.from(ram.subarray(ctxStart, ctxEnd))
        .map(b => b >= 0x20 && b < 0x7F ? String.fromCharCode(b) : '.')
        .join('');
      console.log(`  "${pat}" at RAM offset 0x${i.toString(16).padStart(4,'0')} (${hex(toMDAddr(i))})`);
      console.log(`    context: "${ctx}"`);
    }
  }
}

// Search for Shift-JIS strings containing  "1994"
// In Shift-JIS, "1994" could be fullwidth: $82 $51 $82 $58 $82 $58 $82 $53
// But in this game, ASCII is used for English text

// Also search for string in ROM to compare
console.log('\n=== "1994 NCS" raw in ROM ===');
const search = Buffer.from('1994 NCS', 'ascii');
for (let i = 0; i <= rom.length - search.length; i++) {
  let match = true;
  for (let j = 0; j < search.length && match; j++) {
    if (rom[i + j] !== search[j]) match = false;
  }
  if (match) {
    console.log(`  ROM offset 0x${i.toString(16).padStart(6,'0')} (${hex(i)})`);
  }
}

// Look at the nametable buffer in RAM (Plane A = $FF4000 area in common MD mapping)
// But the game might use different buffers.
// From the ASM we saw: lea ($FF4000).l, a0 and lea ($FF5000).l, a0
// FF4000 = nametable buffer? Let's look at it

console.log('\n=== RAM regions of interest ===');
// VRAM nametable for Plane A would be VRAM $C000-$CFFF
// But the game might build it in RAM first then DMA
// From ASM: $FF4000 and $FF5000 are used as tile map buffers

const nt4000 = ram.subarray(0x4000, 0x4000 + 0x1000);
const nt5000 = ram.subarray(0x5000, 0x5000 + 0x1000);

// Count non-zero, non-FF bytes (real tile references)
function nonEmpty(buf) {
  let nz = 0, nf = 0;
  for (let i = 0; i < buf.length; i += 2) {
    const w = (buf[i] << 8) | buf[i+1];
    if (w !== 0 && w !== 0xFFFF) nz++;
    if (w === 0xFFFF) nf++;
  }
  return { nonZero: nz, allF: nf, total: buf.length / 2 };
}

console.log(`  $FF4000 buffer: ${JSON.stringify(nonEmpty(nt4000))}`);
console.log(`  $FF5000 buffer: ${JSON.stringify(nonEmpty(nt5000))}`);

// Look for sequences of consecutive tile indices in $FF4000 (nametable entries)
// that could represent text
console.log('\n=== $FF4000 nametable sample (first 128 words) ===');
for (let row = 0; row < 4; row++) {
  const vals = [];
  for (let col = 0; col < 32; col++) {
    const off = (row * 64 + col * 2);
    const w = (ram[0x4000 + off] << 8) | ram[0x4000 + off + 1];
    const tile = w & 0x7FF;
    const pal = (w >> 13) & 3;
    vals.push(tile.toString(16).padStart(3,'0'));
  }
  console.log(`  row ${row}: ${vals.join(' ')}`);
}
