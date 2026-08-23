const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank02/code_sub.s',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank02/_full.s',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank02/code_data.s',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank02/code_main.s',
];
for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  const hits = [];
  lines.forEach((l, i) => {
    if (/A491|A492/.test(l)) hits.push((i + 1) + ': ' + l.trim().slice(0, 120));
  });
  if (hits.length) {
    console.log('=== ' + f + ' (' + hits.length + ') ===');
    hits.slice(0, 30).forEach(h => console.log(h));
  }
}
