// 临时: 验证 $C509/$CB99 采样模型 + $E783/$F720 目标区域
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgOff = 0x10;
function dump(bankIdx, base, start, len) {
  const out = [];
  for (let i = 0; i < len; i++) {
    const off = prgOff + bankIdx * 0x2000 + (start + i - base);
    out.push((rom[off] ?? 0).toString(16).padStart(2, '0'));
  }
  console.log(`bank${bankIdx} $${start.toString(16)}: ${out.join(' ')}`);
}
dump(30, 0xC000, 0xC505, 16);   // $C509 JMP $CB99?
dump(30, 0xC000, 0xCB95, 40);   // $CB99 分派器字节
dump(30, 0xC000, 0xCD70, 48);   // $CD77/$CD89 附近
dump(31, 0xE000, 0xE780, 16);   // $E783 目标
dump(31, 0xE000, 0xF720, 16);   // $F720 目标
// $81AA 表 (bank11) 与 $81C6 表 (bank11)
dump(11, 0x8000, 0x81A5, 40);
