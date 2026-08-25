const fs = require('fs');
const path = require('path');

function scan(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name.startsWith('__') || f.name === 'node_modules' || f.name === 'dist') continue;
      out = out.concat(scan(p));
    } else if (f.name.endsWith('.ts')) {
      out.push(p);
    }
  }
  return out;
}

const all = [...scan('src'), ...scan('test'), ...scan('pages')];
for (const f of all) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('TeamEntry')) {
      console.log(f.replace(/\\/g, '/') + ':' + (i+1) + ': ' + lines[i].trim());
    }
  }
}
