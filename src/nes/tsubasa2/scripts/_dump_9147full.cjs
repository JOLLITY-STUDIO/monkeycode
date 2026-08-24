// 临时：dump $9147-$94D0 + $974A-$9760 完整回调算法
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b00 = (a) => rom[0x10 + (a - 0x8000)];
const hex = (b) => b.toString(16).padStart(2, '0').toUpperCase();
const range = (name, a, b) => {
  let s = '';
  for (let i = a; i <= b; i++) s += hex(b00(i)) + ' ';
  console.log(name + ' $' + a.toString(16).toUpperCase() + '-$' + b.toString(16).toUpperCase() + ': ' + s);
};
range('b00_9147', 0x9147, 0x94d0);
range('b00_974A', 0x974a, 0x978b);
