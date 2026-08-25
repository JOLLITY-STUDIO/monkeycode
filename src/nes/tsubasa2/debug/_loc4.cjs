// 搜 STA $0049 赋值点（bank00 + bank02）
const fs = require('fs');
const path = require('path');
const files = ['src/asm/bank00/_full.s', 'src/asm/bank02/code_sub.s', 'src/asm/bank02/code_main.s', 'src/asm/bank02/code_data.s'];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  t.forEach((l, i) => {
    if (/STA \$0049|LDA #\$\w+\s*; \$\w+\s*$/.test(l) && /STA \$0049|#\$/.test(l)) {
      const m = l.match(/STA \$0049/);
      if (m) console.log(f + ':' + (i + 1) + ': ' + l.trim());
    }
  });
}
// 也搜邻近（STA $0049 前一行的 LDA）
console.log('--- context STA $0049 ---');
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const t = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  t.forEach((l, i) => {
    if (/STA \$0049/.test(l)) {
      const from = Math.max(0, i - 3);
      for (let j = from; j <= i; j++) console.log(f + ':' + (j + 1) + ': ' + t[j].trim());
      console.log('---');
    }
  });
}
