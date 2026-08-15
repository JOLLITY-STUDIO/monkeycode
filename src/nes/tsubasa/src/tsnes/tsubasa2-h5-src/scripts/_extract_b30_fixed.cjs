const fs = require('fs');
const t = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
const want = ['CB99:', 'CAE7:', 'CB02:', 'CD7C:', 'CE99:', 'CD77:', 'CDC9:', 'CDE2:', 'CB0F:', 'CB35:'];
const out = [];
for (let i = 0; i < t.length; i++) {
  for (const w of want) {
    if (t[i].includes(w)) {
      out.push('--- ' + w + ' @line ' + (i + 1) + ' ---');
      for (let j = Math.max(0, i - 2); j < t.length && j < i + 40; j++) {
        out.push(t[j]);
        if (j > i && t[j].trim() === '') break;
      }
      break;
    }
  }
}
fs.writeFileSync('_b30_fixed_extract.txt', out.join('\n'));
console.log('written lines', out.length);
