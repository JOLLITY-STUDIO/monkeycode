// 在 _tmp_bzk_out 反汇编中查找比分 RAM 地址 (INC/ADC/STA 到零页的得分地址)
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out');
const hits = [];
function walk(d) {
  let list;
  try { list = fs.readdirSync(d); } catch (e) { return; }
  for (const f of list) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.asm') || f.endsWith('.txt')) {
      const t = fs.readFileSync(p, 'utf8');
      const lines = t.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        // INC/ADC/STA 到 $00E4-$00E7 或 $0639/$063B 之类
        if (/(INC|ADC|STA|LDA|CLC)\s+\$00E[4-7]\b/.test(l) || /(INC|ADC|STA)\s+\$(00E4|00E5|00E6|00E7)\b/.test(l)) {
          hits.push({ f: p.replace(dir, ''), line: i + 1, text: l.trim().slice(0, 100) });
        }
      }
    }
  }
}
walk(dir);
console.log(`hits: ${hits.length}`);
for (const h of hits.slice(0, 60)) console.log(`  ${h.f}:${h.line}  ${h.text}`);
