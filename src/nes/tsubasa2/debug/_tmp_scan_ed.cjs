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
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.includes('ram_00ED') || line.includes("'ram_00ED'")) {
      console.log(`${f}:${i + 1}: ${line.trim()}`);
    }
  });
}
