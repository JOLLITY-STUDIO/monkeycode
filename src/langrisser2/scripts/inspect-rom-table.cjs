const fs = require('fs');
const rom = fs.readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');
const rd = (a) => rom[a] & 0xFF;
const rl = (a) => (rd(a) << 24) | (rd(a + 1) << 16) | (rd(a + 2) << 8) | rd(a + 3);

console.log('=== Resource pointer table at 0x0B0000 ===');
for (let i = 0; i < 64; i++) {
  const ptr = rl(0x0B0000 + i * 4);
  console.log(`[${i.toString().padStart(2, '0')}]=${(0x0B0000 + i * 4).toString(16).padStart(6, '0')}: ${ptr.toString(16).padStart(6, '0')}`);
}

console.log('\n=== ROM at 0x0A4582 (palette candidate) ===');
for (let i = -64; i < 128; i += 16) {
  const bytes = Array.from(rom.slice(0x0A4582 + i, 0x0A4582 + i + 16)).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log(`${(0x0A4582 + i).toString(16).padStart(6, '0')}: ${bytes}`);
}

// Check resource #0 area
const res0Ptr = rl(0x0B0000);
console.log('\n=== Resource #0 at ' + res0Ptr.toString(16).padStart(6, '0') + ' ===');
for (let i = 0; i < 64; i += 16) {
  const bytes = Array.from(rom.slice(res0Ptr + i, res0Ptr + i + 16)).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log(`${(res0Ptr + i).toString(16).padStart(6, '0')}: ${bytes}`);
}
