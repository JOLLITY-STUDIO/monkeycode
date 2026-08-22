// 检查 base0 值域: base0 = ATTR[A*4] (A<$23) 或 ATTR[A*12] (A>=$23)
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/tables/bank28-tables.ts', 'utf8');
function getTable(name) {
  const m = s.match(new RegExp('export const ' + name + ': readonly number\\[\\] = \\[([\\s\\S]*?)\\];'));
  if (!m) return null;
  return m[1].replace(/\s/g, '').split(',').filter((x) => x.length).map((x) => parseInt(x, 16));
}
const ATTR = getTable('DATA_ATTR_95D6');
const N9FC = getTable('DATA_9FCE');
// base0 采样: A=0..0x22 → ATTR[A*4]; A=0x23..0x4A → ATTR[A*12]
const seen = {};
for (let a = 0; a < 0x4A; a++) {
  const off = a < 0x23 ? a * 4 : a * 12;
  const b0 = ATTR[off];
  seen[b0] = (seen[b0] || 0) + 1;
}
console.log('base0 分布:', Object.keys(seen).sort((x, y) => x - y).map((k) => k + '×' + seen[k]).join(' '));
// 相邻采样
console.log('ATTR[24..40] =', ATTR.slice(24, 40).map((x) => x.toString(16)).join(' '));
console.log('ATTR[0x120..0x140] =', ATTR.slice(0x120, 0x140).map((x) => x.toString(16)).join(' '));
console.log('9FCE len =', N9FC.length, '非零数 =', N9FC.filter((x) => x !== 0).length);
