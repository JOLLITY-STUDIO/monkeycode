const fs = require('fs');
const path = require('path');
const hits = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!['node_modules'].includes(e.name)) walk(p); }
    else if (e.name.endsWith('.ts')) {
      const c = fs.readFileSync(p, 'utf8');
      const L = c.split(/\r?\n/);
      L.forEach((l, i) => {
        if (/\bBank29RosterService\b|\bread16Div\b|\.read16\(|\.read\(0x/.test(l) && !p.replace(/\\/g, '/').endsWith('prg/code/bank29_roster.ts')) {
          hits.push(p.replace(/\\/g, '/') + ':' + (i + 1) + ': ' + l.trim().slice(0, 110));
        }
      });
    }
  }
}
walk('src');
console.log(hits.length ? '' : 'NO EXTERNAL USERS');
hits.forEach(h => console.log(h));
