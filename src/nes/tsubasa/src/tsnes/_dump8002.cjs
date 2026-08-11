// dump bank_12.asm $8002-$8060 完整
const fs = require('fs');
const s = fs.readFileSync('_tmp_bzk_out/bank_12.asm', 'utf8');
const lines = s.split(/\r?\n/);
let start = lines.findIndex(l => l.includes('0x018002'));
if (start < 0) { console.log('not found'); process.exit(); }
for (let i = start; i < Math.min(lines.length, start + 80); i++) console.log(lines[i]);
