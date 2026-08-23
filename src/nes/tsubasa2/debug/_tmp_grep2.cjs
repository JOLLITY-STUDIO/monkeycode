const fs = require('fs');
const path = require('path');
function grep(dir, patterns, exts) {
  const out = [];
  function walk(d) {
    for (const f of fs.readdirSync(d)) {
      const p = path.join(d, f);
      let s; try { s = fs.statSync(p); } catch (e) { continue; }
      if (s.isDirectory()) { if (f === 'node_modules' || f === '.git') continue; walk(p); continue; }
      if (exts && !exts.some(e => f.endsWith(e))) continue;
      try {
        const lines = fs.readFileSync(p, 'utf8').split('\n');
        lines.forEach((l, i) => {
          for (const pt of patterns) if (l.includes(pt)) out.push(`${p}:${i + 1}: ${l.trim()}`);
        });
      } catch (e) {}
    }
  }
  walk(dir);
  return out;
}
console.log('=== GameSystemService sub94C1Gen ===');
console.log(grep(__dirname + '/../src/game/prg/code/system', ['sub94C1Gen', 'sub9143', 'sub9085'], ['.ts']).join('\n'));
console.log('=== asm 9735/974A/975B ===');
console.log(grep(__dirname + '/../asm/bank00', ['9735', '974A', '975B', '9692', '9693'], ['.s']).join('\n'));
