const fs = require('fs');
const bank = process.argv[2] || 'bank01';
const t = fs.readFileSync('tools/triage_report2.txt', 'utf8').split(/\r?\n/);
let inBank = false;
for (const l of t) {
  if (l.startsWith('=== ' + bank)) { inBank = true; continue; }
  if (inBank && l.startsWith('===')) break;
  if (inBank) console.log(l);
}
