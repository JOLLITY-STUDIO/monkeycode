const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 0x4010;
function bytes(addr, len) {
  const out = [];
  for (let i = 0; i < len; i++) out.push(rom[BASE + ((addr + i) & 0x1fff)].toString(16).padStart(2, '0'));
  return out;
}
// scene15 NT table $AA97 (real) — dump 96 bytes
console.log('AA97=' + JSON.stringify(bytes(0xaa97, 96)));
// $AC6D subroutine (real) — dump 64 bytes
console.log('AC6D=' + JSON.stringify(bytes(0xac6d, 64)));
// $A773-$A77A data tail
console.log('A773=' + JSON.stringify(bytes(0xa773, 8)));
// $A677-$A67A first 4 bytes for $0460 copy
console.log('A677=' + JSON.stringify(bytes(0xa677, 4)));
