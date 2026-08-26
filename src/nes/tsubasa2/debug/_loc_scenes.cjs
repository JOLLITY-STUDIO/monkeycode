const fs = require('fs');
const path = 'src/asm/bank02';
const targets = ['A491','A559','A57B','A581','A5A2','A5A8','A5B0','A5B8','A5BF','A5CD','A5DB','A5E8','A602','A61C','A629','A650','A69C','A77A','A782','A78D','A7BD','A7CE','A7D6','A7FA'];
for (const f of fs.readdirSync(path).filter(x => x.endsWith('.s'))) {
  const lines = fs.readFileSync(path + '/' + f, 'utf8').split('\n');
  for (const tgt of targets) {
    const hits = [];
    lines.forEach((l, i) => {
      if (l.includes('$' + tgt) || l.toUpperCase().includes(tgt)) hits.push(i + 1);
    });
    if (hits.length) {
      console.log('### ' + f + ' $' + tgt + ' lines: ' + hits.join(','));
      for (const h of hits) {
        console.log('   L' + h + ': ' + lines[h - 1].trim());
      }
    }
  }
}
