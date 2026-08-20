// 查找比赛相关服务中比分/球/时钟相关的 ram_XXXX 键
const fs = require('fs');
const path = require('path');
const files = [
  'src/game/service/bank26_match.service.ts',
  'src/game/service/bank31_match.service.ts',
  'src/game/service/bank20_match-aux.service.ts',
  'src/game/service/bank11_match-turn.service.ts',
  'src/game/service/bank24_hud.service.ts',
  'src/game/service/bank00/bank00_core.service.ts',
];
const base = __dirname;
for (const rel of files) {
  const p = path.join(base, rel);
  if (!fs.existsSync(p)) { console.log('MISSING', rel); continue; }
  const t = fs.readFileSync(p, 'utf8');
  const hits = [];
  for (const line of t.split('\n')) {
    if (/ram_00[0-9A-F]{2}'/.test(line) && /(score|goal|point|ball|owner|gooo|得|分|球)/i.test(line)) {
      hits.push(line.trim());
    }
  }
  console.log(`== ${rel} (${hits.length}) ==`);
  for (const h of hits.slice(0, 40)) console.log('  ' + h.slice(0, 140));
}
