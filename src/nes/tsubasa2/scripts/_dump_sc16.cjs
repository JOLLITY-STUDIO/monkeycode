// 临时：dump bank02 $A677-$A77A（场景16 复制源）与 $AC6D/$AC71 nibble 表、$AA97 场景15 表
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 0x4010;
function cpu(addr) { return BASE + (addr & 0x1fff); }
function hex(b) { return b.toString(16).padStart(2, '0').toUpperCase(); }
const out = [];
const range = (name, a, b) => {
  const arr = [];
  for (let i = a; i <= b; i++) arr.push(hex(rom[cpu(i)]));
  out.push(`${name} $${a.toString(16).toUpperCase()}-$${b.toString(16).toUpperCase()}: ${arr.join(' ')}`);
};
range('A677', 0xa677, 0xa77a); // 复制源（含 A773 尾部 8 字节前 4）
range('A773', 0xa773, 0xa77a); // 尾部数据 8 字节
range('AC6D', 0xac6d, 0xac72); // nibble→tile 子程序
range('AC73', 0xac73, 0xaca0); // tile 数据
range('AA97', 0xaa97, 0xaaf6); // 场景15 表 24 项
range('AADF', 0xaadf, 0xaae0); // 场景23 nibble 高4 表
range('AB1F', 0xab1f, 0xab22); // 场景23 nibble 低4 表
console.log(out.join('\n'));
