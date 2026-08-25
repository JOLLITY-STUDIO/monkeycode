const fs = require('fs');
const s = fs.readFileSync('src/asm/bank02/_full.s', 'utf8').split(/\r?\n/);
const pats = ['$8E', '$8F', '$90', '$91', '$ED'];
s.forEach((l, i) => {
  for (const p of pats) {
    if (l.includes(p) && (l.includes('STA') || l.includes('LDA') || l.includes('LDY') || l.includes('JSR') || l.includes('JMP'))) {
      console.log((i + 1) + ': ' + l.trim());
      break;
    }
  }
});
