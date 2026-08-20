const fs = require('fs');
for (const f of ['code_main.s', 'code_sub.s', 'code_data.s']) {
  const s = fs.readFileSync('asm/bank30/' + f, 'utf8');
  const lines = s.split('\n');
  const code = lines.filter(l => /;\s*\$C[0-9A-F]{3}/.test(l));
  const byteCount = lines.filter(l => /\.byte\s/.test(l)).length;
  console.log('=== ' + f + ' total=' + lines.length + ' code-lines=' + code.length + ' byte-lines=' + byteCount + ' ===');
  // print code line numbers to see where code starts
  const firstCode = lines.findIndex(l => /;\s*\$C[0-9A-F]{3}/.test(l));
  console.log('first code line idx:', firstCode);
  // print addresses of code sections (unique addresses)
  const addrs = [];
  for (const l of lines) {
    const m = l.match(/;\s*\$([0-9A-F]{4})/);
    if (m) addrs.push(parseInt(m[1], 16));
  }
  // group contiguous ranges
  let ranges = [];
  let start = null, prev = null;
  for (const a of addrs) {
    if (start === null) { start = a; prev = a; continue; }
    if (a === prev + 1) { prev = a; continue; }
    ranges.push([start, prev]);
    start = a; prev = a;
  }
  if (start !== null) ranges.push([start, prev]);
  console.log('code ranges (' + ranges.length + '):');
  ranges.forEach(r => console.log('  $' + r[0].toString(16).toUpperCase() + '-$' + r[1].toString(16).toUpperCase()));
}
