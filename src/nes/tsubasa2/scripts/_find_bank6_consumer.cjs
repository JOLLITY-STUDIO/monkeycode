const fs = require('fs');
const path = require('path');

function scan(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name.startsWith('__') || f.name === 'node_modules' || f.name === 'dist' || f.name === 'miniprogram_npm') continue;
      out = out.concat(scan(p));
    } else if (f.name.endsWith('.ts')) {
      out.push(p);
    }
  }
  return out;
}

const files = scan('src');
files.push(...scan('pages'));
files.push(...scan('test'));

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/(scene\/bank6\b|scene\/bank7\b|scene\/bank6['"]|scene\/bank7['"])/.test(line) &&
        /from\s+['"]/.test(line)) {
      console.log(file.replace(/\\/g, '/') + ':' + (i+1) + ': ' + line.trim());
    }
  }
}
