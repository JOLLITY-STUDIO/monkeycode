/**
 * 找出引用 bank29 数据区 ($9B1A-$9CEE) 的 code bank
 * 这些是真正消费 bank29 CPU 阵容数据的代码
 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm') && !f.startsWith('_full'));

const addrRe = /\$9B[1-9A-F][0-9A-F]|\$9C[0-9A-F][0-9A-F]/i;
const hits = [];
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    const m = t[i].match(addrRe);
    if (m) {
      hits.push({ f, line: i + 1, txt: t[i].trim() });
    }
  }
}
console.log('=== 引用 $9Bxx-$9Cxx (bank29 数据区) 的代码 ===');
console.log('total:', hits.length);
const grouped = {};
hits.forEach(h => { grouped[h.f] = (grouped[h.f] || 0) + 1; });
console.log(Object.entries(grouped).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ': ' + v).join('\n'));

// 列出每个 bank 引用到的具体地址
const perBank = {};
hits.forEach(h => {
  const addrs = [...h.txt.matchAll(/\$9B[1-9A-F][0-9A-F]|\$9C[0-9A-F][0-9A-F]/gi)].map(m => m[0].toUpperCase());
  if (!perBank[h.f]) perBank[h.f] = new Set();
  addrs.forEach(a => perBank[h.f].add(a));
});
console.log('\n=== 各 bank 引用的具体地址 ===');
Object.entries(perBank).forEach(([f, s]) => {
  console.log(f + ': ' + [...s].sort().join(' '));
});
