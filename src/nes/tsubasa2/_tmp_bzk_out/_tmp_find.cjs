/* 在 bank_00 中查找函数定义位置 */
const fs = require('fs');
const path = require('path');
const d = path.join(__dirname, 'bank_00');
const pats = ['8920', '8976', '98EA', '9A0D', '9F96', '9F89', '9B91', '8895', '9FA8'];
for (const f of fs.readdirSync(d)) {
  if (!f.endsWith('.asm')) continue;
  const L = fs.readFileSync(path.join(d, f), 'utf8').split('\n');
  L.forEach((l, i) => {
    const m = l.match(/00:([0-9A-F]{4}):/);
    if (m && pats.includes(m[1])) {
      console.log(`[${f}] L${i + 1}: ${l.trim().slice(0, 110)}`);
    }
  });
}
console.log('DONE');
