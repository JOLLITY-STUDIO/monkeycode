// 临时：dump bank02 场景23 原始字节 + $88CA bank00 尾部 + $9085 续 + $9E7C 尾部
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function offB00(addr) { return 0x10 + (addr - 0x8000); } // bank00 CPU $8000-$9FFF
function offB02(addr) { return 0x4010 + (addr - 0xa000); } // bank02 CPU $A000-$BFFF
function hex(b) { return b.toString(16).padStart(2, '0').toUpperCase(); }
const range = (name, off, a, b) => {
  const arr = [];
  for (let i = a; i <= b; i++) arr.push(hex(rom[off(i)]));
  console.log(`${name} $${a.toString(16).toUpperCase()}-$${b.toString(16).toUpperCase()}: ${arr.join(' ')}`);
};
range('b02_scene23', offB02, 0xa7fb, 0xa82e);
range('b00_9E95', offB00, 0x9e95, 0x9ec0); // $9E7C 尾部/后续
range('b00_88CA', offB00, 0x88ca, 0x8900); // 文本 tile 写 + $88FB
range('b00_9131', offB00, 0x9131, 0x9200); // $9085 续（属性表装载）
range('b00_978B', offB00, 0x978b, 0x97ac); // $978B 32 字节模板
