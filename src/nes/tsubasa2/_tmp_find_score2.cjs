// 全量列出 bank26/bank31/bank20 中 ram_XXXX 键定义 + score/goal 相关代码行
const fs = require('fs');
const path = require('path');
const files = [
  'src/game/service/bank26_match.service.ts',
  'src/game/service/bank31_match.service.ts',
  'src/game/service/bank20_match-aux.service.ts',
];
const base = __dirname;
for (const rel of files) {
  const p = path.join(base, rel);
  if (!fs.existsSync(p)) { console.log('MISSING', rel); continue; }
  const t = fs.readFileSync(p, 'utf8');
  const lines = t.split('\n');
  console.log(`===== ${rel} (${lines.length} lines) =====`);
  // 键定义
  const defs = [];
  for (const line of lines) {
    const m = line.match(/(?:KEY_\w+\s*=\s*|')(ram_[0-9A-Fa-f]{4})(?:')?/);
    if (m) defs.push(m[1].toUpperCase());
  }
  console.log(`-- ram keys used (${new Set(defs).size} unique): ${[...new Set(defs)].sort().join(', ')}`);
  // score/goal/point/ball 相关行
  let n = 0;
  for (const line of lines) {
    if (/(score|goal|point|ball|OWN|owner|得|分|球|GOAL)/i.test(line) && line.includes('ram_')) {
      console.log('  ' + line.trim().slice(0, 150));
      if (++n > 60) { console.log('  ... truncated'); break; }
    }
  }
  if (!n) console.log('  (no score/goal/ball ram lines)');
}
