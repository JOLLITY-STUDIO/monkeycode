const fs = require('fs');
for (const f of ['src/asm/bank02/code_sub.s','src/asm/bank02/code_data.s','src/asm/bank02/code_main.s']) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  console.log('===== ' + f);
  lines.forEach((l, i) => {
    if (l.includes('$855A') || l.includes('$855B') || l.includes('$A602') || l.includes('$A603') || l.includes('$A7FB')) console.log((i + 1) + ': ' + l.trim());
  });
}
