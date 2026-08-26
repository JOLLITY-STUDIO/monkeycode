const fs = require('fs');
const path = require('path');
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules', 'dist'].includes(e.name)) walk(p); }
    else if (e.name.endsWith('.s') || e.name.endsWith('.md')) files.push(p);
  }
}
walk('src/asm');
walk('docs');
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const lines = t.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/\$8A14|8A14/.test(lines[i])) {
      console.log(f + ':' + (i + 1) + ': ' + lines[i].trim().slice(0, 200));
    }
  }
}
