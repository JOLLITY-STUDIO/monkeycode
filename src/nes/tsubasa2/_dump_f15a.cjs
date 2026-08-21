// dump bank31 $F114-$F220 区域 + $F15A 指针表指向的描述符
const fs = require('fs');
const path = require('path');
const romPath = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(romPath);
// bank31 物理偏移 = 0x10 + 31*0x2000, CPU 窗口 $E000-$FFFF, 偏移 = addr - 0xE000
const base = 0x10 + 31 * 0x2000;
function b(addr) { return buf[base + (addr - 0xE000)]; }
function u16(addr) { return b(addr) | (b(addr + 1) << 8); }

console.log('=== $F15A 指针表 ($063D*4 索引, 4B/项: lo,hi,flags,attr) ===');
for (let i = 0; i < 8; i++) {
  const a = 0xF15A + i * 4;
  console.log(`idx${i}: ptr=$${u16(a).toString(16)} flags=$${b(a + 2).toString(16)} attr=$${b(a + 3).toString(16)}`);
}
console.log('\n=== $F114 例程字节 ===');
for (let a = 0xF114; a < 0xF150; a++) {
  process.stdout.write(b(a).toString(16).padStart(2, '0') + ' ');
  if ((a - 0xF114 + 1) % 16 === 0) process.stdout.write('\n');
}
console.log('\n\n=== $F182 帧指针表 (前 12 项) ===');
for (let i = 0; i < 12; i++) {
  const a = 0xF182 + i * 2;
  console.log(`idx${i}: $${u16(a).toString(16)}`);
}
console.log('\n=== 描述符内容 (前几个 ptr) ===');
const ptrs = new Set();
for (let i = 0; i < 8; i++) ptrs.add(u16(0xF15A + i * 4));
for (const p of ptrs) {
  console.log(`desc@$${p.toString(16)}: ` + Array.from({ length: 21 }, (_, j) => b(p + j).toString(16).padStart(2, '0')).join(' '));
}
