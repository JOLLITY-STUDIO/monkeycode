// 扫描 bank19 $988D 之后是否还有非 FF 数据 (可能的后续章节流)
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const b = Array.from(rom.slice(0x10 + 19 * 0x2000, 0x10 + 20 * 0x2000));
for (let s = 0x1880; s < 0x2000; s += 0x80) {
  let n = 0;
  const end = Math.min(s + 0x80, 0x2000);
  for (let i = s; i < end; i++) if (b[i] !== 0xff) n++;
  console.log('$' + s.toString(16) + ': nonFF=' + n);
}
