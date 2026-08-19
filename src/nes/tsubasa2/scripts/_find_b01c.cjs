const fs = require('fs');
const out = [];
const targets = ['AF79', 'AF8A', 'AFC2', 'B050', 'B0C0', 'B1BB'];
for (const f of fs.readdirSync('_tmp_bzk_out/bank_01').sort()) {
  const lines = fs.readFileSync('_tmp_bzk_out/bank_01/' + f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    for (const t of targets) {
      if (l.includes(t)) out.push(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 120));
    }
  });
}
fs.writeFileSync('_find_b01c_out.txt', out.join('\n'), 'utf8');
console.log('done', out.length);
