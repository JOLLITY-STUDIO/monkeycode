// dump 场景 3 配置/tile/参数表 数据区
const fs = require('fs');
const rom = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
// CHR 配置 0x17 @CPU $A373 → ROM 0xE010+(0xA373-0xA000)=0xE383
const start = 0xE383;
const end = 0xE3F0;
const lines = [];
for (let off = start; off < end; off += 16) {
  const addr = off - 0xE010 + 0xA000;
  const bytes = [];
  for (let i = 0; i < 16 && off + i < end; i++) bytes.push(rom[off + i].toString(16).padStart(2, '0'));
  lines.push(`CPU $${addr.toString(16)} ROM 0x${off.toString(16)}: ${bytes.join(' ')}`);
}
console.log(lines.join('\n'));
