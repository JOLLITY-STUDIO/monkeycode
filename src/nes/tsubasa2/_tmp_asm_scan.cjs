// 临时脚本4: 扫描 code_render.s $9148-$9201 场景初始化 + $94C1-$94D2 NT 写入
const fs = require('fs');
const lines = fs.readFileSync('asm/bank00/code_render.s', 'utf8').split(/\r?\n/);
let inRange = false;
lines.forEach((l, i) => {
  const m = l.match(/; \$(\d{4})/);
  if (m) {
    const a = parseInt(m[1], 16);
    if (a >= 0x9148 && a <= 0x94d5) inRange = true;
    else inRange = false;
  }
  if (inRange) console.log((i + 1) + ': ' + l);
});
