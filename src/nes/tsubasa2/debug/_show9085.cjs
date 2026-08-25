const fs = require('fs');
const path = require('path');
const root = 'src/asm';
const targets = ['9085'];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) { walk(p); continue; }
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
    let hit = -1;
    lines.forEach((l, i) => {
      const m = l.match(/;\s*\$9085\b/);
      if (m) hit = i;
    });
    if (hit >= 0) {
      console.log('===== ' + p + ' @ line ' + (hit + 1) + ' =====');
      for (let j = hit; j < hit + 70 && j < lines.length; j++) console.log(j + 1 + ': ' + lines[j]);
    }
  }
}
walk(root);
console.log('done');
