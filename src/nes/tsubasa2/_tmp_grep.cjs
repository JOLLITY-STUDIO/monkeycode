// find lines with address markers in bank20 asm files for key routines
const fs = require('fs');
const files = ['code_data.s', 'code_main.s', 'code_sub.s', '_full.s'];
const addrs = ['$84DC', '$857A', '$8438', '$8409', '$80EA', '$800F', '$8067'];
let out = '';
for (const f of files) {
  const p = 'asm/bank20/' + f;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    const m = l.match(/;\s*\$([0-9A-F]{4})\s*$/i);
    if (m && addrs.some(a => a.toUpperCase() === '$' + m[1].toUpperCase())) {
      out += f + ':' + (i + 1) + ': ' + l.trim() + '\n';
    }
  });
}
fs.writeFileSync('_tmp_grep_out.txt', out);
console.log('done');
