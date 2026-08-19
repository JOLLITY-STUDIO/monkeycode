const fs = require('fs');
const out = [];
for (const f of fs.readdirSync('_tmp_bzk_out/bank_01').sort()) {
  const lines = fs.readFileSync('_tmp_bzk_out/bank_01/' + f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    if (l.includes('82A9') || l.includes('A474') || l.includes('A402')) {
      out.push(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
    }
  });
}
fs.writeFileSync('_find_b01_out.txt', out.join('\n'), 'utf8');
