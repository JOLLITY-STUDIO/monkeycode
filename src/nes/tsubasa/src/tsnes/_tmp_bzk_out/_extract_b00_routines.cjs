// Extract bank00 subroutines by CPU address definition lines
const fs = require('fs');
const asm = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_00.asm', 'utf8');
const lines = asm.split(/\r?\n/);
const targets = ['9B28', '9B5E', '9A71', '9B07', '9AB8', '9ADA', '9F69', '98EA',
  '890C', '88FB', '9085', '99F0', '9DEE', '9A35', '9A43', '9B7F', '98A0',
  '9A0D', '9B91', '9F96', '9F89', '8976', '8895', '8920', '8AF7', '88A9', '9B11'];
const defs = {};
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/0x[0-9A-F]+\s+00:([0-9A-F]{4}):/);
  if (!m) continue;
  const addr = m[1];
  for (const t of targets) {
    if (addr === t && !defs[t]) {
      // collect until next instruction with same bank prefix at higher addr or blank
      const chunk = lines.slice(i, i + 40);
      defs[t] = chunk.join('\n');
    }
  }
}
let out = '';
for (const t of targets) {
  out += `\n===== $${t} =====\n` + (defs[t] || 'NOT FOUND (address not a definition line)') + '\n';
}
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/_b00_routines.txt', out);
console.log('done, found:', Object.keys(defs).length);
