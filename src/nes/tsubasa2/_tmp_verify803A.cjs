const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 0x10 + 28 * 0x2000;
const hex = (n) => n.toString(16).toUpperCase().padStart(2, '0');
// $8121 - $8190
const start = 0x121, len = 0x70;
for (let i = start; i < start + len; i++) {
  if ((i - start) % 16 === 0) process.stdout.write('\n$' + (0x8000 + i).toString(16).toUpperCase().padStart(4, '0') + ': ');
  process.stdout.write(hex(rom[BASE + i]) + ' ');
}
console.log('');
