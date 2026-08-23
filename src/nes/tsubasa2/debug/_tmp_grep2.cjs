const fs = require('fs');
const path = require('path');
const root = process.argv[2] || 'src/game';
const pattern = process.argv[3] || 'sub94C1Gen|sub9143|sceneLoad|loadSceneNT';
const skip = new Set(['node_modules', '.git', 'dist', '_tmp_bzk_out', '_test_out', '_tmp_out', '_verify_mmc3_out']);
const re = new RegExp(pattern);
function walk(d) {
  let files = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    let s;
    try { s = fs.statSync(p); } catch (e) { continue; }
    if (s.isDirectory()) {
      if (!skip.has(f)) files = files.concat(walk(p));
    } else if (/\.(ts|js)$/.test(f)) {
      files.push(p);
    }
  }
  return files;
}
for (const f of walk(root)) {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (re.test(l)) console.log(`${f}:${i + 1}: ${l.trim()}`);
  });
}
console.log('--- done ---');
