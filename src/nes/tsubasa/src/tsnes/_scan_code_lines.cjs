// 扫描 bank_01.asm 中 2840 行之后的代码行 (以 C 开头)
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
let count = 0;
for (let i = 2840; i < lines.length; i++) {
  const line = lines[i];
  if (/^C /.test(line) || /^C\t/.test(line)) {
    count++;
    if (count <= 120) console.log(`${i + 1}: ${line}`);
  }
}
console.log(`\n=== 代码行总数 (2840 之后): ${count}`);
