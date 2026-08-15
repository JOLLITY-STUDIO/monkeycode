// 在 ROM 中定位 bank30 ($C000 处 AA 00 29 CB) 和 bank11 ($8000 处) 的实际偏移
const fs = require('fs');
const rom = fs.readFileSync('roms/Captain Tsubasa II - Super Striker (Japan).nes');

// 搜索 AA 00 29 CB 1B 3C FE FF (bank30 $C000)
const pat30 = Buffer.from([0xAA, 0x00, 0x29, 0xCB, 0x1B, 0x3C, 0xFE, 0xFF]);
let idx = rom.indexOf(pat30);
console.log('bank30 $C000 pattern at offset:', idx === -1 ? 'NOT FOUND' : '0x' + idx.toString(16));

// bank11 的 $8000 处: 根据 _b11_code_full.txt, $8002 = 80 (UNDEFINED), $8003 = 4C 83 80
// 搜索 4C 83 80 4C A1 84 4C 4C 81
const pat11 = Buffer.from([0x4C, 0x83, 0x80, 0x4C, 0xA1, 0x84, 0x4C, 0x4C, 0x81]);
idx = rom.indexOf(pat11);
console.log('bank11 $8003 pattern at offset:', idx === -1 ? 'NOT FOUND' : '0x' + idx.toString(16));

// 假设的线性 bank 顺序下, 各 bank 起始 (16 + n*0x2000)
console.log('\n假设偏移 (16+n*0x2000):');
for (let n = 0; n < 32; n++) {
  console.log('  bank' + n + ': 0x' + (16 + n * 0x2000).toString(16));
}
