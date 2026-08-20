// 在 bank_26/bank_20/bank_31 反汇编中找得分递增 (ADC #$01 → STA ram_00XX) 与 GOAL 注释
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out');
const files = [];
for (const b of ['bank_26', 'bank_20', 'bank_31']) {
  const d = path.join(dir, b);
  if (fs.existsSync(d)) for (const f of fs.readdirSync(d)) files.push(path.join(d, f));
}
const hits = [];
for (const p of files) {
  const t = fs.readFileSync(p, 'utf8').split('\n');
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (/(ADC\s+#\$01|GOAL|goal|得点|点数)/.test(l)) {
      const ctx = [];
      for (let k = Math.max(0, i - 2); k <= Math.min(t.length - 1, i + 4); k++) ctx.push(t[k].trim().slice(0, 90));
      hits.push({ f: p.replace(dir, ''), line: i + 1, text: l.trim().slice(0, 90), ctx: ctx.join(' | ') });
    }
  }
}
console.log(`hits: ${hits.length}`);
for (const h of hits.slice(0, 50)) console.log(`  ${h.f}:${h.line}  ${h.text}\n      ${h.ctx}`);
