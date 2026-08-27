// 扫描 OpeningFrameTable 标题帘幕段 (f3700-f3800) 的 scroll 数据
const fs = require('fs');
const t = fs.readFileSync('src/game/prg/data/scene/OpeningFrameTable.ts', 'utf8');
const re = /{f:(\d+),c:\[.*?\],p:(?:null|\{[^}]*\}),o:\[.*?\],n:\[.*?\],a:\[.*?\],s:\{([^}]+)\}\}/gs;
let m;
const rows = [];
while ((m = re.exec(t)) !== null) {
  const f = parseInt(m[1], 10);
  if (f >= 3700 && f <= 3810) {
    rows.push('f' + f + ' s:{' + m[2].replace(/\s+/g, ' ') + '}');
  }
}
console.log(rows.join('\n'));
