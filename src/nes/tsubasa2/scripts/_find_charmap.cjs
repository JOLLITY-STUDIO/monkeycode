const fs = require('fs');
const path = require('path');
const hits = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name !== 'node_modules' && e.name !== 'dist') walk(p);
    } else if (/\.ts$/.test(e.name)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/CharMap|charMap|charmap|registerTable|0x94/.test(t)) hits.push(p);
    }
  }
}
walk('src');
console.log(hits.join('\n'));
