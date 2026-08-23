const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '../src/game');
const files = [];
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (f.endsWith('.ts')) files.push(p);
  }
}
walk(root);
const pats = ['ram_0025', '0x0025', 'sub9085', 'sub8297', 'rd(0x0025)', 'wr(0x0025)'];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const p of pats) {
      if (line.includes(p)) {
        console.log(`${f}:${i + 1}: ${line.trim()}`);
        break;
      }
    }
  });
}
