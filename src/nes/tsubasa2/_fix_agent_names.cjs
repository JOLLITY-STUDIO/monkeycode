const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '.codebuddy', 'agents');

// 1) 修复文件名: 真实换行 或 字面 '\n' 都移除
let renamed = 0;
for (const f of fs.readdirSync(dir)) {
  const clean = f.replace(/\n/g, '').replace(/\\n/g, '');
  if (clean !== f) {
    if (fs.existsSync(path.join(dir, clean))) {
      console.log('[CONFLICT]', JSON.stringify(f));
    } else {
      fs.renameSync(path.join(dir, f), path.join(dir, clean));
      console.log('[RENAME]', JSON.stringify(f), '->', JSON.stringify(clean));
      renamed++;
    }
  }
}

// 2) 修复 frontmatter: 字面 '\n' -> 真实换行, 合并 name: 跨行值
let fixed = 0;
for (const f of fs.readdirSync(dir)) {
  const full = path.join(dir, f);
  if (!fs.statSync(full).isFile()) continue;
  let txt = fs.readFileSync(full, 'utf8');
  if (!txt.includes('\\n')) continue;
  const before = txt;
  // frontmatter 块
  const fm = txt.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    let body = fm[1];
    // 字面 '\n' -> 真实换行
    body = body.replace(/\\n/g, '\n');
    // 合并 name: 跨行 (name: X 后紧跟无冒号的续行)
    body = body.replace(/^(name:\s*)([^\n]*)(?:\n([^\n]+))?(?=\n[a-zA-Z_]+:|$)/m,
      (mm, pre, g2, g3) => pre + (g2.trim() + (g3 ? g3.trim() : '')).replace(/[\u0000-\u001f\u007f]/g, ''));
    txt = txt.replace(fm[1], body);
  }
  if (txt !== before) {
    fs.writeFileSync(full, txt, 'utf8');
    console.log('[FIX]', JSON.stringify(f));
    fixed++;
  }
}
console.log('renamed:', renamed, 'fixed:', fixed);
