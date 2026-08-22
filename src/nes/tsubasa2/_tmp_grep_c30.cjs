const fs = require('fs');
const files = ['code_main.s', 'code_sub.s', 'code_data.s'];
for (const f of files) {
  const p = 'asm/bank30/' + f;
  const s = fs.readFileSync(p, 'utf8');
  const lines = s.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (l.includes('CDE2') || l.includes('CB99') || l.includes('CDC9')) console.log(`${p}:${i + 1}: ${l.trim()}`);
  });
}
