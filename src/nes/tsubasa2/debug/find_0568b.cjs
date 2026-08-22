const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'trace/cpu.log')),
  crlfDelay: Infinity,
});
let found = 0;
rl.on('line', (l) => {
  // 搜 LDA $0568 或 LDA ($94),Y @ $0568
  if (l.includes('$0568') && found < 10) {
    console.log(l.substring(0, 130));
    found++;
  }
});
rl.on('close', () => console.log('Found ' + found + ' refs to $0568'));
