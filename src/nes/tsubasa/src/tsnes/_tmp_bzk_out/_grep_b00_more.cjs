// 从 bank_00.asm 提取 $8B20-$8BA0 (8AF7 续) 与 $9EED-$9F6F (主循环) 与 $99F0-$9A43
const fs = require('fs');
const asm = fs.readFileSync(__dirname + '/bank_00.asm', 'utf8');
const lines = asm.split(/\r?\n/);

function extract(start, end, label) {
  console.log(`===== ${label}: $${start.toString(16).toUpperCase()}-$${end.toString(16).toUpperCase()} =====`);
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

extract(0x8B20, 0x8BA0, '8AF7 scene load tail');
extract(0x9EED, 0x9F69, 'main loop 9EED');
extract(0x99F0, 0x9A43, '99F0 unknownInit');
extract(0x98A0, 0x98EA, '98A0 ntClear');
