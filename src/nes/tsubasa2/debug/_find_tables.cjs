// 临时脚本：定位 SCENE15 表 $AA97 / $8A97 及关键数据
const fs = require('fs');
const path = require('path');

const addrs = ['AA97', '8A97', 'A677', '8677', 'A67B', '867B', 'AC6D', 'AC71', 'A82F', '882F', '9E7C', '9F89', '9F96', '9FA8', '9B28', '9B5E', '8A14'];
const dirs = ['src/asm/bank02', 'src/asm/bank00'];

for (const dir of dirs) {
  const abs = path.join(__dirname, '..', dir);
  if (!fs.existsSync(abs)) continue;
  const files = fs.readdirSync(abs);
  for (const f of files) {
    const p = path.join(abs, f);
    const s = fs.readFileSync(p, 'utf8');
    const lines = s.split(/\r?\n/);
    const hits = [];
    lines.forEach((ln, i) => {
      for (const a of addrs) {
        if (ln.includes('; $' + a) || ln.includes('; $' + a.toLowerCase())) hits.push({ a, line: i + 1, text: ln.trim() });
      }
    });
    if (hits.length) {
      console.log('===' + dir + '/' + f + '===');
      hits.slice(0, 60).forEach((h) => console.log('  ' + h.a + ' @' + h.line + ': ' + h.text));
    }
  }
}
console.log('done');
