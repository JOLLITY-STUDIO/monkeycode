const fs = require('fs');
function grab(lo, hi, label) {
  const out = [];
  for (let n = 1; n <= 8; n++) {
    const p = `_tmp_bzk_out/bank_02/bank_02_part0${n}.asm`;
    if (!fs.existsSync(p)) continue;
    const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/01:([0-9A-F]{4})/);
      if (m) {
        const a = parseInt(m[1], 16);
        if (a >= lo && a <= hi) out.push((i + 1) + ': ' + lines[i]);
      }
    }
  }
  fs.writeFileSync(label, out.join('\n'), 'utf8');
  console.log(label + ': ' + out.length + ' lines');
}
grab(0x8850, 0x88D0, '_tmp_88.txt');
grab(0xA880, 0xA8E0, '_tmp_a8.txt');
grab(0xAB00, 0xAB40, '_tmp_ab1f.txt');
grab(0xAA40, 0xAA90, '_tmp_aa75.txt');
grab(0x8000, 0x80FF, '_tmp_8000.txt');
