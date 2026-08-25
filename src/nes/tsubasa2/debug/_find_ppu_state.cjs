const fs = require('fs'), path = require('path');
function walk(d) {
  let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (/\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const f of walk('src/game/prg/data/store')) {
  const c = fs.readFileSync(f, 'utf8');
  if (c.includes('PpuStateView') || c.includes('ppuState')) console.log(f);
}
