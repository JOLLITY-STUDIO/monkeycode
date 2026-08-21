const fs = require('fs');
function grep(file, pat, ctx = 14) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((ln, i) => {
    if (pat.test(ln)) {
      const s = Math.max(0, i - ctx), e = Math.min(lines.length, i + ctx + 1);
      console.log(`=== ${file}:${i + 1} ===`);
      for (let j = s; j < e; j++) console.log(`${j + 1}|${lines[j]}`);
      console.log('');
    }
  });
}
grep('asm/bank30/code_main.s', /CB99/);
grep('asm/bank30/_full.s', /CB99/);
