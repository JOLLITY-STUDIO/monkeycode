const fs = require('fs');
const path = require('path');
const hits = [];
function walk(dir, ext) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!['node_modules', 'dist', 'output'].includes(e.name)) walk(p, ext);
    } else if (e.name.endsWith(ext)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/浊音|半浊|0x94|0x95|\$94|\$95/.test(t)) hits.push(p);
    }
  }
}
walk('docs', '.md');
walk('src/asm', '.s');
console.log(hits.join('\n'));
