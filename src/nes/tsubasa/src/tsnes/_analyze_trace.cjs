const fs = require('fs');
const file = process.argv[2];
const lines = fs.readFileSync(file, 'utf8').split('\n');
const banks = {};
const byAddr = {};
for (const l of lines) {
  const m = l.match(/\$([0-9A-F]{2}):([0-9A-F]{4})/);
  if (!m) continue;
  const bank = parseInt(m[1], 16);
  const addr = parseInt(m[2], 16);
  const key = 'bank' + bank;
  banks[key] = (banks[key] || 0) + 1;
  if (!byAddr[key]) byAddr[key] = {};
  const akey = addr.toString(16).toUpperCase();
  byAddr[key][akey] = (byAddr[key][akey] || 0) + 1;
}
console.log('=== BANK STATS ===');
console.log(Object.entries(banks).sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ': ' + v).join('\n'));
console.log('\n=== BANK ADDR RANGE ===');
for (const [bk, m] of Object.entries(byAddr)) {
  const addrs = Object.keys(m).map(a => parseInt(a, 16));
  const min = Math.min(...addrs).toString(16).toUpperCase();
  const max = Math.max(...addrs).toString(16).toUpperCase();
  console.log(bk + ': ' + min + ' - ' + max + ' (unique addrs: ' + addrs.length + ')');
}
