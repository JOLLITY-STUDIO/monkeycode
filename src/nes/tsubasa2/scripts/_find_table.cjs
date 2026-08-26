const fs = require('fs');
const files = ['src/asm/bank00/code_sub.s', 'src/asm/bank00/code_render.s', 'src/asm/bank00/code_util.s', 'src/asm/bank00/data_tables.s', 'src/asm/bank00/_full.s'];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/8A14/.test(lines[i]) && !/LDA \$8A14/.test(lines[i])) {
      console.log(f + ':' + (i + 1) + ': ' + lines[i].trim().slice(0, 200));
    }
  }
}
