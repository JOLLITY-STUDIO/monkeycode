// 临时：修正 dump + 全 bank 扫描 $BDA4 模式数据
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const bankBase = (b) => 0x10 + b * 0x2000;
const hex = (b) => b.toString(16).padStart(2, '0').toUpperCase();
const b00 = (a) => rom[0x10 + (a - 0x8000)];
let s = '';
for (let i = 0x9147; i <= 0x91d0; i++) s += hex(b00(i)) + ' ';
console.log('b00_9147-$91D0: ' + s);
// 全 bank 扫描 $A000 window $BDA4
console.log('--- scan $BDA4 non-FF ---');
for (let b = 0; b < 32; b++) {
  const v = rom[bankBase(b) + (0xbda4 & 0x1fff)];
  if (v !== 0xff) {
    const vals = [];
    for (let i = 0xbda4; i <= 0xbdbc; i++) vals.push(hex(rom[bankBase(b) + (i & 0x1fff)]));
    console.log('bank' + b + ' $BDA4-$BDBC: ' + vals.join(' '));
  }
}
