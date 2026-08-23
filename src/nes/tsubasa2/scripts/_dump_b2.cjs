const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 0x4010;
function bytes(addr, len) {
  const out = [];
  for (let i = 0; i < len; i++) out.push(rom[BASE + ((addr + i) & 0x1fff)].toString(16).padStart(2, '0'));
  return out;
}
// $A677-$A776
console.log('T677=' + JSON.stringify(bytes(0xa677, 256)));
// $A67B-$A77A
console.log('T67B=' + JSON.stringify(bytes(0xa67b, 256)));
