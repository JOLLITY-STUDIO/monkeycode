const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'trace/cpu.log')),
  crlfDelay: Infinity,
});
let found = 0;
rl.on('line', (l) => {
  if (l.includes('$078D') || l.includes('$078E') || l.includes('$078F')) {
    if (found < 15) {
      console.log(l.substring(0, 130));
      found++;
    }
  }
});
rl.on('close', () => console.log('Found ' + found + ' refs to $078D'));
