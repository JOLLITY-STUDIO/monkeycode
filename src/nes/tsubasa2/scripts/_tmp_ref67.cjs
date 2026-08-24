// 搜索 asm 中引用 bank06/bank07 地址的代码（了解数据消费语义）
const fs = require('fs');
const path = require('path');

const dirs = ['src/asm/bank00', 'src/asm/bank30', 'src/asm/bank31', 'src/asm/bank02', 'src/asm/bank08', 'src/asm/bank06', 'src/asm/bank07'];
const pats = ['B800', 'BB48', 'BD0C', 'BF00', 'A00C', 'A0D4', 'B000', 'B300', '8AF7', '8BB0', '8BD0', '9AB8', '9ADA', '8920', '9AA2'];

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p);
    else if (f.endsWith('.s')) {
      const c = fs.readFileSync(p, 'utf8');
      const hits = c.split('\n').filter(l => pats.some(pat => l.toUpperCase().includes(pat)));
      if (hits.length) {
        console.log('== ' + p + ' (' + hits.length + ')');
        hits.slice(0, 40).forEach(l => console.log('  ' + l.trim()));
      }
    }
  }
}
for (const d of dirs) {
  if (fs.existsSync(d)) walk(d);
}
