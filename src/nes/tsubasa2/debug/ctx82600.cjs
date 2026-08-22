const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'trace/cpu.log')),
  crlfDelay: Infinity,
});
let found = 0;
rl.on('line', (l) => {
  const m = l.match(/^i(\d+)\s/);
  if (m) {
    const i = parseInt(m[1]);
    if (i >= 82590 && i <= 82620) {
      console.log(l.substring(0, 130));
      found++;
    }
  }
});
rl.on('close', () => console.log('Found ' + found));
