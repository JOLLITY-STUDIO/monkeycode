const fs = require('fs');
const f = 'src/asm/bank02/code_sub.s';
const c = fs.readFileSync(f, 'utf8');
const lines = c.split(/\r?\n/);
console.log('total lines:', lines.length);
const pats = ['$A491', '$8486', '$A650', '$A69C', '$A77A', '$A7FA', '$A7BD', '$A78D', '$A7CE', '$A7D6', '$A61C', '$A629', '$A602', '$A5E8', '$A5CD', '$A5DB', '$A5BF', '$A5B0', '$A5B8', '$A5A8', '$A5A2', '$A581', '$A57B', '$A559', '$A4C0'];
for (let i = 0; i < lines.length; i++) {
  for (const p of pats) {
    if (lines[i].includes(p)) {
      console.log((i + 1) + ': ' + lines[i]);
      break;
    }
  }
}
