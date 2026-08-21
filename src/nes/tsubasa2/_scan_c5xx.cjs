const fs = require('fs');
const path = require('path');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank30';
const targets = ['CB99', 'CB0F', 'CD7C', 'CE08', 'CDC9', 'CDE2', 'CB02'];
for (const f of fs.readdirSync(root)) {
  if (!f.endsWith('.s')) continue;
  const p = path.join(root, f);
  const lines = fs.readFileSync(p, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    // 行尾注释 "; $XXXX" 精确匹配
    for (const t of targets) {
      const m = ln.match(/;\s*\$([0-9A-F]{4})/i);
      if (m && m[1].toUpperCase() === t) {
        console.log(`\n===== ${f} line ${i + 1} 入口 $${t} =====`);
        const seg = lines.slice(i, Math.min(lines.length, i + 30));
        seg.forEach((s, k) => console.log(`${i + k + 1}| ${s}`));
        break;
      }
    }
  }
}
