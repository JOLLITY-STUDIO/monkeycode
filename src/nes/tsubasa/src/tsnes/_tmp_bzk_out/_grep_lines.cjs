const fs = require('fs');
const s = fs.readFileSync(__dirname + '/_full_disasm.asm', 'utf8').split(/\r?\n/);
// 找到精确以 $CA97: 开头的行
for (const t of ['CA97', 'CC02', 'CCD2', 'CAE7', 'CF1F', 'C766']) {
  const hits = [];
  s.forEach((l, i) => { if (l.includes('$' + t)) hits.push(i); });
  console.log('$' + t + ' hits:', hits.join(','));
}
