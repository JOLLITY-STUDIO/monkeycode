const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), '_tmp_bzk_out');
for (const d of ['bank_03', 'bank_04', 'bank_05']) {
  const dir = path.join(root, d);
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
    const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
    const first = lines.find(l => /:\s*[0-9A-F]{2} [0-9A-F]{2}/.test(l));
    const last = [...lines].reverse().find(l => /:\s*[0-9A-F]{2} [0-9A-F]{2}/.test(l));
    console.log(d + '/' + f + ' first=' + (first ? first.trim().slice(0, 60) : '?') + ' last=' + (last ? last.trim().slice(0, 60) : '?'));
  }
}
