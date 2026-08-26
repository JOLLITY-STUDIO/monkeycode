const fs = require('fs');
const path = require('path');
const hits = [];
function walk(dir, ext) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['node_modules', 'dist', 'output'].includes(e.name)) walk(p, ext); }
    else if (e.name.endsWith(ext)) {
      const t = fs.readFileSync(p, 'utf8');
      if (/字符|仮名|假名|CharMap|char.?map|charTable|char.?table|TextChar|文本/.test(t)) hits.push(p);
    }
  }
}
walk('docs', '.md');
walk('src/game/prg', '.ts');
console.log(hits.join('\n'));
