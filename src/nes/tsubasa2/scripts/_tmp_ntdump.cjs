const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'output', 'emu-full', 'frame-0010');
const nt = JSON.parse(fs.readFileSync(path.join(dir, 'nt.json'), 'utf8'));
console.log('nt len:', nt.length, 'keys:', Object.keys(nt[0]));
for (let ni = 0; ni < 4; ni++) {
  const t = nt[ni].tile;
  let nz = 0, first = [];
  for (let i = 0; i < t.length; i++) {
    if (t[i] !== 0) { nz++; if (first.length < 5) first.push(i + '=' + t[i]); }
  }
  console.log('NT' + ni, 'len=' + t.length, 'nz=' + nz, 'first=' + first.join(','));
}
