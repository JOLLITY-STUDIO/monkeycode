// 临时：查找 $8486 分发器调用点
const fs = require('fs');
const dirs = ['bank00', 'bank02', 'bank30', 'bank31'];
for (const d of dirs) {
  const p = 'src/asm/' + d;
  if (!fs.existsSync(p)) continue;
  for (const f of fs.readdirSync(p).filter((x) => x.endsWith('.s'))) {
    const lines = fs.readFileSync(p + '/' + f, 'utf8').split(/\r?\n/);
    lines.forEach((l, i) => {
      if (/JSR\s+\$8486|JSR\s+\$A486|JMP\s+\$8486|JMP\s+\$A486|8486/.test(l) && !/^\s*;/.test(l)) {
        console.log(d + '/' + f + ' L' + i + ': ' + l.trim());
      }
    });
  }
}
