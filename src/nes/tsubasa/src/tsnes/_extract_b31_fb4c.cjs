// Extract bank31 $FB4C digit pattern table + $F30F text stream ptr table
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_31.asm', 'utf8').split(/\r?\n/);
function cpuAddr(line) {
  const m = line.match(/0[FC]:([0-9A-F]{4}):/i);
  return m ? parseInt(m[1], 16) : null;
}
function extract(start, end, label) {
  console.log(`\n===== ${label} ($${start.toString(16)}-$${end.toString(16)}) =====`);
  let inRange = false;
  for (const line of lines) {
    const a = cpuAddr(line);
    if (a === null) continue;
    if (a >= start && a <= end) {
      inRange = true;
      console.log(line);
    } else if (inRange && a > end) break;
  }
}
extract(0xFB4C, 0xFB8F, 'FB4C digit pattern table');
extract(0xF30F, 0xF329, 'F30F text stream ptr (C53C)');
