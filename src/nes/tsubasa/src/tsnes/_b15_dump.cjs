const fs = require('fs');
const lines = fs.readFileSync('trace/Captain Tsubasa II - Super Striker (Japan)-continue-panel.log', 'utf8').split('\n');
let cnt = 0;
const out = [];
for (const l of lines) {
  if (/\$15:/.test(l)) {
    out.push(l);
    if (++cnt >= 60) break;
  }
}
fs.writeFileSync('_b15_sample.txt', out.join('\n'));
console.log('written', out.length);

// also collect all bank tokens used
const banks = new Set();
for (const l of lines) {
  const m = l.match(/\$([0-9A-F]{2}):[0-9A-F]{4}:/);
  if (m) banks.add(m[1]);
}
console.log('bank tokens seen:', [...banks].join(','));
