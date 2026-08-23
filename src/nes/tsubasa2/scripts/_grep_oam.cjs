// 临时脚本：读取 bank02 $80AF 段 和 bank30 $C9C5 段
const fs = require('fs');
function show(file, anchor, before, after) {
  const c = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const i = c.findIndex((l) => l.includes(anchor));
  if (i < 0) { console.log(`${file} ${anchor} NOT FOUND`); return; }
  console.log(`=== ${file} ${anchor} ===`);
  c.slice(Math.max(0, i - before), i + after).forEach((l, j) =>
    console.log(String(Math.max(0, i - before) + j + 1) + ': ' + l));
}
show('src/asm/bank02/code_main.s', '; $80AF', 2, 30);
show('src/asm/bank30/code_main.s', '; $C9C5', 2, 30);
