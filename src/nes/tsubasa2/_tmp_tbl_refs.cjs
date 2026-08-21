const fs = require('fs');
const files = fs.readdirSync('asm/bank02');
const re = /(LDA|STA|CMP|ADC|LDX|LDY|BIT|INC|DEC)\s+\$(AB00|AB10|AB20|AAF0|AB01|AB02|AAB0|A896|A897|A8FC|A996|AA20|AA36|AA06|A82F|A72C|A767)\b/i;
for (const f of files) {
  const lines = fs.readFileSync('asm/bank02/' + f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => { if (re.test(l)) console.log(f + ':' + (i + 1) + ': ' + l.trim()); });
}
console.log('done');
