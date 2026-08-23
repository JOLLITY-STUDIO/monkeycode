// 临时脚本：在 bank02 源码中定位 $05E8 缓冲消费段，用后删除
const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank02';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'latin1').split(/\r?\n/);
  lines.forEach((ln, i) => {
    if (/05E8|05E9|05EA|0628|0629/.test(ln)) console.log(f + ':' + (i + 1) + ': ' + ln.trim());
  });
}
