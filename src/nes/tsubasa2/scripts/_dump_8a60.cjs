// 临时：dump $8A60-$8AB0 完整算法
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const off = (a) => 0x10 + (a - 0x8000);
const hex = (b) => b.toString(16).padStart(2, '0').toUpperCase();
let s = '';
for (let i = 0x8a60; i <= 0x8ab0; i++) s += hex(rom[off(i)]) + ' ';
console.log('b00_8A60-$8AB0: ' + s);
