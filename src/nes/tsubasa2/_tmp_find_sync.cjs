const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'src');
const out = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!['node_modules','_build'].includes(e.name)) walk(p); continue; }
    if (!/\.(ts|tsx)$/.test(e.name)) continue;
    const s = fs.readFileSync(p, 'utf8');
    const lines = s.split('\n');
    lines.forEach((l, i) => {
      if (/(palWriteAll|PpuSync|paletteRAM|syncPalette|writeOam|oamWrite|syncAll)/.test(l)) {
        out.push(`${path.relative(root, p)}:${i + 1}: ${l.trim()}`);
      }
    });
  }
}
walk(root);
console.log(out.join('\n'));
