const fs = require('fs');
const dir = 'src/asm';
const files = ['bank00/code_main.s', 'bank00/code_sub.s', 'bank30/_full.s', 'bank31/code_main.s', 'bank31/_full.s'];
for (const f of files) {
  const p = 'src/asm/' + f;
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r\n|\r|\n/);
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i];
    if (/C4B9/.test(t)) {
      // print window
      const a = lines.slice(Math.max(0, i - 6), i + 4);
      console.log('===== ' + p + ':' + (i + 1) + ' =====');
      a.forEach(l => console.log(l.trim()));
      console.log('');
    }
  }
}
