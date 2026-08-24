// 临时：dump $AC6D-$ACA8 数字 tile 写 OAM 逻辑
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b02 = (a) => (a < 0xa000 ? rom[0x10 + (a - 0x8000)] : rom[0x4010 + (a - 0xa000)]);
const hex = (b) => b.toString(16).padStart(2, '0').toUpperCase();
let s = '';
for (let i = 0xac6d; i <= 0xacb0; i++) s += hex(b02(i)) + ' ';
console.log('b02_AC6D-$ACB0: ' + s);
