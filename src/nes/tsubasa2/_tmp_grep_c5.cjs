const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/game/prg/code';
const pats = ['subC539', 'subC536', 'subC575', 'subC515', 'coroutineYield', 'subC50C', 'subC54E', 'subC509', 'subC524', 'subC52D', 'subC530', 'subC533'];
const hits = new Map();
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.ts')) {
      const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
      lines.forEach((ln, i) => {
        for (const pat of pats) {
          if (ln.includes(pat)) {
            if (!hits.has(pat)) hits.set(pat, []);
            hits.get(pat).push(`${p.replace(root, '.')}:${i + 1}: ${ln.trim()}`);
          }
        }
      });
    }
  }
}
walk(root);
for (const pat of pats) {
  console.log(`\n=== ${pat} ===`);
  const arr = hits.get(pat) || [];
  for (const h of arr.slice(0, 40)) console.log(h);
  console.log(`(${arr.length} hits)`);
}
