// Grep $C527/$CE08/0032/0033/FB4C usage across translated banks
const fs = require('fs');
const path = require('path');
const root = 'tsubasa2-h5-src/src';
const hits = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.ts$/.test(f)) {
      const src = fs.readFileSync(p, 'utf8').split(/\r?\n/);
      src.forEach((line, i) => {
        if (/C527|CE08|FB4C|FB4D|ram_0032|ram_0033|KEY_0032|KEY_0033|KEY_0031/.test(line)) {
          hits.push(`${p}:${i + 1}: ${line.trim()}`);
        }
      });
    }
  }
}
walk(root);
console.log(hits.join('\n') || '(no hits)');
