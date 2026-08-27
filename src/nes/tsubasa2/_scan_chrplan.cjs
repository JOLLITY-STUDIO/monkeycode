// 临时:扫描 opening-tecmo-start.ts 的 CHR plan (c:) 数据
const fs = require('fs');
const s = fs.readFileSync('src/game/prg/data/scene/opening/opening-tecmo-start.ts', 'utf8');
const lines = s.split('\n');
console.log('total lines:', lines.length);
let show = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('c:')) {
    show++;
    if (show <= 30) console.log((i + 1) + ': ' + l.trim().slice(0, 220));
  }
}
console.log('c: matches:', show);
