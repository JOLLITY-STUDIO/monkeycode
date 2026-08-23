const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_main.s';
const lines = fs.readFileSync(f, 'utf8').split('\n');
// find B800 table region
let start = -1;
for (let i = 0; i < lines.length; i++) {
  if (/B800/.test(lines[i]) && /table|LDA \$B800/i.test(lines[i] + lines[i + 1] || '')) {
    start = i;
    break;
  }
}
if (start < 0) {
  // just grep all B800 mentions
  lines.forEach((l, i) => { if (/B800|B7F|B7E/.test(l)) console.log((i + 1) + ': ' + l.trim().slice(0, 100)); });
} else {
  for (let i = start; i < Math.min(lines.length, start + 40); i++) console.log((i + 1) + ': ' + lines[i].trim().slice(0, 100));
}
