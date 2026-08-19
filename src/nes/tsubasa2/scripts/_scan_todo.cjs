const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'src', 'game');
const out = [];
let n = 0;
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.ts')) {
      const s = fs.readFileSync(p, 'utf8').split('\n');
      s.forEach((l, i) => {
        if (/TODO|FIXME|待翻译|未翻译|待实现|暂未|STUB|stub/.test(l)) {
          n++;
          if (n <= 80) out.push(p.replace(process.cwd() + '\\', '') + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
        }
      });
    }
  }
}
walk(root);
console.log(out.join('\n'));
console.log('TOTAL_TODO=' + n);
