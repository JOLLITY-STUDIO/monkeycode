const fs = require('fs');
const file = 'd:/studio/github/monkeycode/src/nes/tsubasa2/debug/trace/opening-cpu.log';
const rs = fs.createReadStream(file, { encoding: 'utf8', highWaterMark: 8 * 1048576 });
let buf = '';
let count = 0;
const hits = [];
const seen = new Set();
rs.on('data', (chunk) => {
  buf += chunk;
  let idx;
  while ((idx = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, idx);
    buf = buf.slice(idx + 1);
    if (/\$00ED/.test(line)) {
      count++;
      if (hits.length < 80) hits.push(line.slice(0, 130));
    }
  }
});
rs.on('end', () => {
  console.log('total lines mentioning $00ED:', count);
  hits.forEach(l => console.log('  ' + l));
});
