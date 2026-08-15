// Grep helper: find files containing any of given patterns
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'tsubasa2-h5-src', 'src');
const patterns = ['ram_0430', 'ram_0601', 'ram_061E', 'ram_05F7', 'ram_0610', 'C527', 'CE08', 'C524', '8C55'];

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.ts')) out.push(p);
  }
  return out;
}

for (const pat of patterns) {
  const hits = [];
  for (const f of walk(root)) {
    const c = fs.readFileSync(f, 'utf8');
    if (c.includes(pat)) hits.push(path.relative(__dirname, f));
  }
  console.log(`== ${pat} ==`);
  for (const h of hits) console.log('  ' + h);
}
