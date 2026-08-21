const fs = require('fs');
for (const f of ['code_main.s', 'code_sub.s', 'code_data.s']) {
  const s = fs.readFileSync(`asm/bank30/${f}`, 'utf8');
  const lines = s.split('\n');
  for (const target of ['C982', 'C9E9', 'C9C5', 'C8FB', 'C76E', 'C821']) {
    lines.forEach((l, i) => {
      if (l.includes(target)) console.log(`${f}:${i + 1}: ${l.trim()}`);
    });
  }
}
