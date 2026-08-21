const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const off = 0x4010;
const A = (addr) => off + (addr - 0xA000);

// SPRITE_POS_TABLE 真实起点 $A98E (asm data_tables.s 第 14 行), dump $A98E-$AA30
for (let a = 0xA98E; a < 0xAA30; a += 16) {
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(rom[A(a) + i].toString(16).padStart(2, '0'));
  console.log(a.toString(16) + ': ' + bytes.join(' '));
}
