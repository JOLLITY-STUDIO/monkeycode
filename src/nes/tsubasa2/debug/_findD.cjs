const fs = require('fs');
const dir = 'src/asm';
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) { walk(p); continue; }
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(p, 'utf8').split(/\r\n|\r|\n/);
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i];
      if (/JSR \$A212|JMP \$A212|JSR \$A20C|JSR \$A20F|JSR \$A215|JSR \$A218/.test(t)) {
        console.log(p + ':' + (i + 1) + ': ' + t.trim());
      }
    }
  }
}
walk(dir);
