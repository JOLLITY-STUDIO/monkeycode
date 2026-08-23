// 扫描 asm 中 joypad 读取 ($4016) 与 $001E 输入状态缓冲写入
const fs = require('fs');
const path = require('path');
const asmDir = path.join(__dirname, '..', 'asm');
const files = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.s')) files.push(p);
  }
}
walk(asmDir);
const hits = [];
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  lines.forEach((ln, i) => {
    if (ln.trim().startsWith(';')) return;
    if (/\$4016|\$4017/i.test(ln) || /00(?:1D|1E)\b/i.test(ln)) {
      const m = ln.match(/; \$([0-9A-F]{4})\s*$/);
      const addr = m ? m[1] : '????';
      hits.push(`${path.relative(asmDir, f)}:${i + 1} [$${addr}] ${ln.trim()}`);
    }
  });
}
console.log('=== $4016/$4017 or $001D/$001E refs ===');
console.log(hits.join('\n'));
console.log('total:', hits.length);
