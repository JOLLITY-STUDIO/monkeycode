// 从 bank_30.asm 提取 $CAE7 $CC02 $CCD2 $CF1F $C4BD $CA97 (格式 0F:XXXX:)
const fs = require('fs');
const asm = fs.readFileSync(__dirname + '/bank_30.asm', 'utf8');
const lines = asm.split(/\r?\n/);

function extract(start, end, label) {
  console.log(`===== ${label} =====`);
  let on = false;
  for (const line of lines) {
    const m = line.match(/\b0F:([0-9A-Fa-f]{4}):/);
    if (!m) continue;
    const addr = parseInt(m[1], 16);
    if (!on && addr === start) on = true;
    if (on) {
      console.log(line);
      if (addr >= end) { on = false; break; }
    }
  }
  console.log('');
}

extract(0xCAE7, 0xCB20, '$CAE7 event register');
extract(0xCC02, 0xCC30, '$CC02 sprite fill');
extract(0xCCD2, 0xCCF0, '$CCD2');
extract(0xCF1F, 0xCF50, '$CF1F');
extract(0xC4B9, 0xC4D0, '$C4B9 bank switch');
extract(0xCA97, 0xCAC0, '$CA97');
