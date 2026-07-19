const fs = require('fs');
const s = fs.readFileSync('_tmp_bzk_out/bank_00.asm', 'utf8');

for (const label of ['$88CA:', '$8879:', '$84E3:', '$8682:', '$86B8:']) {
  const idx = s.indexOf(label);
  if (idx >= 0) {
    console.log('=== ' + label + ' ===');
    console.log(s.substring(idx, idx + 300));
    console.log('');
  }
}

// Also find $99B0 (called by digit renderer)
const idx2 = s.indexOf('$99B0:');
if (idx2 >= 0) {
  console.log('=== $99B0: ===');
  console.log(s.substring(idx2, idx2 + 300));
}
