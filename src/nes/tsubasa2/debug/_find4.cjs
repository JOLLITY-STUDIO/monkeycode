const fs = require('fs');
const raw = fs.readFileSync('src/asm/bank02/_full.s', 'utf8');
const s = raw.split(/\r\n|\r|\n/);
console.log('total lines', s.length);
s.forEach((l, i) => {
  if (/STA \$00(8E|8F|90|91)|LDA \$00(8E|8F|90|91)|STA \$ED|LDA \$ED|STY \$ED|LDY \$ED/.test(l)) {
    console.log((i + 1) + ': ' + l.trim());
  }
});
