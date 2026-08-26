const fs = require('fs');
const path = require('path');
const root = 'dist-cjs2';
if (!fs.existsSync(root)) { console.log('NO dist-cjs2'); process.exit(0); }
const hits = [];
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.js')) hits.push(p);
  }
}
walk(root);
console.log('total js:', hits.length);
for (const h of hits.slice(0, 20)) console.log(h);
const keys = ['HeadlessRuntime', 'OpeningSceneController', 'OpeningFrameTable', 'ppu/index', 'tile.js', 'nametable'];
for (const k of keys) {
  console.log(k, ':', hits.filter(h => h.includes(k)).slice(0, 3));
}
