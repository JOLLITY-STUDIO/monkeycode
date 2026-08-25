const fs = require('fs');
const files = ['src/asm/bank00/code_main.s', 'src/asm/bank00/code_sub.s', 'src/asm/bank02/code_main.s', 'src/asm/bank02/code_sub.s', 'src/asm/bank02/code_data.s'];
for (const f of files) {
  let s;
  try { s = fs.readFileSync(f, 'utf8'); } catch { continue; }
  const lines = s.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/INC \$004[AB]\b/.test(l) || /DEC \$004[AB]\b/.test(l) || /\$004A|\$004B/.test(l)) {
      console.log(f + ':' + (i + 1) + ':' + l);
    }
  });
}
