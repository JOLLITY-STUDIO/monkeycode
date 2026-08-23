const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16, 16 + 0x40000);
// CPU $A000-$BFFF 对应 bank16[1] 高半 = ROM offset 0x6000-0x7FFF
const base = 0x6000;
console.log('CPU $A491 = ROM 0x6491:', Array.from(prg.slice(0x6491, 0x6491 + 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('CPU $A4C0 = ROM 0x64C0:', Array.from(prg.slice(0x64C0, 0x64C0 + 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('CPU $A559 = ROM 0x6559:', Array.from(prg.slice(0x6559, 0x6559 + 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
console.log('CPU $A200 = ROM 0x6200:', Array.from(prg.slice(0x6200, 0x6200 + 16)).map(b => b.toString(16).padStart(2, '0')).join(' '));
// 检查 bank16[1] 与 asm/bank02 是否同一内容
const b02 = fs.readFileSync('src/asm/bank02/_full.s', 'utf8');
console.log('bank16[1] 低半 0x0-0x20:', Array.from(prg.slice(0x4000, 0x4020)).map(b => b.toString(16).padStart(2, '0')).join(' '));
