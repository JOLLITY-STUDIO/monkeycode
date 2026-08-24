// 临时：在 bank00/bank02 全目录搜索子程序定义
const fs = require('fs');
const path = require('path');
const targets = ['88CA', '8895', '8920', '8976', 'AC6D', 'AC71', '9E36', '9E7C', '9F89', '9F96'];
for (const dir of ['src/asm/bank00', 'src/asm/bank02']) {
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.s'))) {
    const ls = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
    ls.forEach((l, i) => {
      const m = l.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/);
      if (m && targets.includes(m[1].toUpperCase())) {
        console.log(`>>> ${dir}/${f} line ${i + 1}: $${m[1].toUpperCase()}`);
      }
    });
  }
}
// 同时 dump 每个目标定义上下文
for (const dir of ['src/asm/bank00', 'src/asm/bank02']) {
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.s'))) {
    const ls = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
    const idx = {};
    ls.forEach((l, i) => { const m = l.match(/;\s*\$([0-9A-Fa-f]{4})\s*$/); if (m) idx[m[1].toUpperCase()] = i; });
    for (const t of targets) {
      const i = idx[t];
      if (i !== undefined) {
        console.log(`\n===== ${dir}/${f} $${t} @line ${i + 1} =====`);
        console.log(ls.slice(i, i + 30).join('\n'));
      }
    }
  }
}
