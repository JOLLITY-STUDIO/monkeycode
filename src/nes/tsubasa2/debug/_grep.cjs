const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
const pat = new RegExp(process.argv[3] || 'OPENING_CHR_CONFIGS');
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.ts$/.test(e.name)) {
      const s = fs.readFileSync(p, 'utf8');
      s.split('\n').forEach((ln, i) => {
        if (pat.test(ln)) console.log(`${p}:${i + 1}: ${ln.trim()}`);
      });
    }
  }
}
walk(path.resolve(dir));
