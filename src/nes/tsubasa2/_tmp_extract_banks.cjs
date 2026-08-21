const fs = require('fs');
// Extract all .byte values from each bank's data files, preserving order by file.
const banks = ['bank03', 'bank04', 'bank05', 'bank06'];
const out = {};
for (const b of banks) {
  const files = ['data_tables.s', 'data_maps.s', 'data_tail.s', '_full.s'];
  let bytes = [];
  for (const f of files) {
    const p = `asm/${b}/${f}`;
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'latin1');
    // match .byte lines
    const re = /\.byte\s+((?:\$[0-9A-Fa-f]{2},?\s*)+)/g;
    let m;
    while ((m = re.exec(src))) {
      const vals = m[1].match(/\$[0-9A-Fa-f]{2}/g).map(x => parseInt(x.slice(1), 16));
      bytes = bytes.concat(vals);
    }
  }
  out[b] = bytes;
  console.log(`${b}: ${bytes.length} bytes`);
}
fs.writeFileSync('_tmp_bank_bytes.json', JSON.stringify(out));
console.log('wrote _tmp_bank_bytes.json');
