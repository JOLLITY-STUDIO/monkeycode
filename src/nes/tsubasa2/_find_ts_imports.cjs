const fs = require('fs');
const path = require('path');
const hits = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules','dist','dist-cjs','dist-cjs2'].includes(e.name)) continue;
      walk(p);
    } else if (/\.ts$/.test(e.name)) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (/from\s+['"][^'"]+\.ts['"]/.test(lines[i])) {
          hits.push(`${p}:${i + 1}: ${lines[i].trim()}`);
        }
      }
    }
  }
}
walk('src');
console.log(hits.join('\n') || 'none');
