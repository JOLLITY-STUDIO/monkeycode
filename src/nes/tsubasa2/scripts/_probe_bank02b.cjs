const fs = require('fs');
const dir = 'src/asm/bank02';
const files = ['_full.s', 'bank02.s', 'code_data.s', 'code_main.s', 'code_sub.s', 'data_tables.s'];
const pats = ['$A602', '$A61C', '$A629', '$A650', '$A69C', '$A77A', '$A782', '$A78D', '$A7BD', '$A7CE', '$A7D6', '$A7FA', '$8602', '$87FA', '$A55A', '$A4C1'];
for (const fn of files) {
  const c = fs.readFileSync(dir + '/' + fn, 'utf8');
  const lines = c.split(/\r?\n/);
  console.log('=== ' + fn + ' (' + lines.length + ' lines) ===');
  for (let i = 0; i < lines.length; i++) {
    for (const p of pats) {
      if (lines[i].includes(p)) {
        console.log((i + 1) + ': ' + lines[i]);
        break;
      }
    }
  }
}
