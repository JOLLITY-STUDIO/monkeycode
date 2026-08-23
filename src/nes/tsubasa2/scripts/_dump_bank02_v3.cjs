// 验证 bank02 物理 $82FF-$8A20（code_sub/code_data/data_tables 区域）
const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.join(__dirname, '..', 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
const base = 16 + 2 * 0x2000; // bank02 @ 0x4010
for (let addr = 0x82f0; addr <= 0x8a20; addr += 16) {
  const off = base + (addr - 0x8000);
  const bytes = [];
  for (let i = 0; i < 16; i++) bytes.push(rom[off + i].toString(16).padStart(2, '0'));
  console.log('$' + addr.toString(16).toUpperCase() + ': ' + bytes.join(' '));
}
