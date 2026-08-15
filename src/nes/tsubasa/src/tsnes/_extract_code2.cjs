const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8').split(/\r?\n/);
const out = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^([CDRUDX\s\-]+)\s+0x([0-9A-F]{6})\s+00:([0-9A-F]{4}):\s+([0-9A-F]{2}(?:\s+[0-9A-F]{2})*)\s+(\S.*)$/);
  if (m) {
    const flags = m[1].replace(/\s/g, '');
    const prg = parseInt(m[2], 16);
    const cpu = parseInt(m[3], 16);
    const isCode = flags.includes('C');
    if (isCode) {
      out.push(prg.toString(16).padStart(6, '0') + ' ' + cpu.toString(16).padStart(4, '0') + ' ' + m[5].trim());
    }
  }
}
fs.writeFileSync('_bank01_code.txt', out.join('\n'));
console.log('code lines:', out.length);
