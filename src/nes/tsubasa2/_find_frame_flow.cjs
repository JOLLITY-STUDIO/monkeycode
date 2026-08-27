const fs = require('fs');
function walk(d, depth) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = d + '/' + e.name;
    if (e.isDirectory()) {
      if (['node_modules', 'dist', 'dist-cjs', 'dist-cjs2', '.git', 'output', 'docs', 'rom-data'].includes(e.name)) continue;
      walk(f, depth + 1);
    } else if (/\.ts$/.test(e.name)) {
      const c = fs.readFileSync(f, 'utf8');
      if (/\bapplyNtToPpu\b/.test(c) || /renderCommit/.test(c)) {
        console.log(f);
      }
    }
  }
}
walk('src/game', 0);
