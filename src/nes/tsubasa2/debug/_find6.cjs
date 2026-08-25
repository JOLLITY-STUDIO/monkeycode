const fs = require('fs');
const dir = 'src/asm';
const out = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.s')) {
      const lines = fs.readFileSync(p, 'utf8').split(/\r\n|\r|\n/);
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/;\s*\$9F6[0-9A-F]/i);
        if (m) out.push(p + ':' + (i + 1) + ': ' + lines[i].trim());
      }
    }
  }
}
walk(dir);
console.log(out.slice(0, 80).join('\n'));
