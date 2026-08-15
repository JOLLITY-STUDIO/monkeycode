const fs = require('fs');
function extract(file, label, start, end) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const out = [];
  let inR = false;
  for (const l of lines) {
    const m = l.match(/([0-9A-F]{2}):([0-9A-F]{4})/i);
    if (m) {
      const addr = parseInt(m[2], 16);
      if (addr === start) inR = true;
      if (addr === end) break;
    }
    if (inR) out.push(l);
  }
  fs.writeFileSync(label, out.join('\n'));
  console.log(label, out.length);
}
// $F30F region (bank31, $E000-$FFFF window, prefix 0E? check)
extract('_tmp_bzk_out/bank_31.asm', '_b31_f30f.txt', 0xf30f, 0xf340);
// $CD77 region (bank30, prefix 0F = bank 30? Actually fixed bank)
extract('_tmp_bzk_out/bank_30.asm', '_b30_cd77.txt', 0xcd77, 0xcd99);
// $CBC2 region (bank30, $C524 impl)
extract('_tmp_bzk_out/bank_30.asm', '_b30_cbc2.txt', 0xcbc2, 0xcbf0);
