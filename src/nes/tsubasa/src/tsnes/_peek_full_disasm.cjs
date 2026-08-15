// Look up addresses in full disasm for bank28/bank30 sections
const fs = require('fs');
const a = fs.readFileSync('_tmp_bzk_out/_full_disasm.asm', 'utf8').split(/\r?\n/);
const want = process.argv[2] ? [process.argv[2]] : ['0C:8000', '1C:8000', '0F:8000'];
let found = 0;
for (let i = 0; i < a.length && found < 60; i++) {
  for (const w of want) {
    if (a[i].includes(w)) {
      for (let j = i; j < i + 12 && j < a.length; j++) console.log(a[j]);
      console.log('---');
      found++;
    }
  }
}
