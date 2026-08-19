const fs = require('fs');
const p = 'src/game/service/bank00/bank00_core.service.ts';
const s = fs.readFileSync(p, 'utf8').split('\n');
s.forEach((l, i) => {
  const t = l.trim();
  if (/^\s*(private|public|protected)?\s*\w+\s*\(/.test(t) && /\)/.test(t)) {
    console.log((i + 1) + ': ' + t.slice(0, 100));
  }
});
