const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16); // PRG data (file offset 16+)
// bank2 runtime $A000-$BFFF = PRG bank 2 → PRG index 0x4000..0x5FFF
// runtime = prgIdx - 0x4000 + 0xA000 → prgIdx = runtime - 0xA000 + 0x4000
function at(runtimeAddr, len) {
  const prgIdx = runtimeAddr - 0xa000 + 0x4000;
  const off = prgIdx;
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push(prg[off + i]);
  return bytes;
}
function hex(b) { return b.map((x) => '$' + x.toString(16).padStart(2, '0').toUpperCase()).join(','); }
console.log('A677 sprite table (256 bytes):');
console.log(hex(at(0xa677, 256)));
console.log('A67B (4 bytes):');
console.log(hex(at(0xa67b, 4)));
console.log('AA97 NT stream (256 bytes):');
console.log(hex(at(0xaa97, 256)));
console.log('AC6D hex hi digit tiles (16 bytes):');
console.log(hex(at(0xac6d, 16)));
console.log('AC71 hex lo digit tiles (16 bytes):');
console.log(hex(at(0xac71, 16)));
