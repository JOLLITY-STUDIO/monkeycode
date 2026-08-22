const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'trace/cpu.log')),
  crlfDelay: Infinity,
});
let found = 0;
rl.on('line', (l) => {
  if (l.includes('$05E8') || l.includes('$05E9') || l.includes('$05EA') || l.includes('$05EB')) {
    if (found < 10) {
      console.log(l.substring(0, 130));
      found++;
    }
  }
});
rl.on('close', () => console.log('Found ' + found + ' refs to $05E8-$05EB'));
