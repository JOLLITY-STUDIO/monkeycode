// 扫描 bank02 关键地址（$A203/$8486/$A200/$A491 场景分发）
const fs = require('fs');
const dir = 'src/asm/bank02';
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const t = fs.readFileSync(`${dir}/${f}`, 'utf8');
  const lines = t.split(/\r?\n/);
  lines.forEach((l, i) => {
    if (l.includes('; $A203') || l.includes('; $8486') || l.includes('; $A200') || l.includes('; $A491') || l.includes('; $CEFE') || l.includes('; $C400')) {
      console.log(`${f}:${i + 1}: ${l.trim()}`);
    }
  });
}
