const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'trace/cpu.log')),
  crlfDelay: Infinity,
});
let found = 0;
rl.on('line', (l) => {
  // 搜 i82615 附近
  const m = l.match(/^i(\d+)\s/);
  if (m) {
    const i = parseInt(m[1]);
    if (i >= 82610 && i <= 82625) {
      console.log(l.substring(0, 120));
      found++;
    }
  }
});
rl.on('close', () => {
  console.log('Found ' + found + ' lines');
});
