// 查找 bank02 $A200 8 项 API 表的索引方式 / $A484 分发调用方 / 场景流转语义
const fs = require('fs');
const path = require('path');
const dirs = ['bank00', 'bank02', 'bank30', 'bank31'];
const pats = [/\$A200\b/, /\(.*A200/, /A200,/, /JMP \(/, /JSR \(\$/, /A212/, /A209/, /A20C/, /A206/, /A203/, /A20F/, /A215/, /A218/, /A21B/];
for (const dir of dirs) {
  const d = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/' + dir;
  if (!fs.existsSync(d)) continue;
  for (const f of fs.readdirSync(d).filter((x) => x.endsWith('.s'))) {
    const lines = fs.readFileSync(path.join(d, f), 'utf8').split(/\r?\n/);
    lines.forEach((l, i) => {
      const t = l.trim();
      if (pats.some((p) => p.test(t)) && !/\.byte|^\s*;/.test(t)) {
        console.log(`${dir}/${f}:${i + 1}  ${t}`);
      }
    });
  }
}
