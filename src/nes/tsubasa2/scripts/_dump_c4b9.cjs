// 临时：dump bank30 $C4B9（MMC3 bank 写 helper）确定窗口语义
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b30 = (a) => rom[0x10 + 30 * 0x2000 + ((a - 0x8000) & 0x1fff)];
const hex = (b) => b.toString(16).padStart(2, '0').toUpperCase();
let s = '';
for (let i = 0xc4b9; i <= 0xc500; i++) s += hex(b30(i)) + ' ';
console.log('b30_C4B9-$C500: ' + s);
