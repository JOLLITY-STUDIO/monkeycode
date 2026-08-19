const fs = require('fs');
const c = fs.readFileSync('_tmp_bzk_out/bank_30/bank_30_part03.asm', 'utf8');
const lines = c.split('\n');
const targets = ['CDC9', 'CE4A', 'CE4D', 'CE50', 'CD7C', 'CC02', 'CD89'];
lines.forEach((l, i) => {
  if (targets.some(t => l.includes(':' + t + ':')) || targets.some(t => l.includes(t))) {
    if (l.includes('0F:')) console.log((i + 1) + ': ' + l.trim());
  }
});
