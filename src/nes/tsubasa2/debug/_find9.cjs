const fs = require('fs');
const dir = 'src/asm';
const pats = [/\$820[C-F]/, /\$8212/, /\$8215/, /\$A484/, /\$A855/, /\$A86E/, /\$A8CE/];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) { walk(p); continue; }
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(p, 'utf8').split(/\r\n|\r|\n/);
    for (let i = 0; i < lines.length; i++) {
      const t = lines[i];
      if (/JMP|JSR/.test(t) && pats.some(r => r.test(t))) {
        console.log(p + ':' + (i + 1) + ': ' + t.trim());
      }
    }
  }
}
walk(dir);
