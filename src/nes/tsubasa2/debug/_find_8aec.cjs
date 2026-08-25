const fs = require('fs');
const lines = fs.readFileSync('src/asm/bank00/_full.s', 'utf8').split(/\r?\n/);
const idx = [];
lines.forEach((l, i) => {
  if (/8A(EC|ED|EE|EF|F0|F1|F2|F3|F4|F5|F6)/i.test(l)) idx.push(i);
});
console.log('matches:', idx.length);
for (const i of idx) {
  console.log('--- line', i, '---');
  for (let j = Math.max(0, i - 8); j <= Math.min(lines.length - 1, i + 8); j++) {
    console.log(lines[j]);
  }
}
