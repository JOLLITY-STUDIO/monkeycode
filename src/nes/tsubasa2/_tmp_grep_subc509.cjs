// 临时: grep subC509 调用点
const fs = require('fs');
const path = require('path');
const root = 'src/game/prg';
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (p.endsWith('.ts')) out.push(p);
  }
}
const files = [];
walk(root, files);
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const lines = src.split('\n');
  lines.forEach((l, i) => {
    if (/subC509/.test(l)) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
