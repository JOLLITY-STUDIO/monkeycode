// dump engine SE init routine $8349 and request loop $8063-$80B0
const fs = require('fs');
const s = fs.readFileSync('_tmp_bzk_out/bank_12.asm', 'utf8').split(/\r?\n/);
function dump(label, needle, lines) {
  const i = s.findIndex(l => l.includes(needle));
  if (i < 0) { console.log('NOT FOUND: ' + needle); return; }
  console.log('=== ' + label + ' ===');
  console.log(s.slice(i, i + lines).join('\n'));
  console.log();
}
dump('$8349 SE init routine', '06:8349', 80);
dump('$8063 request loop', '06:8063', 60);
