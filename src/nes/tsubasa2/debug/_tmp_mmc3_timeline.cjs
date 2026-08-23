const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/debug/trace/opening-mmc3.log', 'utf8');
const lines = c.split('\n');
// Track R6/R7 changes over instruction index; show state at key instruction ranges
let r6 = -1, r7 = -1;
const stateAt = (i) => `R6=${r6} R7=${r7}`;
const snapshots = [];
for (const l of lines) {
  const m = l.match(/^\[MMC3\] i(\d+).*STA \$8000 = #\$([0-9A-F]{2}) select (R[0-7])/);
  const m2 = l.match(/^\[MMC3\] i(\d+).*STA \$8001 = #\$([0-9A-F]{2}) (R[0-7]|PRG_8000|PRG_A000|CHR)/);
  if (!m && !m2) continue;
  const i = parseInt((m || m2)[1], 10);
  const reg = m ? m[3] : m2[3];
  const val = parseInt((m || m2)[2], 16);
  if (m) {
    if (reg === 'R6') { /* selecting reg, value comes next */ }
  } else if (m2) {
    if (reg === 'PRG_8000') r6 = val & 0x3f;
    else if (reg === 'PRG_A000') r7 = val & 0x3f;
  }
  if (i > 67000 && i < 68000) snapshots.push(`i${i} ${stateAt(i)} ${reg} val=${val.toString(16)}`);
  if (i > 82000 && i < 83000) snapshots.push(`i${i} ${stateAt(i)} ${reg} val=${val.toString(16)}`);
  if (i > 92000 && i < 93000) snapshots.push(`i${i} ${stateAt(i)} ${reg} val=${val.toString(16)}`);
}
console.log('state around attr $55 (i67683):');
snapshots.filter(s => s.startsWith('i67')).slice(0, 20).forEach(s => console.log('  ' + s));
console.log('state around TECMO text (i82685):');
snapshots.filter(s => s.startsWith('i82')).slice(0, 30).forEach(s => console.log('  ' + s));
console.log('state around caption (i92302):');
snapshots.filter(s => s.startsWith('i92')).slice(0, 20).forEach(s => console.log('  ' + s));
