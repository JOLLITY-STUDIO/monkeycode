const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'rom', 'prg-bank-00.ts');
const src = fs.readFileSync(file, 'utf8');
const body = src.match(/\[([\s\S]*)\]/)[1];
const bytes = body.match(/0x[0-9a-fA-F]+/g).map(s => parseInt(s, 16));
for (let off = 0x9268 - 0x8000; off < 0x92e5 - 0x8000; off += 8) {
  const addr = 0x8000 + off;
  const chunk = bytes.slice(off, off + 8).map(b => b.toString(16).padStart(2, '0')).join(' ');
  console.log('$' + addr.toString(16) + ': ' + chunk);
}
