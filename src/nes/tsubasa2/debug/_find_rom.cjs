const fs = require('fs');
function walk(d, depth) {
  if (depth > 5) return;
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = d + '/' + e.name;
    if (e.isDirectory()) {
      if (e.name === 'node_modules') continue;
      try { walk(p, depth + 1); } catch (_) {}
    } else if (/\.nes$/i.test(e.name)) {
      try {
        const sz = fs.statSync(p).size;
        console.log(p + ' (' + sz + ' bytes)');
      } catch (_) {}
    }
  }
}
walk('d:/studio/github/monkeycode', 0);
