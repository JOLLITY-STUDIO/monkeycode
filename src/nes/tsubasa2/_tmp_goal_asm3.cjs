// 全 _tmp_bzk_out 搜: INC/STA 到零页 $00E0-$00EF 任意地址 (得分可能存储地)
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out');
const hits = [];
function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.asm')) {
      const t = fs.readFileSync(p, 'utf8').split('\n');
      for (let i = 0; i < t.length; i++) {
        const l = t[i];
        if (/(STA|INC|ADC|LDA)\s+ram_00E[0-9A-F]\b/.test(l)) {
          hits.push({ f: p.replace(dir, ''), line: i + 1, text: l.trim().slice(0, 110) });
        }
      }
    }
  }
}
walk(dir);
console.log(`hits: ${hits.length}`);
for (const h of hits.slice(0, 120)) console.log(`  ${h.f}:${h.line}  ${h.text}`);
