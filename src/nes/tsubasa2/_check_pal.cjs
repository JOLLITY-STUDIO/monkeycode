const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgStart = 16;
const bank31Start = prgStart + 31 * 8192;
const fbcc = bank31Start + (0x1BCC);
// find end of palette data (first run of >= 16 consecutive 0xFF)
let end = fbcc;
for (let i = fbcc; i < bank31Start + 8192; i++) {
  let allFF = true;
  for (let k = 0; k < 16; k++) if (rom[i+k] !== 0xFF) { allFF = false; break; }
  if (allFF) { end = i; break; }
}
console.log('FBCC start index', 0x1BCC, 'palette data length', end - fbcc);
// Total entries needed to cover up to entry 0x16 (22) => 23 entries * 12 = 276 bytes minimum
console.log('needed for entry 0x16:', 22*12+12);
