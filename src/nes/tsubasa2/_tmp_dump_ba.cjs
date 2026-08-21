const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const B01 = (addr) => 0x10 + 1 * 0x2000 + (addr - 0xA000);
for (let a = 0xBA90; a < 0xBB90; a += 16) {
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(rom[B01(a) + i].toString(16).padStart(2, '0'));
  console.log(a.toString(16) + ': ' + bytes.join(' '));
}
// 解析 64×16bit
console.log('\n解析 STAMINA_TABLE_16BIT @$BA90:');
for (let i = 0; i < 64; i++) {
  const v = rom[B01(0xBA90) + i * 2] | (rom[B01(0xBA90) + i * 2 + 1] << 8);
  console.log('  idx' + i + ' = 0x' + v.toString(16).padStart(4, '0') + ' (' + v + ')');
}
