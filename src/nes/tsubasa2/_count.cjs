const fs = require('fs');
const path = require('path');
function parseBank19(file) {
  const text = fs.readFileSync(file, 'utf8');
  const bytes = [];
  // match all $XX tokens in .byte lines
  const re = /\$([0-9A-Fa-f]{2})/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    bytes.push(parseInt(m[1], 16));
  }
  return bytes;
}
for (const f of ['asm/bank19/data_tables.s', 'asm/bank19/data_tail.s']) {
  const b = parseBank19(f);
  console.log(f, 'bytes=', b.length);
}
