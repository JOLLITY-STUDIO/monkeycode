/** 找出直接读取 $9Bxx-$9Cxx 数据（非JSR）的消费方代码 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm') && !f.startsWith('_full'));

// 直接数据访问: LDA/LDX/LDY $9Bxx,Y 或 LDA $9Bxx,X 等 (有,X 或 ,Y 或 无索引)
const dataRe = /\b(?:LDA|LDX|LDY|STA|STX|STY|CMP|ADC|SBC|AND|ORA|EOR)\s+\$9[BC][0-9A-F]{2}(?:,X|,Y)?\b/i;
const hits = [];
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < t.length; i++) {
    const m = t[i].match(dataRe);
    if (m) {
      hits.push({ f, line: i + 1, txt: t[i].trim() });
    }
  }
}
console.log('=== 直接数据读取 $9Bxx-$9Cxx ===');
console.log('total:', hits.length);
const grouped = {};
hits.forEach(h => { grouped[h.f] = (grouped[h.f] || 0) + 1; });
console.log(Object.entries(grouped).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ': ' + v).join('\n'));

// 列出前 40 条详细
hits.slice(0, 40).forEach(h => console.log('[' + h.f + ' L' + h.line + '] ' + h.txt));
