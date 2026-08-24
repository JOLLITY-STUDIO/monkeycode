// 临时：在 ROM 中定位 bank00 $9B28 / $9F89 / $9E36 / $9B91 的字节模式
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
function hex(b) { return b.toString(16).padStart(2, '0').toUpperCase(); }
// $9B28: 2C 29 06 70 09 A9 01 20 A8 9F 68 4C 28 9B
const pat1 = Buffer.from([0x2c, 0x29, 0x06, 0x70, 0x09, 0xa9, 0x01, 0x20, 0xa8, 0x9f, 0x68, 0x4c, 0x28, 0x9b]);
// $9F89: B5 01 F0 0A B5 00 D0 06 A9 01 95 00 60
const pat2 = Buffer.from([0xb5, 0x01, 0xf0, 0x0a, 0xb5, 0x00, 0xd0, 0x06, 0xa9, 0x01, 0x95, 0x00, 0x60]);
// $9E36: A2 08 06 ED 26 EA E5 EC 90 02 E6 ED CA D0 F5 60
const pat3 = Buffer.from([0xa2, 0x08, 0x06, 0xed, 0x26, 0xea, 0xe5, 0xec, 0x90, 0x02, 0xe6, 0xed, 0xca, 0xd0, 0xf5, 0x60]);
// $9B91: A9 00 8D 68 05 8D 88 05 8D A8 05 8D C8 05 60
const pat4 = Buffer.from([0xa9, 0x00, 0x8d, 0x68, 0x05, 0x8d, 0x88, 0x05, 0x8d, 0xa8, 0x05, 0x8d, 0xc8, 0x05, 0x60]);
// $9B5E: A9 00 9D E8 05 86 28 06 A5 29 06 29 BF 85 29 06 60
const pat5 = Buffer.from([0xa9, 0x00, 0x9d, 0xe8, 0x05, 0x86, 0x28, 0x06, 0xa5, 0x29, 0x06, 0x29, 0xbf, 0x85, 0x29, 0x06, 0x60]);
for (const [name, pat, cpuAddr] of [[`9B28(${pat1.length}B)`, pat1, 0x9b28], [`9F89(${pat2.length}B)`, pat2, 0x9f89], [`9E36(${pat3.length}B)`, pat3, 0x9e36], [`9B91(${pat4.length}B)`, pat4, 0x9b91], [`9B5E(${pat5.length}B)`, pat5, 0x9b5e]]) {
  const idx = rom.indexOf(pat);
  if (idx >= 0) {
    // bank 起始 = idx & ~0x1fff（每 8KB 一个 bank）
    const bankOff = idx & ~0x1fff;
    const rel = idx - bankOff;
    console.log(`${name}: found at ROM offset 0x${idx.toString(16)} → bank0x${(bankOff >> 13).toString(16)} 内偏移 0x${rel.toString(16).toUpperCase()} (CPU 0x${(0x8000 + rel).toString(16).toUpperCase()})`);
  } else {
    console.log(`${name}: NOT found`);
  }
}
