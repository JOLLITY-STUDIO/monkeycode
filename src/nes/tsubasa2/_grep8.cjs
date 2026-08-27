const fs = require('fs');
const files = [];
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '/' + e.name;
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === 'dist' || e.name === 'dist-cjs' || e.name === 'dist-cjs2' || e.name === '.git') continue;
      walk(p);
    } else if (e.name.endsWith('.ts')) files.push(p);
  }
}
walk('src');
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  if (t.includes('fade')) {
    const lines = t.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (/fade\s*[:=.]/.test(lines[i]) || /\.fade\b/.test(lines[i])) {
        console.log(f + ':' + (i + 1) + ': ' + lines[i].trim());
      }
    }
  }
}
