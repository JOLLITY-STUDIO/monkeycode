// 临时脚本3: 扫描 code_render.s $9085-$9148 / $94C1-$94D2 完整 asm
const fs = require('fs');
const lines = fs.readFileSync('asm/bank00/code_render.s', 'utf8').split(/\r?\n/);
let start = -1;
lines.forEach((l, i) => {
  if (/; \$9085/.test(l)) start = i;
});
if (start < 0) {
  // 按地址行号定位
  lines.forEach((l, i) => {
    const m = l.match(/; \$9(\d{3})/);
    if (m && m[1] >= '085' && m[1] <= '150') {
      console.log((i + 1) + ': ' + l);
    }
  });
} else {
  for (let j = start; j <= Math.min(lines.length - 1, start + 120); j++) {
    console.log((j + 1) + ': ' + lines[j]);
  }
}
