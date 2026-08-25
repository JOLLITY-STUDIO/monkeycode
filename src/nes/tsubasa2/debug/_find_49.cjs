// 搜 emu log 中 STA $0049 及相关写 $0049 的行
const fs = require('fs');
const log = fs.readFileSync('docs/roms/opening-all/opening-all.log', 'utf8');
const lines = log.split(/\r?\n/);
let hits = 0;
for (let i = 0; i < lines.length; i++) {
  if (/STA \$0049/.test(lines[i]) || /49 00/.test(lines[i]) || /0049 = #/.test(lines[i])) {
    console.log('L' + (i + 1) + ': ' + lines[i].slice(0, 160));
    if (++hits >= 8) break;
  }
}
if (!hits) {
  // 退化：搜所有写 $0049 模式（$49 地址操作）
  console.log('无 STA $0049 直接命中，搜索 @ $0049 写：');
  let n = 0;
  for (let i = 0; i < lines.length && n < 8; i++) {
    if (/@ \$0049 = #\$/.test(lines[i])) { console.log(lines[i].slice(0, 160)); n++; }
  }
}
