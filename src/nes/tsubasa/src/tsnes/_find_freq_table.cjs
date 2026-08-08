const fs = require('fs');
const d = fs.readFileSync('_tmp_bzk_out/bank_12.asm', 'utf8');
const lines = d.split('\n');
let cnt = 0;
console.log('=== bank_12.asm: freq/870D references ===');
for (let i = 0; i < lines.length && cnt < 50; i++) {
  if (lines[i].includes('870D') || (lines[i].includes('freq') && lines[i].includes('table'))) {
    console.log((i + 1) + ':' + lines[i].trim());
    cnt++;
  }
}
console.log('Total matches:', cnt);
