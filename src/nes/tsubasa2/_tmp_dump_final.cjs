// final extra dumps
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
let out = '';
function dump(romBase, addr, len, label) {
  const arr = [];
  for (let i = 0; i < len; i++) arr.push(rom[romBase + (addr - 0x8000) + i].toString(16).padStart(2, '0').toUpperCase());
  out += `${label} [$${addr.toString(16).toUpperCase()}] ${len}B:\n`;
  for (let i = 0; i < arr.length; i += 16) out += '  ' + arr.slice(i, i + 16).join(' ') + '\n';
}
function dump30(addr, len, label) { dump(0x10 + 30 * 0x2000, addr - 0x4000, len, label); }
// bank28
dump(0x10 + 28 * 0x2000, 0x8C06, 70, 'b28 $8C06 full');
dump(0x10 + 28 * 0x2000, 0x8D82, 40, 'b28 $8D82-$8DA9');
dump(0x10 + 28 * 0x2000, 0x8D58, 60, 'b28 $8D58 full');
// bank30
dump30(0xCB0F, 60, 'b30 $CB0F');
// bank31
dump(0x10 + 31 * 0x2000, 0xE267 - 0x6000, 50, 'b31 $E267');
// bank0 $8024
dump(0x10 + 0 * 0x2000, 0x8024, 40, 'b00 $8024');
fs.writeFileSync('_tmp_tables_out.txt', out);
console.log('done');
