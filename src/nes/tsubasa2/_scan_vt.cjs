const fs = require('fs');
const dir = 'src/game/prg/data/scene/opening';
const files = fs.readdirSync(dir).filter(f => f.startsWith('opening-') && f.endsWith('.ts'));
const stats = {}; // vt|fv -> count
const byFile = {};
for (const f of files) {
  const c = fs.readFileSync(dir + '/' + f, 'utf8');
  const re = /s:\{v:(\d+),h:(\d+),vt:(\d+),ht:(\d+),fv:(\d+),fh:(\d+),/g;
  let m;
  const local = {};
  while ((m = re.exec(c))) {
    const key = `v=${m[1]} vt=${m[3]} fv=${m[5]} h=${m[2]} ht=${m[4]} fh=${m[6]}`;
    local[key] = (local[key] || 0) + 1;
    stats[key] = (stats[key] || 0) + 1;
  }
  byFile[f] = local;
}
console.log('=== GLOBAL vt/fv distribution ===');
for (const [k, v] of Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 15)) {
  console.log(String(v).padStart(6) + '  ' + k);
}
console.log('\n=== per-file ===');
for (const [f, l] of Object.entries(byFile)) {
  const top = Object.entries(l).sort((a, b) => b[1] - a[1])[0];
  const uniq = Object.keys(l).length;
  console.log(f + ': uniq=' + uniq + ' top=' + (top ? top[0] + ' x' + top[1] : ''));
}
