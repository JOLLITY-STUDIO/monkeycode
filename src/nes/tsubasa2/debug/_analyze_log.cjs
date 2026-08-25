const fs = require('fs');
const path = require('path');
const ls = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).log'), 'utf8').split('\n');
const addrs = {};
const banks = {};
let fmin = 1e9, fmax = -1;
let skipped = 0;
for (const l of ls) {
  const m = l.match(/f(\d+)/);
  if (m) { const f = +m[1]; if (f < fmin) fmin = f; if (f > fmax) fmax = f; }
  const a = l.match(/\$([0-9A-F]{2}):([0-9A-F]{4}):/);
  if (a) { banks[a[1]] = (banks[a[1]] || 0) + 1; addrs[a[2]] = (addrs[a[2]] || 0) + 1; }
  else if (/^\(/.test(l)) skipped++;
}
console.log('total lines', ls.length, 'skipped-marker lines', skipped);
console.log('frame range', fmin, fmax);
console.log('banks', JSON.stringify(banks));
const top = Object.entries(addrs).sort((a, b) => b[1] - a[1]).slice(0, 50);
console.log('top addrs:');
for (const [a, c] of top) console.log('  $' + a, c);
