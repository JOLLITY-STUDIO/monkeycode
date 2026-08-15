const fs = require('fs');
const lines = fs.readFileSync('_tmp_bzk_out/bank_28.asm', 'utf8').split('\n');
const labels = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // label lines end with ':' and not inside comment
  const m = l.match(/^\s*([A-Za-z_][A-Za-z0-9_\.]*):/);
  if (m) {
    // find address from same or previous line
    let addr = null;
    for (let j = i; j >= Math.max(0, i - 3); j--) {
      const am = lines[j].match(/0E:([0-9A-F]{4})/);
      if (am) { addr = am[1]; break; }
    }
    labels.push({ name: m[1], addr, line: i + 1 });
  }
}
for (const lb of labels) {
  console.log((lb.addr ? '$' + lb.addr : '????') + ' ' + lb.name + ' (L' + lb.line + ')');
}
console.log('\nTotal labels:', labels.length);
