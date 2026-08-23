const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
console.log('ROM size', rom.length);
console.log('header', rom.slice(0, 16).toString('hex'));
// PRG bank size = 16KB, bank02 = PRG bank 2 at offset 16 + 2*0x4000 = 0x8010
const base = 16 + 2 * 0x4000;
for (let addr = 0x88F0; addr <= 0x8A10; addr++) {
  const off = base + (addr - 0x8000);
  const b = rom[off];
  if (addr === 0x88FE) console.log('--- data_tables.s .byte block likely start ---');
  if (addr === 0x8A06) console.log('--- STY $00ED $8A06 ---');
  console.log('$' + addr.toString(16).toUpperCase() + ': ' + b.toString(16).padStart(2, '0'));
}
