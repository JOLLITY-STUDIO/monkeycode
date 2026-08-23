// 临时：dump $96C0-$9728 精灵子命令处理器
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/rom/prg-bank-00.ts', 'utf8');
const h = s.match(/0x[0-9a-fA-F]{2}/g).map((x) => parseInt(x, 16));
let o = '';
for (let a = 0x96c0; a <= 0x9728; a++) {
  if (((a - 0x96c0) & 0xf) === 0) o += '\n$' + a.toString(16).toUpperCase() + ': ';
  o += h[a - 0x8000].toString(16).padStart(2, '0') + ' ';
}
console.log(o);
