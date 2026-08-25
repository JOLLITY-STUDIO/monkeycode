// 在 bank02 反汇编里定位场景例程地址（宽松匹配）
const fs = require('fs');
const path = require('path');
const dir = 'src/asm/bank02';
const targets = ['A4C0', 'A559', 'A57B', 'A581', 'A5A2', 'A5A8', 'A5B0', 'A5B8', 'A5BF', 'A5CD', 'A5DB', 'A5E8', 'A602', 'A61C', 'A629', 'A650', 'A69C', 'A77A', 'A782', 'A78D', 'A7BD', 'A7CE', 'A7D6', 'A7FA'];
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    for (const t of targets) {
      if (line.indexOf(t) !== -1) {
        console.log(`${f}:${i + 1}: ${line.trim()}`);
        break;
      }
    }
  });
}
