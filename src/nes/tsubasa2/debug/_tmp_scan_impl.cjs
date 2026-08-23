// 扫描 H5 源码: PC 采样发现的叙事阶段 NT 写入来源子程是否实现
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src');
const targets = ['98C0', '994F', 'A038', '985C', 'CB6C', '94C1', '94D8', '94AE', '9224', '9154'];
const hits = {};

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (f.endsWith('.ts')) {
      const txt = fs.readFileSync(p, 'utf8');
      const lines = txt.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        for (const t of targets) {
          if (lines[i].includes(t)) {
            (hits[t] = hits[t] || []).push(`${path.relative(root, p)}:${i + 1}: ${lines[i].trim().slice(0, 110)}`);
          }
        }
      }
    }
  }
}
walk(root);

for (const t of targets) {
  console.log(`\n=== ${t} (${(hits[t] || []).length}) ===`);
  (hits[t] || []).slice(0, 12).forEach(l => console.log('  ' + l));
}
