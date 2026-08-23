const fs = require('fs');
const path = require('path');
const root = 'src/game';
function walk(d) {
  let files = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    const s = fs.statSync(p);
    if (s.isDirectory()) files = files.concat(walk(p));
    else if (/\.ts$/.test(f)) files.push(p);
  }
  return files;
}
for (const f of walk(root)) {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('TEXT_BUFFER_TEMPLATE_978B')) {
    const lines = c.split('\n');
    lines.forEach((l, i) => {
      if (l.includes('TEXT_BUFFER_TEMPLATE_978B')) console.log(`${f}:${i + 1}: ${l.trim()}`);
    });
  }
}
console.log('done');
