const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);
const b12 = prg.slice(0x18000, 0x18000 + 0x2000);
let count = 0;
for (let i = 0xBA; i < 0x2000 - 2; i++) {
  if (b12[i] === 0x8C && b12[i+1] === 0x00 && b12[i+2] === 0x80) {
    console.log('STA 8000 at', i.toString(16));
    count++;
  }
  if (b12[i] === 0x8C && b12[i+1] === 0x01 && b12[i+2] === 0x80) {
    console.log('STA 8001 at', i.toString(16));
    count++;
  }
}
console.log('bankswitch writes in $80BA+:', count);

// 也检查 bank13（$A000-$BFFF）是否有 bankswitch 写
const b13 = prg.slice(0x1A000, 0x1A000 + 0x2000);
let count13 = 0;
for (let i = 0; i < 0x2000 - 2; i++) {
  if (b13[i] === 0x8C && b13[i+1] === 0x00 && b13[i+2] === 0x80) count13++;
  if (b13[i] === 0x8C && b13[i+1] === 0x01 && b13[i+2] === 0x80) count13++;
}
console.log('bankswitch writes in bank13:', count13);
