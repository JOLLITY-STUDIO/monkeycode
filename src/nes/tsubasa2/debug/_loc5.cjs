// 定位 bank00 $9071/$9076 函数及读 $0049 上下文
const fs = require('fs');
const t = fs.readFileSync('src/asm/bank00/_full.s', 'utf8').split(/\r?\n/);
t.forEach((l, i) => {
  if (/; \$9071|; \$9076|; \$90D4|; \$8BAE|; \$8BAB/.test(l)) console.log((i + 1) + ': ' + l.trim());
});
