const fs = require('fs');
const path = require('path');
const kws = ['PaletteTable', 'PaletteEntry', 'PaletteColor', 'spriteAttrToPalette', 'chr-slot-mapper', 'export interface Palette', 'export type Palette'];
const hits = {};
kws.forEach(k => hits[k] = []);
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) {
      if (!['node_modules', '.git', '_test_out', 'dist', 'pages', 'test', 'tmp-frames', 'scripts', 'tools', 'trace', 'asm'].includes(e.name)) walk(p);
    } else if (e.name.endsWith('.ts')) {
      try {
        const s = fs.readFileSync(p, 'utf8');
        for (const k of kws) if (s.includes(k)) hits[k].push(p.replace(/\\/g, '/'));
      } catch (e) { }
    }
  }
}
walk('src');
for (const k of kws) {
  console.log('--- ' + k + ' (' + hits[k].length + ') ---');
  hits[k].slice(0, 10).forEach(h => console.log('  ' + h));
}
