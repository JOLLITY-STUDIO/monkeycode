const fs = require('fs');
const path = require('path');
const f = fs.readFileSync(path.resolve(__dirname, '../../_b30_fixed_extract.txt'), 'utf8');
const lines = f.split('\n');
let out = [];
let grab = 0;
for (const ln of lines) {
  if (/CB99|CD7C|CB02|C50C|CAE7/.test(ln)) grab = 40;
  if (grab > 0) { out.push(ln); grab--; }
}
fs.writeFileSync(path.join(__dirname, '_cb99_view.txt'), out.join('\n'));
console.log('lines', out.length);
