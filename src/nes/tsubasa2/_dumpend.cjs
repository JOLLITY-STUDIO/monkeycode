// bank19 stream 尾部精确字节 [0x1870, 0x18B0)
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b = Array.from(rom.slice(0x10 + 19 * 0x2000, 0x10 + 20 * 0x2000));
let line = '';
for (let i = 0x1870; i < 0x18B0; i++) {
  line += b[i].toString(16).toUpperCase().padStart(2, '0') + ' ';
  if ((i - 0x1870 + 1) % 16 === 0) { console.log('$' + (i - 15).toString(16) + ': ' + line); line = ''; }
}
