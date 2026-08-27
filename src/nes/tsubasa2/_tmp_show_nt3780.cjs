const fs = require('fs');
const nt = JSON.parse(fs.readFileSync('output/emu-full/frame-3780/nt.json', 'utf8'))[0];
for (let r = 20; r < 30; r++) {
  const row = nt.tile.slice(r * 32, (r + 1) * 32);
  const hex = row.map(x => x.toString(16).padStart(2, '0')).join(' ');
  const ascii = row.map(x => (x >= 0x20 && x < 0x7f) ? String.fromCharCode(x) : '.').join('');
  console.log('r' + r.toString().padStart(2, ' ') + ' ' + hex + '  ' + ascii);
}
