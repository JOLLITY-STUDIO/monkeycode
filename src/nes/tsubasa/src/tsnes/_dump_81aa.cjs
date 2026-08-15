const fs = require('fs');
const src = fs.readFileSync('_tmp_bzk_out/bank_11.asm', 'utf8');
const lines = src.split(/\r?\n/);
const out = [];
for (const l of lines) {
  const m = l.match(/0x[0-9A-F]{6}\s+\d{2}:([0-9A-F]{4}):\s+(.*)$/);
  if (!m) continue;
  const a = parseInt(m[1], 16);
  if (a >= 0x81a7 && a <= 0x81d5) out.push(m[1] + ': ' + m[2].trim());
}
console.log(out.join('\n'));
