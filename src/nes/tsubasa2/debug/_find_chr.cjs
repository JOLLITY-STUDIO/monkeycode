// grep applyChrRequest / ram_0075 / OPENING_CHR_CONFIGS 的使用
const fs = require('fs'), path = require('path');
function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules' && e.name !== 'dist' && e.name !== '.git') out = out.concat(walk(p)); }
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}
const root = 'src';
const pats = ['applyChrRequest', 'ram_0075', 'OPENING_CHR_CONFIGS', 'chrSlots'];
for (const f of walk(root)) {
  const c = fs.readFileSync(f, 'utf8');
  const hits = pats.filter(p => c.includes(p));
  if (hits.length) console.log(f, '=>', hits.join(','));
}
