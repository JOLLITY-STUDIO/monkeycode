const fs = require('fs');
const f = 'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank00/code_main.s';
const lines = fs.readFileSync(f, 'utf8').split('\n');
// find $97B6 and $98E8 regions
for (const target of ['$97B6', '$98E8']) {
  let idx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(target)) { idx = i; break; }
  }
  console.log('===== ' + target + ' at line ' + (idx + 1) + ' =====');
  if (idx >= 0) {
    for (let i = Math.max(0, idx - 2); i < Math.min(lines.length, idx + 40); i++) {
      console.log((i + 1) + ': ' + lines[i].trim().slice(0, 105));
    }
  }
}
