// bank31 $FBCC 起数据范围检查
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b = Array.from(rom.slice(0x10 + 31 * 0x2000, 0x10 + 32 * 0x2000));
const base = 0x1BCC;
for (let s = 0; s < 0x200; s += 0x20) {
  const line = b.slice(base + s, base + s + 0x20).map(v => v.toString(16).toUpperCase().padStart(2, '0')).join(' ');
  console.log('$' + (base + s).toString(16) + ': ' + line);
}
// 找表尾 (首个 ≥16 FF)
let run = 0, end = base;
for (let i = base; i < 0x2000; i++) {
  if (b[i] === 0xff) { run++; if (run >= 16) { end = i - run; break; } }
  else run = 0;
}
console.log('table data extent: $' + end.toString(16) + ' len=' + (end - base));
// A=0x15 → 0xFC, A=0x16 → 0x108
console.log('$FBCC+0xFC (A=0x15):', b.slice(base + 0xFC, base + 0xFC + 12).map(v => v.toString(16).padStart(2, '0')).join(' '));
console.log('$FBCC+0x108 (A=0x16):', b.slice(base + 0x108, base + 0x108 + 12).map(v => v.toString(16).padStart(2, '0')).join(' '));
