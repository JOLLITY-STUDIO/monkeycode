// 临时: dump bank00 $97FC-$9840 完成 $97C4 循环语义
const fs = require('fs');
const s = fs.readFileSync('src/game/data/prg-bank-00.ts', 'utf8');
const m = s.match(/=\s*\[([\s\S]*?)\]/);
const arr = m[1].split(',').map(x => parseInt(x.trim(), 16));
for (let i = 0x17FC; i < 0x17FC + 72; i += 8) {
  const hex = arr.slice(i, i + 8).map(v => (v & 0xFF).toString(16).padStart(2, '0').toUpperCase()).join(' ');
  console.log('$' + (0x8000 + i).toString(16).toUpperCase() + ': ' + hex);
}
