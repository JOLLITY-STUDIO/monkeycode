// Extract bank_30 fixed helpers: $CBC2 (C524), $CD7C (C50C), $CB99 (C509)
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
extract(0xCBC2, 0xCBFF, 'CBC2 (C524 char map)');
extract(0xCD7C, 0xCDAB, 'CD7C (C50C name ptr)');
extract(0xCB99, 0xCBC1, 'CB99 (C509 dispatch)');
