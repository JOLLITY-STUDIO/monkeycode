/* 临时脚本：转储 bank2 $A677 全 256B（用完删除） */
const fs = require('fs');
const rom = fs.readFileSync('src/asm/dist/tsubasa2.nes');
function dump(label, off, len) {
  const bytes = [];
  for (let i = 0; i < len; i++) bytes.push(rom[off + i]);
  console.log('== ' + label + ' (' + len + 'B) ==');
  for (let r = 0; r < bytes.length; r += 16) {
    const hex = bytes.slice(r, r + 16).map((b) => b.toString(16).padStart(2, '0')).join(' ');
    console.log('  ' + hex);
  }
  return bytes;
}
const b = dump('bank2 $A677-$A776', 0x4010 + 0x677, 0x100);
// 输出 JS 数组
console.log('const A677 = [' + b.join(',') + '];');
console.log('last4:', b.slice(0xfc, 0x100).map((x) => x.toString(16)).join(' '));
console.log('done');
