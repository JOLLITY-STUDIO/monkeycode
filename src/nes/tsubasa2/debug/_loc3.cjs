// 定位 bank00 工具函数行号
const fs = require('fs');
const t = fs.readFileSync('src/asm/bank00/_full.s', 'utf8').split(/\r?\n/);
const targets = ['890C', '88FB', '9B07', '9AB8', '9ADA', '98EA', '9B7F', '9FA8', '8920', '9A71', '9AA2', '9B28', '9B5E'];
t.forEach((l, i) => {
  for (const tg of targets) {
    if (new RegExp('; \\$' + tg + '\\b').test(l)) {
      console.log((i + 1) + ': ' + l.trim());
      break;
    }
  }
});
