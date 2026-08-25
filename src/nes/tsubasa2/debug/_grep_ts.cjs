// 在 src/test 中递归搜字符串
const fs = require('fs');
const path = require('path');
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git' || e.name === 'dist') continue;
      walk(p, out);
    } else if (/\.ts$/.test(e.name)) {
      out.push(p);
    }
  }
}
const files = [];
walk('src', files);
walk('test', files);
const needle = process.argv[2];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (l.includes(needle)) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
