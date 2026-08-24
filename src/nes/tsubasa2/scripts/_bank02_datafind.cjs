// 找所有 bank02 内部 >= $A000 的 CPU 绝对地址引用
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank02');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
const hits = new Map();
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8');
  const ls = t.split(/\r?\n/);
  for (let i = 0; i < ls.length; i++) {
    const re = /\$([0-9A-F]{4})/g;
    let m;
    while ((m = re.exec(ls[i])) !== null) {
      const addr = parseInt(m[1], 16);
      if (addr >= 0xa000) {
        const k = m[1].toUpperCase();
        if (!hits.has(k)) hits.set(k, []);
        hits.get(k).push(f + ':' + (i + 1) + ':' + ls[i].trim().slice(0, 80));
      }
    }
  }
}
const want = new Set(['A47','A75','A97','ADF','AE0','B1F','B21','B22','C6D','C71','AA47','AA75','AA97','AADF','AAE0','AB1F','AB21','AB22','AC6D','AC71','A491','A492']);
const wanted = [];
for (const k of [...hits.keys()].sort()) {
  const last3 = k.slice(-3);
  if (want.has(k) || want.has(last3)) wanted.push(k);
}
console.log('matched-addr count:', wanted.length);
for (const k of wanted) {
  console.log('=== $' + k + ' (refs=' + hits.get(k).length + ') ===');
  for (const e of hits.get(k).slice(0, 10)) console.log('  ' + e);
}
