// bank26 反汇编 $8978-$8A6F 区域 (阶段处理) 找比分存储
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out', 'bank_26');
const out = [];
for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f);
  const t = fs.readFileSync(p, 'utf8').split('\n');
  for (const l of t) {
    const m = l.match(/0D:(89|8A|8B)[0-9A-F]{2}/);
    if (m) out.push({ f, addr: m[1], text: l.trim().slice(0, 110) });
  }
}
out.sort((a, b) => a.addr.localeCompare(b.addr));
console.log(`lines: ${out.length}`);
for (const o of out) console.log(`  ${o.f}  ${o.addr}  ${o.text}`);
