const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
const c = fs.readFileSync(root + '/asm/bank00/code_render.s', 'utf8');
const lines = c.split('\n');
// 找所有含 94C1 的行
lines.forEach((l, i) => {
  if (l.includes('94C1')) console.log((i + 1) + ': ' + l.trim());
});
console.log('===== 找 $94C1 附近 =====');
// 找 "94C1" 作为地址锚点的行 (格式 "; $94C1" 或 ".byte" 前的注释)
for (let i = 0; i < lines.length; i++) {
  if (/94C1/.test(lines[i]) && /;.*\$?94C1/.test(lines[i])) {
    console.log('anchor at ' + (i + 1));
    console.log(lines.slice(i - 3, i + 45).join('\n'));
    break;
  }
}
