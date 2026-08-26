// 临时脚本：定位 bank00 中关键子例程地址
const fs = require('fs');
const path = require('path');

const addrs = ['9B28', '9B5E', '9FA8', '9F96', '9F89', '9E7C', '9A35', '8976', 'A82F', '88CA', '9B91', '9B7F', '98A0', '8895', '8920', '88FB', '9A0D', '99F0', '9F69', '9F69'];
const dir = path.join(__dirname, '..', 'src', 'asm', 'bank00');
const files = fs.readdirSync(dir);

for (const f of files) {
  const p = path.join(dir, f);
  const s = fs.readFileSync(p, 'utf8');
  const lines = s.split(/\r?\n/);
  const hits = [];
  lines.forEach((ln, i) => {
    for (const a of addrs) {
      if (ln.includes('; $' + a)) hits.push({ a, line: i + 1, text: ln.trim() });
    }
  });
  if (hits.length) {
    console.log('===' + f + '===');
    hits.slice(0, 100).forEach((h) => console.log('  ' + h.a + ' @' + h.line + ': ' + h.text));
  }
}
console.log('done');
