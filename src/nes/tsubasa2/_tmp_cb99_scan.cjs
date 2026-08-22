// 临时: 绝对精确 dump bank30 $CB93-$CBAE, 每字节带 ROM 偏移, 人工核对指令边界
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgOff = 0x10;
const bankIdx = 30;
const base = 0xC000;
for (let addr = 0xCB93; addr <= 0xCBAE; addr++) {
  const off = prgOff + bankIdx * 0x2000 + (addr - base);
  console.log(`$${addr.toString(16)} (rom+0x${off.toString(16)}): ${rom[off].toString(16).padStart(2, '0')}`);
}
// 也验证 $C509 JMP
console.log('--- $C509-$C50B:');
for (let addr = 0xC509; addr <= 0xC50B; addr++) {
  const off = prgOff + 30 * 0x2000 + (addr - 0xC000);
  console.log(`$${addr.toString(16)}: ${rom[off].toString(16).padStart(2, '0')}`);
}
