const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'trace/cpu.log')),
  crlfDelay: Infinity,
});
let found = 0;
rl.on('line', (l) => {
  if (l.includes(':94C1:') || l.includes(':94c1:')) {
    if (found < 10) {
      console.log(l.substring(0, 120));
      found++;
    }
  }
});
rl.on('close', () => {
  console.log('Found ' + found + ' lines with $94C1');
});
