const fs = require('fs');
const prg = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes').slice(16);
const b12 = prg.slice(0x18000, 0x18000 + 0x2000);
console.log('805E:', Array.from(b12.slice(0x5E, 0x62)).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
console.log('8002:', Array.from(b12.slice(0x02, 0x06)).map(x => '0x' + x.toString(16).padStart(2, '0')).join(' '));
// 805E 应该是 CA 10 xx (DEX; BPL $8002)
// CA = DEX, 10 = BPL, xx = 相对跳转偏移
