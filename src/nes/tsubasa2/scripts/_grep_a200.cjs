// 临时脚本：在 bank02 源码中定位 A200 附近代码，用后删除
const fs = require('fs');
const path = require('path');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/asm/bank02';
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.s'))) {
  const ls = fs.readFileSync(path.join(dir, f), 'latin1').split(/\r?\n/);
  ls.forEach((l, i) => {
    if (/A19[0-9A-F]|A20[0-9A-F]|A21[0-9A-F]/.test(l) && /;\s*\$A/.test(l)) {
      console.log(f + ':' + (i + 1) + ': ' + l.trim());
    }
  });
}
