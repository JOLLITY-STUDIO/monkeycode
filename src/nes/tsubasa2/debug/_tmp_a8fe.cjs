// 扫描 bank02 反汇编，找到 $88FE（运行时 $A8FE）入口上下文
const fs = require('fs');
const path = require('path');

const files = ['_full.s', 'code_main.s', 'code_sub.s', 'code_data.s', 'data_tables.s'];
const dir = path.join(__dirname, '..', 'asm', 'bank02');

for (const f of files) {
  const p = path.join(dir, f);
  if (!fs.existsSync(p)) continue;
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/\$88FE/);
    if (m) {
      console.log(`=== ${f}:${i + 1} ===`);
      for (let j = Math.max(0, i - 3); j < Math.min(lines.length, i + 60); j++) {
        console.log(`${j + 1}|${lines[j]}`);
      }
      console.log('');
    }
  }
}
