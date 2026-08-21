const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes'));
// bank28 CPU $8000 窗口: physical = 0x10 + 28*0x2000 + (addr - 0x8000)
const ph28 = (addr) => 0x10 + 28 * 0x2000 + (addr - 0x8000);
// 描述符格式: [0]控制 [8]X [0xC]Y [0x12]模板 [0x13]/[0x14]offsX/offsY, 21 字节步长
console.log('=== bank28 $B8AE descriptors (stride 21) ===');
for (let i = 0; i < 12; i++) {
  const base = 0xb8ae + i * 21;
  const b = [];
  for (let j = 0; j < 21; j++) b.push(rom[ph28(base + j)].toString(16).padStart(2, '0'));
  console.log('[' + i + '] @$' + base.toString(16) + ': ' + b.join(' '));
}
// 同时在 bank22 全数据里找符合描述符形态的区 (控制字节 bit5-4, 模板索引 < 47)
console.log('\n=== bank22 扫描描述符候选 (X=$80 基准,Y=0,模板<47) ===');
const ph22 = (addr) => 0x10 + 22 * 0x2000 + (addr - 0x8000);
let found = 0;
for (let addr = 0x8200; addr < 0x8f00 && found < 8; addr++) {
  const ctl = rom[ph22(addr)];
  const xbase = rom[ph22(addr + 8)];
  const ybase = rom[ph22(addr + 0x0c)];
  const tpl = rom[ph22(addr + 0x12)];
  if (tpl < 47 && Math.abs(xbase - 0x80) < 0x60 && ybase < 0xf0) {
    const b = [];
    for (let j = 0; j < 21; j++) b.push(rom[ph22(addr + j)].toString(16).padStart(2, '0'));
    console.log('cand @$' + addr.toString(16) + ' ctl=' + ctl.toString(16) + ': ' + b.join(' '));
    found++;
  }
}
