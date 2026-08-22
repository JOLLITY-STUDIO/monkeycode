// 列出 bank28-tables.ts 所有 readonly number[] 表的 base 名 + 长度
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/tables/bank28-tables.ts', 'utf8');
const re = /export const (\w+): readonly number\[\] = \[([\s\S]*?)\];/g;
let m;
const out = [];
while ((m = re.exec(s))) {
  const arr = m[2].replace(/\s/g, '').split(',').filter((x) => x.length);
  out.push(m[1] + ' len=' + arr.length);
}
console.log(out.join('\n'));
