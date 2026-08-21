const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src';
const pats = ['ram_04A5', 'ram_0200', 'C527', 'C536', 'C539', 'C50C', 'C515', 'C509', '05F4', '05F5', '0515', '062A'];
const hits = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.ts')) {
      const lines = fs.readFileSync(p, 'utf8').split('\n');
      lines.forEach((ln, i) => {
        for (const pt of pats) if (ln.includes(pt)) hits.push(`${p.replace(/\\/g, '/')}:${i + 1}: ${ln.trim()}`);
      });
    }
  }
}
walk(root);
console.log(hits.length ? hits.slice(0, 200).join('\n') : 'NO MATCHES');
