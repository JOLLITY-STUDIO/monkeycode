const fs = require('fs');
const dir = 'src/asm/bank02';
for (const f of fs.readdirSync(dir)) {
  const p = dir + '/' + f;
  const t = fs.readFileSync(p, 'utf8');
  const lines = t.split('\n');
  console.log('===', f, 'lines:', lines.length);
}
const t = fs.readFileSync(dir + '/data_tables.s', 'utf8');
const lines = t.split('\n');
const keys = ['A4C0', 'A559', 'A57B', 'A581', 'A5A2', 'A5A8', 'A5B0', 'A5B8', 'A5BF', 'A5CD', 'A5DB', 'A5E8', 'A602', 'A61C', 'A629', 'A650', 'A69C', 'A77A', 'A782', 'A78D', 'A7BD', 'A7CE', 'A7D6', 'A7FA', 'A491'];
lines.forEach((l, i) => {
  if (keys.some(k => l.includes(k))) console.log(i + 1, l.slice(0, 140));
});
