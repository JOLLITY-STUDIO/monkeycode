const fs = require('fs');
const path = require('path');
function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.ts')) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((l, i) => {
        if (/TODO|FIXME|stub|占位|未实现/i.test(l)) out.push(`${p}:${i+1}: ${l.trim()}`);
      });
    }
  }
  return out;
}
const hits = walk('src/game/prg/code/scene');
console.log(hits.slice(0, 50).join('\n'));
