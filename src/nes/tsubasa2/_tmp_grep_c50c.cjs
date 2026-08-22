const fs = require('fs');
const path = require('path');
const hits = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.ts')) {
      const s = fs.readFileSync(p, 'utf8');
      if (s.includes('MatchConfigService')) hits.push(p + '  |  ' + (s.match(/MatchConfigService/g) || []).length + 'x');
    }
  }
};
walk('src/game');
console.log(hits.join('\n'));
