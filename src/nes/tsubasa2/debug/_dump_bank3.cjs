// 提取 bank3 $A000-$A200 区域（场景流 + 动画流）
const fs = require('fs');
const path = require('path');
const ROM_PATH = path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const rom = fs.readFileSync(ROM_PATH);
const PRG_BASE = 16;
function p8(b, off) { return rom[PRG_BASE + b * 0x2000 + (off & 0x1fff)]; }
function hex(n, w = 2) { return n.toString(16).toUpperCase().padStart(w, '0'); }

console.log('=== bank3 $A000-$A07F ===');
for (let i = 0; i < 0x80; i++) {
  if (i % 16 === 0) process.stdout.write(`\n  $A${hex(i,2).slice(1)}: `);
  process.stdout.write(hex(p8(3, 0xA000 + i)) + ' ');
}
console.log('\n\n=== bank3 $A6A0-$A780 (scene3 附近) ===');
for (let i = 0xa6a0; i <= 0xa780; i++) {
  if ((i - 0xa6a0) % 16 === 0) process.stdout.write(`\n  $${hex(i,4)}: `);
  process.stdout.write(hex(p8(3, i)) + ' ');
}
console.log('\n\n=== scene0 流 $A020: 前 8 字节 (指针区) ===');
for (let i = 0; i < 8; i++) process.stdout.write(hex(p8(3, 0xA020 + i)) + ' ');
console.log('\n=== scene3 流 $A6B4: 前 96 字节 ===');
for (let i = 0; i < 96; i++) {
  if (i % 16 === 0) process.stdout.write(`\n  +${hex(i,2)}: `);
  process.stdout.write(hex(p8(3, 0xA6B4 + i)) + ' ');
}
console.log();
