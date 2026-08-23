// 补 dump bank00 $80F8-$8110 与 $8AE0-$8AF7
const fs = require('fs');
function loadBank(idx) {
  const f = `src/game/prg/data/rom/prg-bank-0${idx}.ts`;
  const t = fs.readFileSync(f, 'utf8');
  const m = t.match(/=\s*\[([\s\S]*?)\];/);
  const arr = m[1].replace(/\s/g, '').split(',');
  return Uint8Array.from(arr.map((s) => parseInt(s, 16) || 0));
}
function hex(b) { return b.toString(16).toUpperCase().padStart(2, '0'); }
function dump(bank, from, to) {
  const d = loadBank(bank);
  let line = '';
  for (let a = from; a <= to; a++) {
    line += hex(d[a & 0x1fff]) + ' ';
    if ((a - from + 1) % 16 === 0) { console.log('$' + ((a >> 4) << 4).toString(16).padStart(4, '0') + ': ' + line); line = ''; }
  }
  if (line) console.log('$' + from.toString(16) + ': ' + line);
}
dump(0, 0x80f8, 0x8110);
dump(0, 0x8ae0, 0x8af7);
