const fs = require('fs');
const path = require('path');
const rl = require('readline').createInterface({
  input: fs.createReadStream(path.resolve(__dirname, 'trace/cpu.log')),
  crlfDelay: Infinity,
});
let lineNum = 0;
let targetStart = 82610;
let targetEnd = 82630;
rl.on('line', (l) => {
  lineNum++;
  if (lineNum >= targetStart && lineNum <= targetEnd) {
    console.log('L' + lineNum + ': ' + l.substring(0, 120));
  }
  if (lineNum > targetEnd) rl.close();
});
