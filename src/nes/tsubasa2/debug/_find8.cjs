const fs = require('fs');
const dir = 'src/asm';
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) { if (f !== 'bank02') walk(p); continue; }
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(p, 'utf8').split(/\r\n|\r|\n/);
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i];
      if (/JMP \$8212|JSR \$8212|JMP \$820C|JSR \$820C|\$A484/.test(t) && !t.includes('$A484') === false) {
        console.log(p + ':' + (i + 1) + ': ' + t.trim());
      }
    }
  }
}
walk(dir);
