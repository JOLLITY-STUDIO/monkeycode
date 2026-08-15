/* 辅助: 检查 bank28 原始数据关键区 (bank28 可映射 $8000 或 $A000 窗口) */
const b = require('./rom-data/prg-bank-28.js');
const a = b.default || b.PRG_BANK_28 || (Array.isArray(b) ? b : null);
console.log('len:', a.length);
// $BAB2 在 bank28 映射 $A000 窗口时: offset = $BAB2 - $A000 = $1AB2
const o = 0xbab2 - 0xa000;
console.log('BAB2 offset(0x1ab2):', o.toString(16));
console.log('BAB2[0..32]:', a.slice(o, o + 32).map(x => '0x' + x.toString(16).padStart(2, '0')).join(','));
console.log('9F0E 16bit (bank28 @ $8000, offset 0x1f0e):');
for (let i = 0; i < 20; i += 2) {
  const v = a[0x1f0e + i] | (a[0x1f0f + i] << 8);
  console.log('  [' + (i / 2) + '] = ' + v);
}
