const fs = require('fs');
const s = fs.readFileSync('_tmp_bzk_out/_full_disasm.asm', 'utf8');
const lines = s.split(/\r?\n/);
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('00:8000')) {
    console.log('line', i, JSON.stringify(lines[i]));
    break;
  }
}
// 打印第 1000-1020 行附近结构
console.log('--- sample ---');
for (let i = Math.min(2000, lines.length - 1); i < Math.min(2010, lines.length); i++) {
  console.log(i, lines[i]);
}
