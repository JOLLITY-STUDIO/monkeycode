const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 用 node 直接遍历 src 下所有 ts 文件搜索
function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      walk(p, out);
    } else if (/\.ts$/.test(e.name)) {
      out.push(p);
    }
  }
  return out;
}
const files = walk('src', []);
for (const f of files) {
  const s = fs.readFileSync(f, 'utf8');
  const lines = s.split('\n');
  lines.forEach((l, i) => {
    if (/setMirroring|HORIZONTAL_MIRRORING|VERTICAL_MIRRORING|Mirroring\./.test(l)) {
      console.log(`${f}:${i + 1}: ${l.trim().slice(0, 160)}`);
    }
  });
}
