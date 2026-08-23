const fs = require('fs');
const path = require('path');
function walk(dir, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(ts|js)$/.test(f)) out.push(p);
  }
  return out;
}
const files = walk('src', []);
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/05e8|0628|0629|ntBuffer|renderCommit/.test(l)) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
