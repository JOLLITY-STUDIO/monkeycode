const fs = require('fs');
const banks = ['bank03', 'bank04', 'bank05', 'bank06'];
const out = {};
for (const b of banks) {
  const src = fs.readFileSync(`asm/${b}/_full.s`, 'latin1');
  const re = /\.byte\s+((?:\$[0-9A-Fa-f]{2},?\s*)+)/g;
  let bytes = [], m;
  while ((m = re.exec(src))) {
    bytes = bytes.concat(m[1].match(/\$[0-9A-Fa-f]{2}/g).map(x => parseInt(x.slice(1), 16)));
  }
  out[b] = bytes;
  console.log(`${b}: ${bytes.length} bytes`);
}
fs.writeFileSync('_tmp_bank_full_bytes.json', JSON.stringify(out));
