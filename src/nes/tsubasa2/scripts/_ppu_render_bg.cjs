const fs = require('fs');
const p = 'd:/studio/github/monkeycode/src/nes/tsubasa2/src/core/ppu/index.ts';
const s = fs.readFileSync(p, 'utf8');
const lines = s.split('\n');

function printBlock(startPat, endPat) {
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(startPat)) { start = i; break; }
  }
  if (start === -1) { console.log(`not found ${startPat}`); return; }
  for (let i = start; i < lines.length; i++) {
    console.log(lines[i]);
    if (endPat && lines[i].includes(endPat) && i > start + 3) break;
  }
}

console.log('===== setMirroring =====');
printBlock('setMirroring(', 'nameTable');

console.log('\n===== nameTable setup =====');
printBlock('nameTable =', 'curNt');

console.log('\n===== renderBgScanline =====');
// find renderBgScanline definition
let start = -1;
for (let i = 0; i < lines.length; i++) {
  if (/renderBgScanline\s*\(/.test(lines[i])) { start = i; break; }
}
if (start !== -1) {
  for (let i = start; i < Math.min(lines.length, start + 160); i++) {
    console.log(lines[i]);
  }
}
