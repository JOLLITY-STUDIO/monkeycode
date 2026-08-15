const fs = require('fs');
const path = require('path');
const root = 'tsubasa2-h5-src/src';
const pats = ['C527', 'C51E', 'CD3C', 'numToChar', 'numberToPattern', '_div16', 'charToNumber'];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(ts|js)$/.test(f)) {
      const txt = fs.readFileSync(p, 'utf8');
      for (const pat of pats) {
        if (txt.includes(pat)) console.log(p, '→', pat);
      }
    }
  }
}
walk(root);
