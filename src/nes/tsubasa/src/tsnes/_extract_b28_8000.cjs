const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_28.asm', 'utf8').split(/\r?\n/);
const out = [];
let inRange = false;
let count = 0;
for (const line of lines) {
  const m = line.match(/[0-9A-F]{2}:8000:|0C:8000:/i);
  if (m && !inRange) { inRange = true; }
  if (inRange) {
    out.push(line);
    count++;
    if (count >= 200) break;
  }
}
fs.writeFileSync('_b28_8000_head.txt', out.join('\n'));
console.log('lines:', out.length);
