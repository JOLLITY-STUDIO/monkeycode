// dump bank19 关键区域判断代码/数据
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b = Array.from(rom.slice(0x10 + 19 * 0x2000, 0x10 + 20 * 0x2000));
function dump(name, s, len) {
  console.log('== ' + name + ' $' + s.toString(16) + ' ==');
  let line = '';
  for (let i = 0; i < len; i++) {
    line += b[s + i].toString(16).toUpperCase().padStart(2, '0') + ' ';
    if ((i + 1) % 16 === 0) { console.log(line); line = ''; }
  }
  if (line) console.log(line);
}
dump('bank19 $8000 (0x0000)', 0x0000, 64);
dump('bank19 $8400 (0x0400)', 0x0400, 64);
dump('bank19 $8800 (0x0800)', 0x0800, 64);
dump('bank19 $9000 (0x1000)', 0x1000, 64);
dump('bank18 $8000 (0x0000)', 0x0000, 64);
