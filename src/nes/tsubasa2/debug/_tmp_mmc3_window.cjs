const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/debug/trace/opening-mmc3.log', 'utf8');
const lines = c.split('\n');
console.log('total lines:', lines.length);
// find instruction index ranges: log entries look like "$00:8010" or similar with i-index?
// Sample first 5 lines to see format
lines.slice(0, 5).forEach(l => console.log('FMT: ' + l.slice(0, 110)));
// Find bank switch patterns and count per bank
const bankCount = {};
for (const l of lines) {
  const m = l.match(/R6=(\d+)|R7=(\d+)|bank\s*(\d+)/i);
  if (!m) continue;
  const b = m[1] || m[2] || m[3];
  bankCount[b] = (bankCount[b] || 0) + 1;
}
console.log('bank counts:', JSON.stringify(bankCount));
