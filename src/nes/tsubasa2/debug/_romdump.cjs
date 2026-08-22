const fs = require('fs');
const path = require('path');
const romPath = path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(romPath);
const prgStart = 16; // NES header 16 bytes
// bank0 = ROM offset 0x0000 + prgStart
// 我们想看 CPU 地址 $9F02-$9F0A, 即 bank0 偏移 $1F02-$1F0A
const bank0Off = prgStart + 0x1F02;
console.log('ROM file size:', buf.length);
console.log('=== bank0 ROM 偏移 $1F00-$1F30 (CPU $9F00-$9F30, 若 $8000 窗口=bank0) ===');
const hex = [];
for (let i = 0; i < 0x30; i++) hex.push(buf[bank0Off + i].toString(16).padStart(2, '0'));
for (let r = 0; r < 6; r++) {
  console.log('$9F' + (r * 8).toString(16).padStart(2, '0') + ': ' + hex.slice(r * 8, r * 8 + 8).join(' '));
}

// 也看 bank2 (R7=2) 的 $A000 区对应 CPU $A000 区 = ROM offset 0x4000
console.log('\n=== bank2 ROM 偏移 $2000-$2010 (CPU $A000-$A010, 若 $A000 窗口=bank2) ===');
const bank2Off = prgStart + 0x4000 + 0x2000;
for (let i = 0; i < 0x10; i++) hex[i] = buf[bank2Off + i].toString(16).padStart(2, '0');
console.log('$A0' + '00: ' + hex.slice(0, 8).join(' '));
console.log('$A0' + '08: ' + hex.slice(8, 16).join(' '));
