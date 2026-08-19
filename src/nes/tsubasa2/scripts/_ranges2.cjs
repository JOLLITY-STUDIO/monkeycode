const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_02');
const re = /[0-9A-F]{2}:[0-9A-F]{4}:/;
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm')).sort()) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  const first = lines.find(l => re.test(l));
  const last = [...lines].reverse().find(l => re.test(l));
  console.log(f + ' first=' + (first ? first.trim().slice(0, 62) : '?') + ' | last=' + (last ? last.trim().slice(0, 62) : '?'));
}
