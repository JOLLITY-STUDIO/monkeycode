const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'src', 'game', 'prg', 'data', 'scene', 'opening');
for (const f of fs.readdirSync(p).filter(x => x.endsWith('.ts') && x.startsWith('opening-'))) {
  const lines = fs.readFileSync(path.join(p, f), 'utf8').split('\n').filter(Boolean);
  let first = '';
  let last = '';
  for (const l of lines) {
    if (l.includes('f:')) {
      const m = l.match(/f:\d+/);
      if (!m) continue;
      if (!first) first = m[0];
      last = m[0];
    }
  }
  console.log(f, first, last);
}
