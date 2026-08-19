const fs = require('fs');
const path = require('path');
function grepDir(dir, pattern, out) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) { if (f !== 'node_modules') grepDir(p, pattern, out); }
    else if (f.endsWith('.ts')) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((l, i) => { if (pattern.test(l)) out.push(`${p}:${i + 1}: ${l.trim()}`); });
    }
  }
}
const out = [];
grepDir('src', /setIdle|isBusy\(\)|emitSprites|\.busy\b/, out);
fs.writeFileSync('_tmp_busy.txt', out.join('\n') || '(none)');
console.log(out.length, 'matches');
