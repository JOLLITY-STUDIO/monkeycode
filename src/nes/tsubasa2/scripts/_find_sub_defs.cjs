// 全 asm 目录搜索子程序"定义"（行尾地址注释 == 目标地址）
// 用法: node scripts/_find_sub_defs.cjs
const fs = require('fs');
const path = require('path');
const targets = ['890C', '8920', '8AF7', '9A0D', '99F0', '98EA', '9B7F', '9FA8', '9A35', '98A0', '88FB', '9A43', '9B91', '9F69', '9F89', '9F96', 'A1CB', 'AA06', 'AA20', 'AA36', 'A82F', 'A72C', '9B28', '9B5E', 'A767', 'A655'];
const root = path.join(__dirname, '..', 'src', 'asm');
for (const bank of fs.readdirSync(root)) {
  const bdir = path.join(root, bank);
  if (!fs.statSync(bdir).isDirectory()) continue;
  for (const f of fs.readdirSync(bdir)) {
    if (!f.endsWith('.s')) continue;
    const lines = fs.readFileSync(path.join(bdir, f), 'utf8').split(/\r?\n/);
    lines.forEach((l, i) => {
      const m = l.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
      if (m && targets.includes(m[1].toUpperCase())) {
        console.log(`${bank}/${f}:${i + 1}: [$${m[1].toUpperCase()}] ${l.trim()}`);
      }
    });
  }
}
