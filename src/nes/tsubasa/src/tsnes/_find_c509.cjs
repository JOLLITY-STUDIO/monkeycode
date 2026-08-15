const fs = require('fs');
const path = require('path');
function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && !f.startsWith('.')) r = r.concat(walk(p));
    } else if (p.endsWith('.ts')) r.push(p);
  }
  return r;
}
const out = [];
const files = walk('tsubasa2-h5-src/src');
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  if (/cb99|C509|0xcb99|queryDispatch|indirectDispatch/i.test(t)) out.push(f);
}
fs.writeFileSync('_find_c509.txt', out.join('\n'), 'utf8');
console.log('found', out.length);
