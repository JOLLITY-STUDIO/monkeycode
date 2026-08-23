const fs = require('fs');
const path = require('path');
function grepAll(d, re, out) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) { if (f === 'node_modules' || f === '.git' || f === 'dist') continue; grepAll(p, re, out); continue; }
    if (!/\.(ts|d\.ts)$/.test(f)) continue;
    const c = fs.readFileSync(p, 'utf8');
    c.split('\n').forEach((l, i) => { if (re.test(l)) out.push(p + ':' + (i + 1) + ': ' + l.trim()); });
  }
}
const out = [];
grepAll(__dirname + '/../src', /(interface|class|declare\s+class|type)\s+PPU\b/, out);
grepAll(__dirname + '/../typings', /PPU/, out);
console.log(out.join('\n') || 'none');
