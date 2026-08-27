const fs = require('fs');
const path = require('path');
function walk(d, cb) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', 'dist-cjs', 'dist-cjs2', '.git', 'dist'].includes(e.name)) continue;
      walk(p, cb);
    } else if (/\.ts$/.test(e.name)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/class HeadlessRuntime/.test(t)) cb(p);
    }
  }
}
walk('src', (p) => console.log(p));
// also find where OpeningSceneController is instantiated / boot flow
function walk2(d, cb) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', 'dist-cjs', 'dist-cjs2', '.git', 'dist'].includes(e.name)) continue;
      walk2(p, cb);
    } else if (/\.ts$/.test(e.name)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/new OpeningSceneController|changeScene\(/.test(t)) cb(p);
    }
  }
}
console.log('--- new OpeningSceneController ---');
walk2('src', (p) => console.log(p));
