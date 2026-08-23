// 扫描 bank30 关键地址（$CEFE/$C400/$A203/$A200 场景分发）
const fs = require('fs');
for (const b of ['bank30', 'bank31']) {
  const dir = `src/asm/${b}`;
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.s')) continue;
    const t = fs.readFileSync(`${dir}/${f}`, 'utf8');
    const lines = t.split(/\r?\n/);
    lines.forEach((l, i) => {
      if (/;\s*\$((CEFE|C400|A203|A200|C421|8486|A491))/.test(l)) {
        console.log(`${b}/${f}:${i + 1}: ${l.trim()}`);
      }
    });
  }
}
