// G37b: 精确 hexdump bank02 $8484-$8560 + 各入口字节, 核对分发表是否指向代码起始
const fs = require('fs');
const path = require('path');
const rom = fs.readFileSync(path.join(__dirname, 'docs/roms/Captain Tsubasa II - Super Striker (Japan).nes'));
const prgStart = 0x10;
const bank = 2;
const b = rom.subarray(prgStart + bank * 0x2000, prgStart + (bank + 1) * 0x2000);
const h8 = v => '$' + v.toString(16).toUpperCase().padStart(2, '0');

// 分发表原始字节 (asm $8491 起, 48 字节)
console.log('=== 分发表 $8491 起 48 字节 (每项 2 字节) ===');
for (let i = 0; i < 24; i++) {
  const lo = b[0x91 + i * 2];
  const hi = b[0x92 + i * 2];
  const t = lo | (hi << 8);
  console.log('idx ' + String(i).padStart(2) + '  [$' + (0x8491 + i * 2).toString(16).toUpperCase() + '] ' +
    h8(lo) + ' ' + h8(hi) + ' → ' + '$' + t.toString(16).toUpperCase() + ' (asm ' + '$' + (t - 0x2000).toString(16).toUpperCase() + ')');
}

// 反汇编 $84C0 起的真实代码 (用 6502 指令表简单解码)
console.log('\n=== $84C0 起 32 字节原始 ===');
const bytes = [];
for (let i = 0; i < 32; i++) bytes.push(h8(b[0xC0 + i]));
console.log(bytes.join(' '));

// 检查 $8559 (idx1 目标) 与 $855A 的差异
console.log('\n=== idx1 目标 $A559 (asm $8559) 前 4 字节 ===');
for (let i = 0x58; i < 0x62; i++) console.log('asm $85' + i.toString(16).toUpperCase() + ': ' + h8(b[i]));

// idx2 目标 $A57B (asm $857B) 前 4 字节
console.log('\n=== idx2 目标 $A57B (asm $857B) 前 4 字节 ===');
for (let i = 0x78; i < 0x82; i++) console.log('asm $85' + i.toString(16).toUpperCase() + ': ' + h8(b[i]));
