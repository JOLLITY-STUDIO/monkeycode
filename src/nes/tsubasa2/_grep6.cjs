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
const pats = ['flushPalette', 'imgPalette', 'paletteRAM', 'writePalette'];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  for (const p of pats) {
    const idx = t.indexOf(p);
    if (idx >= 0) {
      console.log(f + ' :: ' + p + ' @ ' + t.slice(Math.max(0, idx - 60), idx + 80).replace(/\n/g, ' | '));
      break;
    }
  }
}
