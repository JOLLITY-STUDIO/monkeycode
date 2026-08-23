// 查 bank30 中 $CB6C 附近内容 (运行时 $C000-$DFFF 固定映射)
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'asm', 'bank30');
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.s')) continue;
  const p = path.join(dir, f);
  const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('CB6C')) {
      console.log(`=== ${f}:${i + 1} ===`);
      for (let j = Math.max(0, i - 10); j < Math.min(lines.length, i + 40); j++) {
        console.log(`${j + 1}|${lines[j]}`);
      }
      console.log('');
    }
  }
}
