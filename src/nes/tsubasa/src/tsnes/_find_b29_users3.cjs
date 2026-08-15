/** 查看 bank_30 中 MMC3 切换上下文 */
const fs = require('fs');
const t = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
let shown = 0;
for (let i = 0; i < t.length && shown < 10; i++) {
  if (/STA\s+\$(?:A000|8000|8001)/i.test(t[i])) {
    console.log('--- L' + (i + 1) + ' ---');
    console.log(t.slice(Math.max(0, i - 6), i + 3).join('\n'));
    shown++;
  }
}
