// 简单 grep 工具：node debug/_grep.cjs <dir> <pattern> [context]
const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
const pattern = process.argv[3];
const ctx = parseInt(process.argv[4] || '0', 10);
const re = new RegExp(pattern, 'i');
function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) r = r.concat(walk(p));
    else if (f.endsWith('.s')) r.push(p);
  }
  return r;
}
for (const f of walk(dir)) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (re.test(l)) {
      console.log('--- ' + f.replace(/\\/g, '/') + ':' + (i + 1));
      for (let j = Math.max(0, i - ctx); j <= Math.min(lines.length - 1, i + ctx); j++) {
        console.log('   ' + lines[j]);
      }
    }
  });
}
