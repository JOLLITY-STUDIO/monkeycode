const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
// bank00 real address $8000-$9FFF → file offset 0x10 + (addr - 0x8000)
function b0(addr) {
  return rom[0x10 + (addr - 0x8000)];
}
const out = [];
for (let i = 0; i < 256; i++) out.push(b0(0x8a14 + i).toString(16).padStart(2, '0'));
console.log('8A14=' + JSON.stringify(out));
