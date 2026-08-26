const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const hits = [];
const files = fs.readdirSync(root).filter((f) => /\.(log|txt|out|err)$/.test(f));
for (const f of files) {
  const p = path.join(root, f);
  const sz = fs.statSync(p).size;
  if (sz > 20e6) continue;
  try {
    const s = fs.readFileSync(p, 'utf8');
    const m = /tecmo/i.exec(s);
    if (m) {
      hits.push(`${f}  size=${sz}  firstMatch@${m.index}`);
    }
  } catch { }
}
console.log(hits.join('\n'));
