const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/_full_disasm.asm', 'utf8').split(/\r?\n/);
// 打印几个不同格式的行样本
let n = 0;
for (const line of lines) {
  if (line.includes('0x000AA0') || line.includes('0x001B38') || line.includes('0x002010')) {
    console.log(JSON.stringify(line));
    if (++n > 6) break;
  }
}
// 统计常见模式
let pat1 = 0, pat2 = 0;
for (const line of lines) {
  if (/^0x[0-9A-F]{6} \$[0-9A-F]{4}:/.test(line)) pat1++;
  if (/ 0x[0-9A-F]{6} 0?0:[0-9A-F]{4}:/ .test(line)) pat2++;
}
console.log('pat1', pat1, 'pat2', pat2);
