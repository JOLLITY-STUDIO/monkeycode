// 在 bank30 找 $CBxx-$CCxx 子程标注
const fs = require('fs');
for (const f of ['asm/bank30/_full.s', 'asm/bank30/code_main.s']) {
  if (!fs.existsSync(f)) continue;
  const c = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  let count = 0;
  c.forEach((l, i) => {
    if (/;\s*\$CB\d\d/.test(l) || /;\s*\$CC\d\d/.test(l)) {
      console.log(f + ':' + (i + 1) + ': ' + l);
      count++;
    }
  });
  console.log(f + ' total: ' + count);
}
