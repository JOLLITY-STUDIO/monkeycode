const fs = require('fs');
const path = require('path');
const pattern = /currentScroll|getCurrentScene|currentScene|register.*Scene/;
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'dist-cjs', 'dist-cjs2'].includes(f.name)) continue;
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.ts$/.test(f.name)) {
      const c = fs.readFileSync(p, 'utf8');
      if (pattern.test(c)) {
        // 只打印 system/boot/router 相关
        if (/router|BootRouter|system/i.test(p) || /currentScroll/.test(c)) console.log(p);
      }
    }
  }
}
walk('src');
