// 搜索 asm 中所有向音频请求队列 $0700 写入的代码
const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm';

function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = path.join(d, f);
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (f.endsWith('.s')) {
      const lines = fs.readFileSync(fp, 'utf8').split(/\r?\n/);
      lines.forEach((l, i) => {
        if (/STA\s+\$0700/.test(l)) {
          console.log(fp.replace(root, '') + ':' + (i + 1) + '  ' + l.trim());
        }
      });
    }
  }
}
walk(root);
