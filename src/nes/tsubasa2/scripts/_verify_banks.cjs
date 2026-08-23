// 比较 bank7/13/14/15 与 bank12 的前 0x120 字节，确认引擎代码副本
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16);
const banks = {};
for (let b = 0; b < 32; b++) banks[b] = prg.slice(b * 0x2000, (b + 1) * 0x2000);
const hex = (arr, off, len) => Array.from(arr.slice(off, off + len)).map(x => x.toString(16).padStart(2, '0')).join(' ');
console.log('bank12 [0x00..0xBF]:', hex(banks[12], 0x00, 0xc0));
console.log('bank7  [0x00..0xBF]:', hex(banks[7], 0x00, 0xc0));
console.log('bank13 [0x00..0xBF]:', hex(banks[13], 0x00, 0xc0));
console.log('bank14 [0x00..0xBF]:', hex(banks[14], 0x00, 0xc0));
console.log('bank15 [0x00..0xBF]:', hex(banks[15], 0x00, 0xc0));
// bank12 在 $A000-$BFFF 是否有同样代码？bank13 的 $2000 区域（$A000 映射）
console.log('\nbank13 [$A000 区域 = offset 0x2000..0x20BF]:', hex(banks[13], 0x2000, 0xc0));
console.log('bank12 [$A000 区域(同文件offset 0x2000)]:', hex(banks[12], 0x2000, 0xc0));
// 检查 bank12 $8725 duration 表前 3 字节 和 bank13 相同位置
console.log('\nbank12 $8725:', hex(banks[12], 0x725, 3));
console.log('bank13 $8725:', hex(banks[13], 0x725, 3));
console.log('bank7  $8725:', hex(banks[7], 0x725, 3));
