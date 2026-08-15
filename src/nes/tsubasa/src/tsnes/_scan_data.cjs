const fs = require('fs');

function scan(path, label) {
  const lines = fs.readFileSync(path, 'utf8').split(/\r?\n/);
  console.log(`\n===== ${label} (${lines.length} lines) =====`);
  let inData = false, start = 0, lastAddr = 0;
  const ranges = [];
  for (const line of lines) {
    const m = line.match(/^- D .* 0x[0-9A-F]{6} \d\d:([0-9A-F]{4}):/);
    if (m) {
      const addr = parseInt(m[1], 16);
      if (!inData) { inData = true; start = addr; }
      lastAddr = addr;
    } else if (inData) {
      ranges.push({ start, end: lastAddr, len: lastAddr - start + 1 });
      inData = false;
    }
  }
  if (inData) ranges.push({ start, end: lastAddr, len: lastAddr - start + 1 });
  for (const r of ranges) {
    console.log(`  $${r.start.toString(16).toUpperCase()}-$${r.end.toString(16).toUpperCase()} (${r.len} B)  [line content next]`);
  }
}

scan('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_11.asm', 'bank_11');
scan('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_16.asm', 'bank_16');
