const fs = require('fs');
const path = require('path');
const ls = fs.readFileSync(path.resolve(__dirname, '../docs/roms/Captain Tsubasa II - Super Striker (Japan).log'), 'utf8').split('\n');

const pats = [
  { name: 'STA $0044', re: /STA \$44 = / },
  { name: 'STA $0079', re: /STA \$79 = / },
  { name: 'INC $0079', re: /INC \$79/ },
  { name: 'DEC $007C', re: /DEC \$7C/ },
  { name: 'STA $2005', re: /STA \$2005/ },
  { name: 'STA $2000', re: /STA \$2000/ },
  { name: 'STA $00ED', re: /STA \$ED = / },
  { name: 'SBC #$02', re: /SBC #\$02/ },
];
const cnt = {};
const samples = {};
for (const l of ls) {
  for (const p of pats) {
    if (p.re.test(l)) {
      cnt[p.name] = (cnt[p.name] || 0) + 1;
      if (!samples[p.name]) samples[p.name] = l;
    }
  }
}
for (const p of pats) {
  console.log(p.name, 'count=', cnt[p.name] || 0);
  if (samples[p.name]) console.log('   e.g.', samples[p.name].trim());
}
