// 验证 DATA_AE86 与 ROM 0x3AE96 逐字节一致 (bank29 偏移 0x0E86, 物理 0x10+29*0x2000+0x0E86)
const fs = require('fs');
const rom = fs.readFileSync('docs/roms/Captain Tsubasa II - Super Striker (Japan).nes');
const BASE = 0x10 + 29 * 0x2000;
const OFF = 0x0E86;
const hex = (n) => n.toString(16).toUpperCase().padStart(2, '0');
const dump = (o, l) => {
  const a = [];
  for (let i = 0; i < l; i++) a.push('0x' + hex(rom[BASE + o + i]));
  return a.join(', ');
};
const s = fs.readFileSync('src/game/prg/data/tables/bank28-tables.ts', 'utf8');
const m = s.match(/export const DATA_AE86: readonly number\[\] = \[([\s\S]*?)\];/);
if (!m) { console.log('no match'); process.exit(1); }
const arr = m[1].replace(/\s/g, '').split(',').filter((x) => x.length);
console.log('table len =', arr.length, 'expected = 0x17A = 378');
console.log('rom head  :', dump(OFF, 16));
console.log('ts  head  :', arr.slice(0, 16).join(', '));
console.log('rom tail  :', dump(OFF + 0x170, 8));
console.log('ts  tail  :', arr.slice(-8).join(', '));
let ok = true;
for (let i = 0; i < arr.length; i++) {
  const rv = rom[BASE + OFF + i];
  const tv = parseInt(arr[i], 16);
  if (rv !== tv) { console.log('MISMATCH at', i, 'rom =', hex(rv), 'ts =', hex(tv)); ok = false; break; }
}
console.log(ok ? 'ALL MATCH ✓' : 'FAIL ✗');
