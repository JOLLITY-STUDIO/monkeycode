// 单独提取 $9EED-$9F68 与 $99F0-$9A0D 与 $9B8B 段
const fs = require('fs');
const asm = fs.readFileSync(__dirname + '/bank_00.asm', 'utf8');
const lines = asm.split(/\r?\n/);

function extract(start, end, label) {
  console.log(`===== ${label} =====`);
  let on = false;
  for (const line of lines) {
    const m = line.match(/\b00:([0-9A-Fa-f]{4}):/);
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

extract(0x9EED, 0x9F69, '$9EED main loop');
extract(0x99F0, 0x9A0D, '$99F0 unknownInit');
extract(0x8B71, 0x8BA0, '$8B71 scene tail 2');
