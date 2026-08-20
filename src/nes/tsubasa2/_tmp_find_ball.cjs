// 临时: 查找比赛球渲染 tile 常量
const fs = require('fs');
const p = require('path');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const fp = p.join(d, f);
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (f.endsWith('.ts')) {
      const t = fs.readFileSync(fp, 'utf8');
      if (/ballSprite|ballTile|BALL_TILE|ballX|drawBall|ballPal/i.test(t)) {
        console.log('FILE:', fp);
        t.split('\n').forEach((l, i) => {
          if (/ballSprite|ballTile|BALL_TILE|ballX|drawBall|ballPal/i.test(l)) {
            console.log('  ' + String(i + 1).padStart(4) + '|' + l.trim());
          }
        });
      }
    }
  }
}
walk('src/game');
