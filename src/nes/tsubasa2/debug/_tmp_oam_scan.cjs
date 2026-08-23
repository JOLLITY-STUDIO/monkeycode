const fs = require('fs');
const path = require('path');
const file = 'd:/studio/github/monkeycode/src/nes/tsubasa2/debug/trace/opening-cpu.log';
if (!fs.existsSync(file)) { console.log('cpu log missing'); process.exit(0); }
const stat = fs.statSync(file);
console.log('cpu log size MB:', (stat.size / 1048576).toFixed(1));
const rs = fs.createReadStream(file, { encoding: 'utf8', highWaterMark: 4 * 1048576 });
let buf = '';
let oamWrites = 0;
let oamLines = [];
let lines = 0;
rs.on('data', (chunk) => {
  buf += chunk;
  let idx;
  while ((idx = buf.indexOf('\n')) >= 0) {
    const line = buf.slice(0, idx);
    buf = buf.slice(idx + 1);
    lines++;
    // STA $02XX (shadow OAM) or writes to $0200-$02FF range
    const m = line.match(/STA \$02[0-9A-F]{2} = #\$[0-9A-F]{2}/i);
    if (m) {
      oamWrites++;
      if (oamWrites <= 12) oamLines.push(line.slice(0, 90));
    }
  }
});
rs.on('end', () => {
  console.log('total cpu lines:', lines);
  console.log('shadow OAM writes (STA $02xx):', oamWrites);
  oamLines.forEach(l => console.log('  ' + l));
});
