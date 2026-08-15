const fs = require('fs');
const dir = '_tmp_bzk_out';
for (const f of fs.readdirSync(dir)) {
  if (!/bank_\d+\.asm/.test(f)) continue;
  const lines = fs.readFileSync(dir + '/' + f, 'utf8').split(/\r?\n/);
  for (const l of lines) {
    if (/ram_0038/.test(l)) {
      console.log(f + ': ' + l.trim().slice(0, 110));
    }
  }
}
