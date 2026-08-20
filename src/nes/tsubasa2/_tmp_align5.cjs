// 搜索 TS 中 ram_005E/ram_0072/BASE_0454 的使用
const fs = require('fs');
const path = require('path');

function grepFiles(dir, patterns, ctx = 4) {
  const files = [];
  (function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      if (ent.isDirectory()) walk(path.join(d, ent.name));
      else if (ent.name.endsWith('.ts')) files.push(path.join(d, ent.name));
    }
  })(dir);

  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8').split(/\r?\n/);
    for (let i = 0; i < src.length; i++) {
      for (const p of patterns) {
        if (src[i].includes(p)) {
          console.log(`\n### ${path.relative(__dirname, f)} : ${p} (line ${i + 1})`);
          for (let j = Math.max(0, i - ctx); j <= Math.min(src.length - 1, i + ctx); j++) {
            console.log(`  ${String(j + 1).padStart(4)}| ${src[j]}`);
          }
          break;
        }
      }
    }
  }
}

grepFiles(path.join(__dirname, 'src', 'game'), ['ram_005E', 'ram_0072', 'BASE_0454']);
