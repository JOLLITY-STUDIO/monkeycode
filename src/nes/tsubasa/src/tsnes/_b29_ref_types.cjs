/** 分析 bank_00/26/01/02 中引用 $9Bxx-$9Cxx 的指令类型分布 */
const fs = require('fs');
const path = require('path');
const dir = '_tmp_bzk_out';

function analyze(fname) {
  const t = fs.readFileSync(path.join(dir, fname), 'utf8').split(/\r?\n/);
  const types = {};
  const samples = {};
  for (let i = 0; i < t.length; i++) {
    const m = t[i].match(/\b(JSR|JMP|LDA|LDX|LDY|STA|STX|STY|CMP|ADC|SBC|AND|ORA|EOR)\s+\$9[BC][0-9A-F]{2}(?:,X|,Y)?\b/i);
    if (m) {
      const op = m[1].toUpperCase();
      types[op] = (types[op] || 0) + 1;
      if (!samples[op]) samples[op] = [];
      if (samples[op].length < 3) samples[op].push(t[i].trim());
    }
  }
  console.log('\n==== ' + fname + ' ====');
  Object.entries(types).sort((a, b) => b[1] - a[1]).forEach(([op, n]) => {
    console.log(op + ': ' + n);
    samples[op].forEach(s => console.log('   ' + s));
  });
}

['bank_00.asm', 'bank_26.asm', 'bank_01.asm', 'bank_02.asm'].forEach(analyze);
