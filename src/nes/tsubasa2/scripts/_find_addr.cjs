const fs = require('fs');

// Check bank_30.asm for C41E (the boot JMP to Bank1)
console.log('=== Bank 30: searching $C41E ===');
const b30 = fs.readFileSync('_tmp_bzk_out/bank_30.asm', 'utf8').split('\n');
b30.forEach((l, i) => {
  if (l.includes('C41E') || l.includes('C400') || l.includes('A200')) {
    console.log(`[b30:${i+1}] ${l.trim()}`);
  }
});

// Check what's around A200 in bank_01.asm
console.log('\n=== Bank 1: lines around A200/A201/A1A6 ===');
const b01 = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split('\n');
let found = false;
b01.forEach((l, i) => {
  if (l.includes('00:81A') || l.includes('00:81F') || l.includes('00:820') || l.includes('00:821') || l.includes('00:822')) {
    console.log(`[b01:${i+1}] ${l.trim()}`);
    found = true;
  }
});
if (!found) console.log('Nothing found!');
