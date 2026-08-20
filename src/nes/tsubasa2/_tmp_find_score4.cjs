// 1) bank24 HUD 比分显示读哪个键; 2) 全 src 搜 score_home/score_away 分布; 3) asm 中比分地址线索
const fs = require('fs');
const path = require('path');
const base = __dirname;

console.log('===== score_home / score_away 分布 =====');
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.ts')) {
      const t = fs.readFileSync(p, 'utf8');
      const n = (t.split('score_home').length - 1) + (t.split('score_away').length - 1);
      if (n) console.log(`  ${n}x ${p.replace(base, '')}`);
    }
  }
}
walk(path.join(base, 'src'));

console.log('===== bank24 中 score/goal 相关行 =====');
const hud = fs.readFileSync(path.join(base, 'src/game/service/bank24_hud.service.ts'), 'utf8');
let n = 0;
for (const line of hud.split('\n')) {
  if (/(score|goal|00E4|00E5|00E6|00E7)/i.test(line)) {
    const s = line.trim();
    if (s && !s.startsWith('*') && s.length < 200) {
      console.log('  ' + s.slice(0, 150));
      if (++n > 40) break;
    }
  }
}
