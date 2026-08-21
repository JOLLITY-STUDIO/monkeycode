// 在 bank30 _full.s 中定位 $CB99 定义 (注释 ; $CB99)
const fs = require('fs');
const path = require('path');
const f = path.join(__dirname, 'asm', 'bank30', '_full.s');
const lines = fs.readFileSync(f, 'utf8').split('\n');
for (let i = 0; i < lines.length; i++) {
  if (/\$CB99\s*$|; \$CB99/.test(lines[i]) || /; \$CB[89]/.test(lines[i])) {
    console.log(`### 行 ${i + 1}: ${lines[i].trim()}`);
  }
}
// 也找 code_data.s
const f2 = path.join(__dirname, 'asm', 'bank30', 'code_data.s');
const lines2 = fs.readFileSync(f2, 'utf8').split('\n');
for (let i = 0; i < lines2.length; i++) {
  if (/\$CB99/.test(lines2[i])) {
    const from = Math.max(0, i - 3);
    const to = Math.min(lines2.length - 1, i + 45);
    console.log(`\n### code_data.s 命中 ${i + 1}`);
    for (let j = from; j <= to; j++) console.log(`${j + 1}: ${lines2[j].trim().slice(0, 130)}`);
  }
}
console.log('\n--- done ---');
