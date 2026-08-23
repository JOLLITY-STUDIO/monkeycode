const fs = require('fs');
for (const name of ['opening-oam.log', 'opening-palette.log', 'opening-mmc3.log']) {
  const lines = fs.readFileSync('debug/trace/' + name, 'utf8').split('\n').filter(l => l.trim());
  console.log('=== ' + name + ' total ' + lines.length + ' lines ===');
  // unique instruction addresses
  const addrs = new Set();
  for (const l of lines) {
    const m = l.match(/\$[0-9A-F]{2}:[0-9A-F]{4}/);
    if (m) addrs.add(m[0]);
  }
  console.log('addrs:', [...addrs].join(' '));
  const first20 = lines.slice(0, 20);
  for (const l of first20) console.log(l);
  const last10 = lines.slice(-10);
  console.log('...last10:');
  for (const l of last10) console.log(l);
  console.log();
}
