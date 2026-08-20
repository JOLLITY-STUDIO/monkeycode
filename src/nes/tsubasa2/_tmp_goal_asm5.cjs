// 1) 全反汇编搜 "ADC #$33" (数字→tile 显示) 上下文, 看它读哪个 RAM (比分显示)
// 2) 搜 ram_044E / ram_0621 用途
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
        if (/ADC\s+#\$33/.test(l) || /ram_044E\b/.test(l) || /ram_0621\b/.test(l)) {
          const ctx = t.slice(Math.max(0, i - 6), Math.min(t.length, i + 6)).map(x => x.trim().slice(0, 80)).join('\n      ');
          hits.push({ f: p.replace(dir, ''), line: i + 1, text: l.trim().slice(0, 90), ctx });
        }
      }
    }
  }
}
walk(dir);
console.log(`hits: ${hits.length}`);
for (const h of hits.slice(0, 40)) {
  console.log(`\n  ${h.f}:${h.line}  ${h.text}\n      ${h.ctx}`);
}
