/* 临时: 扫描 asm 目录中 JSR $C509 的所有调用方 */
const fs = require('fs');
const path = require('path');
const dir = 'asm';
const hits = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.s')) {
      const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
      lines.forEach((l, i) => {
        if (l.includes('JSR $C509')) hits.push(`${p}:${i + 1}: ${l.trim()}`);
      });
    }
  }
}
walk(dir);
console.log(hits.length ? hits.join('\n') : '(no JSR $C509 calls)');
