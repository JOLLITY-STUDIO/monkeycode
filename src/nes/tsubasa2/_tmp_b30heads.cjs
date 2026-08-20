const fs = require('fs');
// 打印每个文件的头部 60 行和关键地址附近
function head(f, n, startLine) {
  const s = fs.readFileSync('asm/bank30/' + f, 'utf8');
  const lines = s.split('\n');
  console.log('=== ' + f + ' (lines ' + lines.length + ') head ===');
  lines.slice(startLine || 0, (startLine || 0) + n).forEach((l, i) => console.log(String((startLine||0)+i+1).padStart(4) + ': ' + l));
}
head('code_sub.s', 80, 0);
