const fs = require('fs');
const banks = ['bank03', 'bank04', 'bank05', 'bank06'];
for (const b of banks) {
  const files = ['data_tables.s', 'data_maps.s', 'data_tail.s', '_full.s'];
  for (const f of files) {
    const p = `asm/${b}/${f}`;
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'latin1');
    const re = /\.byte\s+((?:\$[0-9A-Fa-f]{2},?\s*)+)/g;
    let cnt = 0, m;
    while ((m = re.exec(src))) cnt += m[1].match(/\$[0-9A-Fa-f]{2}/g).length;
    console.log(`${b}/${f}: ${cnt} bytes`);
  }
}
