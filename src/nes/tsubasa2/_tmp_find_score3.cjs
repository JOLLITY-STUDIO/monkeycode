// 查找 scoreA/scoreB 应映射的真实 RAM 地址: 搜索 bank26/bank31 中 00E0-00E3 及 score 相关写入
const fs = require('fs');
const path = require('path');
const files = [
  'src/game/service/bank26_match.service.ts',
  'src/game/service/bank31_match.service.ts',
  'src/game/service/bank24_hud.service.ts',
  'src/game/service/bank00/bank00_core.service.ts',
];
const base = __dirname;
for (const rel of files) {
  const p = path.join(base, rel);
  if (!fs.existsSync(p)) { console.log('MISSING', rel); continue; }
  const t = fs.readFileSync(p, 'utf8');
  const lines = t.split('\n');
  console.log(`===== ${rel} =====`);
  let n = 0;
  for (const line of lines) {
    if (/(00E0|00E1|00E2|00E3|00E4|score|goal)/i.test(line)) {
      const s = line.trim();
      if (s && !s.startsWith('*')) {
        console.log('  ' + s.slice(0, 160));
        if (++n > 50) { console.log('  ...'); break; }
      }
    }
  }
  if (!n) console.log('  (none)');
}
