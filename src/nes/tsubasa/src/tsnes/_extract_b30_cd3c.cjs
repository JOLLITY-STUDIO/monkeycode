// Extract bank_30 fixed helpers: $CD3C (C51E division) and $CE08 (C527 digit)
const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split(/\r?\n/);
function cpuAddr(line) {
  const m = line.match(/0F:([0-9A-F]{4}):/i);
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
extract(0xCD3C, 0xCD7B, 'CD3C (C51E divide 16bit)');
extract(0xCE08, 0xCE7F, 'CE08 (C527 digit render)');
