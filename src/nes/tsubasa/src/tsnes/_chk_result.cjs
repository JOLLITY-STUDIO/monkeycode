const fs = require('fs');
const t = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/mini-audio/_trace_result.txt', 'utf-8');
const lines = t.split('\n');

// Find bank switch lines with bank 15
const b15Lines = lines.filter(l => l.includes('$A000') && l.match(/\s+15\s*$/));
console.log('Bank15 mapped to A000:', b15Lines.length, 'times');
if (b15Lines.length > 0) {
  console.log('First:', b15Lines[0]);
  console.log('Last:', b15Lines[b15Lines.length - 1]);
}

// Last 20 lines
console.log('\n--- Last 20 lines ---');
lines.slice(-20).forEach(l => console.log(l));
