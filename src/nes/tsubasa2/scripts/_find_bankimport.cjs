const fs = require('fs');
const path = require('path');

function scan(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name.startsWith('__') || f.name === 'node_modules') continue;
      out = out.concat(scan(p));
    } else if (f.name.endsWith('.ts')) {
      out.push(p);
    }
  }
  return out;
}

const root = 'src/game/prg';
const files = scan(root);
const re = /from\s+['"](?:\.\/)?(?:scene\/)?bank\d+['"]|['"](?:\.\/)?bank\d+(?:\.js)?['"]|require\s*\(\s*['"](?:\.\/)?bank\d+['"]/g;
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  const reLocal = /['"](?:\.\/|\.\.\/)+(?:[^'"\n]+\/)?bank\d+(?:\.[jt]s)?['"]/g;
  while ((m = reLocal.exec(content))) {
    const target = m[0];
    console.log(file.replace(/\\/g, '/') + ': ' + target);
  }
}
