// Extract $9EA2 palette addr table + full $8AF7 + $9AF9 tail + $9A31-$9A40 from bank00
const fs = require('fs');
const asm = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_00.asm', 'utf8');
const lines = asm.split(/\r?\n/);

// find $9EA2 definition index
let idx9EA2 = -1, idx8AF7 = -1, idx9E7C = -1;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/0x[0-9A-F]+\s+00:([0-9A-F]{4}):/);
  if (!m) continue;
  if (m[1] === '9EA2' && idx9EA2 < 0) idx9EA2 = i;
  if (m[1] === '8AF7' && idx8AF7 < 0) idx8AF7 = i;
  if (m[1] === '9E7C' && idx9E7C < 0) idx9E7C = i;
}
let out = '';
out += `\n===== $9EA2 palette-addr table (128 bytes) =====\n`;
if (idx9EA2 >= 0) out += lines.slice(idx9EA2, idx9EA2 + 128).join('\n');
else out += 'NOT FOUND\n';
out += `\n===== $8AF7 scene load (full, 90 lines) =====\n`;
if (idx8AF7 >= 0) out += lines.slice(idx8AF7, idx8AF7 + 90).join('\n');
else out += 'NOT FOUND\n';
out += `\n===== $9E7C =====\n`;
if (idx9E7C >= 0) out += lines.slice(idx9E7C, idx9E7C + 40).join('\n');
else out += 'NOT FOUND\n';
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/_b00_more.txt', out);
console.log('done');
