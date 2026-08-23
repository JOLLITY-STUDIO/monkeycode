const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const prg = rom.slice(16, 16 + 0x40000);
const hex = (off, len) => Array.from(prg.slice(off, off + len)).map(b => b.toString(16).padStart(2, '0')).join(' ');
// 8KB[2] = 0x4000-0x5FFF, 8KB[3] = 0x6000-0x7FFF
console.log('ROM 0x4200 (=CPU $A200 if R7=8KB[2]):', hex(0x4200, 16));
console.log('ROM 0x44C0 (=CPU $A4C0 if R7=8KB[2]):', hex(0x44C0, 16));
console.log('ROM 0x44C1:', hex(0x44C1, 16));
console.log('ROM 0x4491 (跳转表):', hex(0x4491, 32));
console.log('ROM 0x4491+46 (项23):', hex(0x4491 + 46, 4));
// 扫描所有 8KB bank 中 offset 0x4C0 处是否有像代码的字节
for (let b8 = 0; b8 < 32; b8++) {
  const off = b8 * 0x2000;
  const b = prg[off + 0x4C0];
  if (b === 0x20 || b === 0x4C || b === 0xA9 || b === 0xAD || b === 0xA2 || b === 0xA5) {
    console.log('8KB[' + b8 + '] @0x4C0 可能代码开头: 0x' + b.toString(16), hex(off + 0x4C0, 8));
  }
}
// 扫描哪个 8KB bank 的 0x491 处是跳转表
for (let b8 = 0; b8 < 32; b8++) {
  const off = b8 * 0x2000;
  if (prg[off + 0x491] === 0xC0 && prg[off + 0x492] === 0xA4 && prg[off + 0x493] === 0x59) {
    console.log('跳转表 @ 8KB[' + b8 + '] offset 0x491');
  }
}
// 打印 8KB[3] 的 0x200 处（=CPU $A200 if R7=8KB[3]）
console.log('ROM 0x6200 (=CPU $A200 if R7=8KB[3]):', hex(0x6200, 16));
