// 临时：dump bank00 $8A14 数字 tile 表 + $9B28 前序
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function offB00(addr) { return 0x10 + (addr - 0x8000); }
function hex(b) { return b.toString(16).padStart(2, '0').toUpperCase(); }
const range = (name, off, a, b) => {
  const arr = [];
  for (let i = a; i <= b; i++) arr.push(hex(rom[off(i)]));
  console.log(`${name} $${a.toString(16).toUpperCase()}-$${b.toString(16).toUpperCase()}: ${arr.join(' ')}`);
};
range('b00_8A14', offB00, 0x8a14, 0x8a74); // 数字 tile 表
