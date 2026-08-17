const fs = require('fs');
const cdl = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl');
const BANK = 8192;
let out = '';
for (let b = 0; b < 32; b++) {
  let codeB = 0, dataB = 0, neither = 0;
  for (let o = 0; o < BANK; o++) {
    const v = cdl[b * BANK + o];
    if (v & 1) codeB++;
    if (v & 2) dataB++;
    if (!(v & 1) && !(v & 2)) neither++;
  }
  const cpu = b === 31 ? '$E000' : b === 30 ? '$C000' : '$8000';
  out += `  ${b.toString().padStart(2)}: { code: ${codeB.toString().padStart(4)}, data: ${dataB.toString().padStart(4)}, unacc: ${neither.toString().padStart(4)}, cpu: '${cpu}' },\n`;
}
console.log(out);
fs.writeFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/scripts/_new_stats.txt', out);
