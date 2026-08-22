const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'trace/cpu.log')),
  crlfDelay: Infinity,
});
let found = 0;
rl.on('line', (l) => {
  // 搜 STA $0568 或 STA $68 (零页)
  if ((l.includes('STA $0568') || l.includes('STA $68 ')) && found < 10) {
    console.log(l.substring(0, 120));
    found++;
  }
});
rl.on('close', () => console.log('Found ' + found + ' writes to $0568'));
