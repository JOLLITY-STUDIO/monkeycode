const fs = require('fs');
// search all asm files for C51E label
const dirs = ['_tmp_bzk_out', '.'];
for (const d of dirs) {
  let files;
  try { files = fs.readdirSync(d); } catch (e) { continue; }
  for (const f of files) {
    if (!/\.asm$/.test(f)) continue;
    const t = fs.readFileSync(d + '/' + f, 'utf8');
    const lines = t.split('\n');
    let out = [];
    lines.forEach((l, i) => {
      if (/\bC51[0-9A-F]:/.test(l) || /\bC51E:/.test(l)) out.push(l);
    });
    if (out.length) {
      console.log('== ' + d + '/' + f + ' ==');
      console.log(out.join('\n'));
    }
  }
}
