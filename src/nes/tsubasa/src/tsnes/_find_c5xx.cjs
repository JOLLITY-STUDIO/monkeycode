// Find fixed bank helpers $C51E / $C527 / $C524 / $C53C / $C50C in bank_30/31
const fs = require('fs');
const dir = '_tmp_bzk_out';
const targets = [0xC51E, 0xC527, 0xC524, 0xC53C, 0xC50C, 0xC509, 0xC512, 0xC515, 0xC52D, 0xC533, 0xC560];
for (const f of ['bank_30.asm', 'bank_31.asm']) {
  const lines = fs.readFileSync(dir + '/' + f, 'utf8').split(/\r?\n/);
  const hits = new Map();
  for (const line of lines) {
    const m = line.match(/0[FC]:([0-9A-F]{4}):/i);
    if (!m) continue;
    const a = parseInt(m[1], 16);
    if (targets.includes(a)) hits.set(a, line.trim());
  }
  if (hits.size) {
    console.log(`\n### ${f} ###`);
    for (const a of targets) {
      if (hits.has(a)) console.log('  $' + a.toString(16) + ': ' + hits.get(a));
    }
  }
}
