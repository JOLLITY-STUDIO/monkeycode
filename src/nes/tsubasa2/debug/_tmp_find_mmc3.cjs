const fs = require('fs');
const path = require('path');
const root = __dirname + '/..';
const skip = new Set(['node_modules', '.git', 'dist', '_tmp_bzk_out', '_verify_mmc3_out', '_test_out', 'output', 'docs', 'asm', 'tools', 'mini-audio']);
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { if (!skip.has(f)) walk(p); continue; }
    if (/\.(ts|js|json|wxml|wxss)$/.test(f)) {
      const c = fs.readFileSync(p, 'utf8');
      if (c.includes('_verify_mmc3')) console.log(p);
    }
  }
}
walk(root);
