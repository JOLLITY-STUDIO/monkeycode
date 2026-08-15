/**
 * 搜索 $BAxx-$BExx 引用 —— bank29 被切到 $A000 窗口时的数据读取
 * bank29 offset 0x1A00-0x1EFF → CPU $BA00-$BEFF
 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm') && !f.startsWith('_full'));

const addrRe = /\b(?:LDA|STA|LDX|STX|LDY|STY|CMP|ADC|SBC|AND|ORA|EOR|JSR|JMP)\s+\$(BA|BB|BC|BD|BE)[0-9A-F]{2}(?:,X|,Y)?\b/i;
const hits = [];
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    const m = t[i].match(addrRe);
    if (m) hits.push({ f, line: i + 1, txt: t[i].trim() });
  }
}
console.log('=== 引用 $BAxx-$BExx (bank29 在 $A000 窗口) ===');
console.log('total:', hits.length);
const grouped = {};
hits.forEach(h => { grouped[h.f] = (grouped[h.f] || 0) + 1; });
console.log(Object.entries(grouped).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ': ' + v).join('\n'));

// 各 bank 引用到的具体地址
const perBank = {};
hits.forEach(h => {
  const addrs = [...h.txt.matchAll(/\$(BA|BB|BC|BD|BE)[0-9A-F]{2}(?:,X|,Y)?/gi)].map(m => m[0].toUpperCase());
  if (!perBank[h.f]) perBank[h.f] = new Set();
  addrs.forEach(a => perBank[h.f].add(a));
});
console.log('\n=== 各 bank 引用地址 ===');
Object.entries(perBank).forEach(([f, s]) => console.log(f + ': ' + [...s].sort().join(' ')));
