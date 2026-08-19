const s = require('fs').readFileSync('src/game/service/bank30_init.service.ts', 'utf8').split('\n');
s.forEach((l, i) => {
  const t = l.trim();
  if (/^export class/.test(t) || /^\w+\(.*\):/.test(t) || /^get \w+/.test(t) || /^  \w+\(/.test(t)) {
    console.log((i + 1) + ': ' + t.slice(0, 100));
  }
});
