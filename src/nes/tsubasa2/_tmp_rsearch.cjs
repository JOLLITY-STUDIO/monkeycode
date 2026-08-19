const fs = require('fs');
const path = require('path');
const root = process.argv[2];
const pat = new RegExp(process.argv[3], 'i');
function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f === 'node_modules' || f === '.codebuddy') continue;
      out = out.concat(walk(p));
    } else if (/\.(ts|tsx)$/.test(f)) {
      out.push(p);
    }
  }
  return out;
}
for (const file of walk(root)) {
  const t = fs.readFileSync(file, 'utf8');
  const lines = t.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (pat.test(l)) console.log(file.replace(root, '') + ':' + (i + 1) + ': ' + l.trim());
  });
}
