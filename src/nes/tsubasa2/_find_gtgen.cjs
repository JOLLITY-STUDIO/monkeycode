const fs = require('fs');
const path = require('path');
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) {
      if (['node_modules', 'dist', 'dist-cjs', 'dist-cjs2', '.git', 'output', 'docs'].includes(e.name)) continue;
      walk(f);
    } else if (/\.ts$|\.cjs$/.test(e.name)) {
      try {
        const c = fs.readFileSync(f, 'utf8');
        if (/OpeningFrameTable|opening-frame-table|cvt\s*:/.test(c)) console.log(f);
      } catch (x) {}
    }
  }
}
walk('scripts');
