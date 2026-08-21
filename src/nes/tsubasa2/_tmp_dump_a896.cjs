const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const off = 0x4010;
const A = (addr) => off + (addr - 0xA000);
// dump $A880-$A9C0 区域
for (let a = 0xA880; a < 0xA9C0; a += 16) {
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(rom[A(a) + i].toString(16).padStart(2, '0'));
  console.log(a.toString(16) + ': ' + bytes.join(' '));
}
