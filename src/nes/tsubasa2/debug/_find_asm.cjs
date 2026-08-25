// 在 asm 中搜索地址/指令模式
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'src', 'asm');
const pats = process.argv.slice(2);
const out = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.s')) {
      const c = fs.readFileSync(p, 'utf8');
      const lines = c.split('\n');
      lines.forEach((l, i) => {
        for (const pat of pats) {
          if (l.toLowerCase().includes(pat.toLowerCase())) {
            out.push(`${path.relative(ROOT, p)}:${i + 1}: ${l.trim()}`);
            break;
          }
        }
      });
    }
  }
}
walk(ROOT);
console.log(out.join('\n'));
