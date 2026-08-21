// dump bank21 中间区 (A1B4 表之后到 AC47 表之前 + AC47 表之后到 B6C7)
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
console.log('=== bank21 $A1F4-$A38A (A1B4 表后) ===');
console.log(hexArr(bank(21, 0x1F4, 0x200), 0, 0x200));
console.log('\n=== bank21 $A38A-$A47A (A1B4 记录首段) ===');
console.log(hexArr(bank(21, 0x38A, 0xF0), 0, 0xF0));
console.log('\n=== bank21 $A94A-$AC47 (A1B4 记录尾段) ===');
console.log(hexArr(bank(21, 0x94A, 0x2FD), 0, 0x2FD));
console.log('\n=== bank21 $AC87-$AE25 (AC47 表后) ===');
console.log(hexArr(bank(21, 0xC87, 0x19E), 0, 0x19E));
console.log('\n=== 真实 $B6C7 表 (索引0x16C7) ===');
console.log(hexArr(bank(21, 0x16C7, 0x80), 0, 0x80));
console.log('\n=== 真实 $B767 表 (索引0x1767) ===');
console.log(hexArr(bank(21, 0x1767, 0x80), 0, 0x80));
