const fs = require('fs');
for (const f of ['code_sub.s', 'code_data.s', 'data_tables.s', '_full.s']) {
  const lines = fs.readFileSync('src/asm/bank02/' + f, 'utf8').split(/\r?\n/);
  lines.forEach((l, i) => {
    if (/A200|A203|A206|A212|A222|A855|A86E|A8CE|A8FE|A484/.test(l)) console.log(f + ':' + (i + 1) + ': ' + l.trim());
  });
}
