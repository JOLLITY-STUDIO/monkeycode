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

extract(0xCC02, 0xCCD2, '$CC02 full');
extract(0xCCD2, 0xCD40, '$CCD2 full');
