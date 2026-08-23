const fs = require('fs');
const file = 'd:/studio/github/monkeycode/src/nes/tsubasa2/debug/trace/opening-cpu.log';
const rs = fs.createReadStream(file, { encoding: 'utf8', highWaterMark: 8 * 1048576 });
let buf = '';
let count = 0;
const hits = [];
rs.on('data', (chunk) => {
  buf += chunk;
  let idx;
  while ((idx = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, idx);
    buf = buf.slice(idx + 1);
    const m = line.match(/STA \$00ED = #\$([0-9A-F]{2})/i);
    if (m) {
      count++;
      if (hits.length < 40) hits.push(line.slice(0, 110));
    }
  }
});
rs.on('end', () => {
  console.log('total STA $00ED writes:', count);
  hits.forEach(l => console.log('  ' + l));
});
