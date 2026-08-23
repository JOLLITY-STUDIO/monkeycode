// 在 _full.s 里找 $88E0-$8900 区间的行号
const fs = require('fs');
const path = require('path');
const lines = fs.readFileSync(path.join(__dirname, '..', 'asm', 'bank02', '_full.s'), 'utf8').split(/\r?\n/);
// 打印所有含 $88F 或 $A8F 或 $8FE 的行及其上下文
for (let i = 0; i < lines.length; i++) {
  if (/\$88F|\$A8F|\$8FE|A8FE|88FE/.test(lines[i])) {
    console.log(`--- ${i + 1} ---`);
    for (let j = Math.max(0, i - 5); j < Math.min(lines.length, i + 50); j++) {
      console.log(`${j + 1}|${lines[j]}`);
    }
    console.log('');
  }
}
