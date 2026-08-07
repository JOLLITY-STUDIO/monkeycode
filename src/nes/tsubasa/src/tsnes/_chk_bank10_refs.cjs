const fs = require('fs');
const banks = ['01','02','11','12','16','20','24','26'];
banks.forEach(b => {
  const f = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_' + b + '.asm';
  if (!fs.existsSync(f)) return;
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  let found = [];
  lines.forEach((l, i) => {
    if ((l.includes('9FA8') || l.includes('C4B9')) && l.includes('JSR')) {
      for (let j = i - 1; j >= Math.max(0, i - 4); j--) {
        const mL = lines[j].match(/LDA #\$0A\b/);
        const mX = lines[j].match(/LDX #\$0A\b/);
        if (mL || mX) {
          found.push('L' + (i+1) + ': ' + (mL||mX)[0].trim() + ' | ' + l.trim());
          break;
        }
      }
    }
  });
  if (found.length) {
    console.log('=== Bank ' + b + ' (' + found.length + ' refs to Bank 0A) ===');
    found.forEach(x => console.log(x));
  } else {
    console.log('=== Bank ' + b + ': NO ref to Bank 0A ===');
  }
});
