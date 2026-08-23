// grep bank30 code_main.s 定位 $C775 主渲染 NMI 的滚动与调色板来源
const fs = require('fs');
const path = require('path');
const file = fs.readFileSync(path.join(__dirname, '..', 'src', 'asm', 'bank30', 'code_main.s'), 'utf8');
const lines = file.split(/\r?\n/);
const pats = [/\$C775/, /\$C7B7/, /\$0044/, /\$007A/, /\$007B/, /\$004A/, /\$004B/, /\$0538/, /\$062A/, /\$063A/, /\$C8FB/, /\$C78B/, /\$C76E/, /\$C421/];
for (let i = 0; i < lines.length; i++) {
  for (const p of pats) {
    if (p.test(lines[i])) {
      const from = Math.max(0, i - 3);
      const to = Math.min(lines.length - 1, i + 6);
      console.log(`--- ${p.source} @ line ${i + 1} ---`);
      for (let j = from; j <= to; j++) console.log(lines[j]);
      console.log('');
      break;
    }
  }
}
