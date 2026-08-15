const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
let lastAddr = -1;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^([CDRUD\s\- ]+)\s+0x([0-9A-F]{6})\s+00:([0-9A-F]{4}):\s+([0-9A-F]{2}(?:\s+[0-9A-F]{2})*)\s+(.+)$/);
  if (m) {
    const flags = m[1].replace(/\s/g, '');
    const prg = parseInt(m[2], 16);
    const cpu = parseInt(m[3], 16);
    const isCode = flags.includes('C');
    // print only code and only when function boundaries change
    if (isCode) {
      console.log((i + 1) + '|' + lines[i].replace(/\s+/g, ' ').trim());
    }
  }
}
