// 从 ROM 读取 bank30 实际字节 + 微型 6502 模拟 dispatcher
const fs = require('fs');

// ROM 头部: 16 字节. PRG size 位于 header[4] (16KB 单位)
const rom = fs.readFileSync('roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prgSize = rom[4] * 16384;
console.log('PRG size:', prgSize, 'ROM total:', rom.length);
// bank30 在 PRG 最后一个 8KB? 这里验证 $CB99 是否在 bank30.
// 按照已有脚本: bank offset = 16 + bank*0x2000
for (const bank of [30, 11]) {
  const off = 16 + bank * 0x2000;
  console.log('\n=== bank' + bank + ' offset 0x' + off.toString(16) + ' ===');
  if (bank === 30) {
    // $CB99-$CBAD
    const addr = 0xcb99;
    const bytes = [];
    for (let i = 0; i < 0x15; i++) bytes.push(rom[off + (addr - 0x8000) + i]);
    console.log('$CB99-$CBAD:', bytes.map(b => b.toString(16).padStart(2, '0')).join(' '));
  }
}
