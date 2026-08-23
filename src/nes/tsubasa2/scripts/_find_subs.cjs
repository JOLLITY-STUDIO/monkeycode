const fs = require('fs');
const re = /8A97|8C6D|8C71|8AB1|AADF|AA97|AA47|AA75|AC6D|AC71|8AA7|8A14|88D2/;
for (const f of ['code_sub.s', 'code_data.s', 'data_tables.s', '_full.s']) {
  const lines = fs.readFileSync('src/asm/bank02/' + f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (re.test(l)) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
