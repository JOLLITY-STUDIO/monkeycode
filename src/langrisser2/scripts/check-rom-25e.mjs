import fs from 'fs';
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
// Show ROM context around $00025E
let s = '';
for (let i = 0x240; i < 0x2A0; i++) {
  s += (rom[i] >= 0x20 && rom[i] < 0x7f) ? String.fromCharCode(rom[i]) : '.';
}
console.log('ROM $000240-$00029F:');
for (let off = 0x240; off < 0x2A0; off += 32) {
  console.log(`$${off.toString(16).padStart(6, '0')}: ${s.substring(off - 0x240, off - 0x240 + 32)}`);
}

// Also show hex dump of same area  
console.log('\nHex:');
for (let off = 0x240; off < 0x2A0; off += 16) {
  const hex = Array.from(rom.subarray(off, off + 16))
    .map(b => b.toString(16).padStart(2, '0'))
    .join(' ');
  console.log(`$${off.toString(16).padStart(6, '0')}: ${hex}`);
}

// Now find in ASM what references $00025E
