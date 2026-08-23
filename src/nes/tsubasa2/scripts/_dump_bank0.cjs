const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'src', 'game', 'prg', 'data', 'rom', 'prg-bank-00.ts');
const src = fs.readFileSync(file, 'utf8');
const body = src.match(/\[([\s\S]*)\]/)[1];
const bytes = body.match(/0x[0-9a-fA-F]+/g).map(s => parseInt(s, 16));
console.log('bank00 bytes:', bytes.length);
function dump(startAddr, endAddr) {
  const start = startAddr - 0x8000;
  for (let off = start; off < endAddr - 0x8000; off += 16) {
    const addr = 0x8000 + off;
    const chunk = bytes.slice(off, off + 16).map(b => b.toString(16).padStart(2, '0')).join(' ');
    console.log('$' + addr.toString(16) + ': ' + chunk);
  }
}
console.log('--- $9143-$9224 ---');
dump(0x9143, 0x9225);
