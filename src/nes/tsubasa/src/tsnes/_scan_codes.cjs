const fs = require('fs');
for (const n of ['11', '16']) {
  const t = fs.readFileSync(`_tmp_bzk_out/bank_${n}.asm`, 'utf8').split(/\r?\n/);
  const out = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (/^C\s/.test(l)) out.push(l.trim());
  }
  fs.writeFileSync(`_code${n}_extract.txt`, out.join('\n'));
  console.log(`bank_${n}: ${out.length} code lines -> _code${n}_extract.txt`);
}
