// 检查 bank22 模板指针表边界: 打印 0x280 起 u16, 标注合法/非法
const fs = require('fs');
const path = require('path');
const ROM = path.join(__dirname, 'docs', 'roms', 'Captain Tsubasa II - Super Striker (Japan).nes');
const buf = fs.readFileSync(ROM);
const b22 = buf.slice(0x10 + 22 * 0x2000, 0x10 + 22 * 0x2000 + 0x2000);
const u16 = (a) => (b22[a] ?? 0) | ((b22[a + 1] ?? 0) << 8);
let legal = 0;
for (let i = 0; i < 80; i++) {
  const v = u16(0x280 + i * 2);
  const ok = v >= 0x8200 && v <= 0x9fff;
  if (ok) legal++;
  console.log('idx' + String(i).padStart(2, ' ') + ' $' + (0x280 + i * 2).toString(16).toUpperCase().padStart(4, '0') + ' → $' + v.toString(16).toUpperCase().padStart(4, '0') + (ok ? '' : '  ← BAD'));
}
console.log('legal count:', legal);
