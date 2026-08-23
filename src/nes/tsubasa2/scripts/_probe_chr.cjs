const fs = require('fs');
const files = [
  'src/asm/bank00/code_sub.s',
  'src/asm/bank00/code_data.s',
  'src/asm/bank00/code_main.s',
  'src/asm/bank07/code_sub.s',
  'src/asm/bank07/code_data.s',
  'src/asm/bank07/code_main.s',
  'src/asm/bank30/code_main.s',
  'src/asm/bank31/code_main.s',
];
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('MISSING ' + f); continue; }
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  console.log('=== ' + f + ' (' + lines.length + ' lines) ===');
  lines.forEach((l, i) => {
    if (/8AF7|8B93|8B4F|8B5F|8B71|C9E9|\$C9E9|8AF7|8B9E|8BE9/i.test(l)) {
      console.log((i + 1) + ': ' + l.trim());
    }
  });
}
