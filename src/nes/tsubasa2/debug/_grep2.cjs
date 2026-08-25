const fs = require('fs');
const path = require('path');
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.ts')) files.push(p);
  }
}
walk(path.join(__dirname, '..', 'src'));
const re = /consumeNtBuffer|applyNtBuffer|ntBufferPos|flushNt|drainNt/i;
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  if (!re.test(s)) continue;
  const ls = s.split('\n');
  ls.forEach((ln, i) => {
    if (re.test(ln)) console.log(f.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + ln.trim());
  });
}
