// 修正版 bank02 dump（8KB bank #2 @ offset 0x4010），对比 asm code_main.s 开头
const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const base = 16 + 2 * 0x2000; // bank02 (8KB) @ 0x4010
console.log('=== bank02 @ 0x4010, $8000-$82FF ===');
for (let addr = 0x8000; addr <= 0x82FF; addr += 16) {
  const off = base + (addr - 0x8000);
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(rom[off + i].toString(16).padStart(2, '0'));
  console.log('$' + addr.toString(16).toUpperCase() + ': ' + bytes.join(' '));
}
console.log('=== Opening 区域 $A4C0 (bank02 offset 0x24C0 => addr 0x84C0) ===');
const obase = base + 0x4c0;
for (let i = 0; i < 64; i++) {
  const b = rom[obase + i];
  process.stdout.write(b.toString(16).padStart(2, '0') + ' ');
  if (i % 16 === 15) console.log();
}
