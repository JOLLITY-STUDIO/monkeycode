// 临时脚本: dump bank30 $D710-$D7A0 (JSR $D717 预处理) 理解 $CB99 输入语义
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const bank30Off = 0x10 + 30 * 0x2000;
console.log('$D710-$D7A0:');
for (let i = 0x1710; i < 0x17A0; i += 16) {
  const bytes = [];
  for (let j = 0; j < 16; j++) bytes.push(rom[bank30Off + i + j].toString(16).padStart(2, '0'));
  console.log(`  $${(0xC000 + i).toString(16)}: ${bytes.join(' ')}`);
}
// 反汇编 $D717-$D7A0 粗略: 打印每个字节的疑似指令
console.log('\n$D717 起字节逐个:');
for (let i = 0x1717; i < 0x1780; i++) {
  console.log(`  $${(0xC000 + i).toString(16)}: ${rom[bank30Off + i].toString(16).padStart(2, '0')}`);
}
