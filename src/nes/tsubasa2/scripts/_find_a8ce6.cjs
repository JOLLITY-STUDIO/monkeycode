const fs = require('fs');
const path = require('path');
const dirs = ['bank_05', 'bank_13', 'bank_21', 'bank_29'];
for (const d of dirs) {
  const dir = path.join(process.cwd(), '_tmp_bzk_out', d);
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
    let hit = false;
    lines.forEach((l, i) => {
      if (l.includes('A8CE')) { hit = true; console.log(d + '/' + f + ':' + (i + 1) + ': ' + l.trim().slice(0, 110)); }
    });
    if (!hit) {
      const first = lines.find(l => /:\s*[0-9A-F]{2} [0-9A-F]{2}/.test(l));
      const last = [...lines].reverse().find(l => /:\s*[0-9A-F]{2} [0-9A-F]{2}/.test(l));
      console.log(d + '/' + f + ' (no A8CE) first=' + (first ? first.trim().slice(0, 55) : '?') + ' last=' + (last ? last.trim().slice(0, 55) : '?'));
    }
  }
}
