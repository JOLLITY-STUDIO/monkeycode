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
dump30(0xC500, 0x40, 'b30 $C500-$C53F JMP table');
dump30(0xCB80, 0x20, 'b30 $CB80-$CB9F pre-dispatcher');
dump30(0xCD77, 0x20, 'b30 $CD77 subC50C');
fs.writeFileSync('_tmp_tables_out.txt', out);
console.log('done');
