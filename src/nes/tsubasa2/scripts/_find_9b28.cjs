// 临时：定位 $9B28/$9B5E 定义并输出上下文
const fs = require('fs');
const s = fs.readFileSync('src/asm/bank00/code_sub.s', 'utf8');
const ls = s.split(/\r?\n/);
ls.forEach((l, i) => {
  if (l.includes('9B28') || l.includes('9B5E')) {
    console.log(`${i + 1}: ${l}`);
  }
});
