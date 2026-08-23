const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 0x4010;
function bytes(addr, len) {
  const out = [];
  for (let i = 0; i < len; i++) out.push(rom[BASE + ((addr + i) & 0x1fff)].toString(16).padStart(2, '0'));
  return out;
}
console.log('A330=' + JSON.stringify(bytes(0xa330, 0x160)));
