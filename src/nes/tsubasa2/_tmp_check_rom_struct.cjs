// 验证 ROM 结构：16KB*16 PRG or 8KB*32？关键字节 $818C
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
console.log('fileSize:', rom.length);
console.log('header:', Array.from(rom.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('PRG size (16KB units):', rom[4], '->', rom[4] * 16, 'KB =', rom[4] * 0x4000, 'bytes');
console.log('CHR size (8KB units):', rom[5], '->', rom[5] * 8, 'KB');
console.log('mapper:', (rom[6] >> 4) | (rom[7] & 0xf0));
console.log('PRG+CHR =', rom[4] * 0x4000 + rom[5] * 0x2000, 'should equal fileSize-16 =', rom.length - 16);

// 16KB bank 6 = PRG offset 6*0x4000，窗口 $818C → 内部偏移 0x18C
const off16 = 16 + 6 * 0x4000;
console.log('--- 16KB bank 6 @offset 0x18000, window $818C ---');
console.log(Array.from(rom.slice(off16 + 0x180, off16 + 0x190)).map(b => '$' + b.toString(16).padStart(2, '0').toUpperCase()).join(' '));

// 8KB block 12 = PRG offset 12*0x2000（= 同一物理位置）
const off8 = 16 + 12 * 0x2000;
console.log('--- 8KB block 12 @offset 0x18000, window $818C ---');
console.log(Array.from(rom.slice(off8 + 0x180, off8 + 0x190)).map(b => '$' + b.toString(16).padStart(2, '0').toUpperCase()).join(' '));
