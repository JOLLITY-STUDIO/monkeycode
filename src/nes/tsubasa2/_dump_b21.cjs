// dump bank21 记录区边界
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function bank(n, lo, len) {
  const off = 0x10 + n * 0x2000 + lo;
  return rom.slice(off, off + len);
}
function hexArr(buf, from, to) {
  const out = [];
  for (let i = from; i < to && i < buf.length; i++) out.push(buf[i].toString(16).toUpperCase().padStart(2, '0'));
  return out.join(' ');
}
console.log('=== bank21 $A47A-$AC50 (A1B4 记录末尾区) ===');
console.log(hexArr(bank(21, 0x47A, 0x4D0), 0, 0x4D0));
console.log('\n=== bank21 $AF1B-$B010 (AC47 记录末尾区) ===');
console.log(hexArr(bank(21, 0xF1B, 0xF0), 0, 0xF0));
