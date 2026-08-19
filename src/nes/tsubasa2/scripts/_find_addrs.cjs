const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), '_tmp_bzk_out', 'bank_02');
const targets = ['8895', '8920', 'A82F', '8976', '9A35', '9B28', '9B5E', '88FB', '8AF7', '890C', '9A0D', '9FA8'];
const found = {};
for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.asm'))) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split('\n');
  lines.forEach((l, i) => {
    const m = l.match(/01:([0-9A-F]{4}):\s+([A-F0-9]{2}(?: [A-F0-9]{2}){0,2})\s+(\w+)\s*(.*)$/);
    if (m && targets.includes(m[1])) {
      if (!found[m[1]]) found[m[1]] = [];
      found[m[1]].push(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
    }
  });
}
for (const t of targets) {
  console.log('### $' + t);
  if (found[t]) console.log(found[t].join('\n'));
  else console.log('(not found as code)');
}
