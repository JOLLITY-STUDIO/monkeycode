// bank11 $8B42 attr 表 (readB11Attr) + fn_86D3 逻辑
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b = Array.from(rom.slice(0x10 + 11 * 0x2000, 0x10 + 12 * 0x2000));
console.log('$8B42 (0xB42):', b.slice(0xB42, 0xB42 + 34).join(','));
// 查 bank11-data readB11Attr 实现
const c = fs.readFileSync('src/game/prg/data/bank11-data.ts', 'utf8');
const m = c.match(/readB11Attr[\s\S]*?\n\}/);
console.log('\n--- readB11Attr ---\n' + (m ? m[0] : 'NOT FOUND'));
