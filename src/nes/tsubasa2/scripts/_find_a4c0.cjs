// 定位 bank02 中 A4C0/A559/A57B/A581/A491 等关键地址所在文件与行
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');
const targets = ['A4C0', 'A559', 'A57B', 'A581', 'A491', 'A200', 'A484', 'A855', 'A86E', 'A8CE'];
for (const f of fs.readdirSync(dir)) {
  const txt = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = txt.split(/\r?\n/);
  lines.forEach((l, i) => {
    for (const t of targets) {
      const m = l.match(new RegExp('\\$' + t + '\\b', 'i'));
      if (m) console.log(`${f}:${i + 1}: ${l.trim()}`);
    }
  });
}
