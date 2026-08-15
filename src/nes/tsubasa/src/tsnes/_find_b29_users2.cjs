/** 分析 MMC3 bank 切换模式 */
const fs = require('fs');
const path = require('path');

const dir = '_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm'));

// 先看 bank_26.asm 中的 bank 切换上下文，因为它是 match service 且引用 $8xxx 多
const sample = fs.readFileSync(path.join(dir, 'bank_26.asm'), 'utf8').split(/\r?\n/);
let shown = 0;
for (let i = 0; i < sample.length && shown < 15; i++) {
  if (/STA\s+\$A000|STA\s+\$8001|STA\s+\$8000/i.test(sample[i])) {
    console.log('--- bank_26 L' + (i + 1) + ' ---');
    console.log(sample.slice(Math.max(0, i - 4), i + 3).join('\n'));
    shown++;
  }
}

// 统计所有 sta $a000 / $8001 / $8000 的频率
const cnt = {};
for (const f of files) {
  const t = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  let c = 0;
  t.forEach(l => {
    if (/STA\s+\$(?:A000|8000|8001)/i.test(l)) c++;
  });
  if (c) cnt[f] = c;
}
console.log('\n=== STA $A000/$8000/$8001 次数 ===');
console.log(Object.entries(cnt).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ': ' + v).join('\n'));
