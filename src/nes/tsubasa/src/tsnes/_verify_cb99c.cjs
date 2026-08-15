// bank30 = $C000-$DFFF, 偏移 = 16+30*0x2000 + (addr-0xC000)
const fs = require('fs');
const rom = fs.readFileSync('roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b30off = 16 + 30 * 0x2000;
const rd = (addr, len) => {
  const off = b30off + (addr - 0xC000);
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push(rom[off + i]);
  return bytes;
};
console.log('$CB99 (20B):', rd(0xCB99, 20).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('$C509 (3B): ', rd(0xC509, 3).map(b => b.toString(16).padStart(2, '0')).join(' '));
// 对比 bank_11.asm 中 $81A7 (JSR $C509)
const b11off = 16 + 11 * 0x2000;
const rd11 = (addr, len) => {
  const off = b11off + (addr - 0x8000);
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push(rom[off + i]);
  return bytes;
};
console.log('bank11 $81A7 (4B):', rd11(0x81A7, 4).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('bank11 $81AA (18B):', rd11(0x81AA, 18).map(b => b.toString(16).padStart(2, '0')).join(' '));
