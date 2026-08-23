const fs = require('fs');
const root = 'd:/studio/github/monkeycode/src/nes/tsubasa2';
function walk(d) {
  let fs2 = [];
  for (const f of fs.readdirSync(d)) {
    const p = d + '/' + f;
    const s = fs.statSync(p);
    if (s.isDirectory()) fs2 = fs2.concat(walk(p));
    else if (f.endsWith('.s')) fs2.push(p);
  }
  return fs2;
}
const addrs = ['9201', '9200', '9210', '9220', '9230', '9240', '9250', '9260', '9270', '9280', '9290', '92A0', '92B0', '92C0', '92D0', '92E0', '92F0', '9300', '9310', '9320', '9330', '9340', '9350', '9360', '9370', '9380', '9390', '93A0', '93B0', '93C0', '93D0', '93E0', '93F0', '9400', '9410', '9420', '9430', '9440', '9450', '9460', '9470', '947F', '94C1', '978B', '91F3'];
for (const p of walk(root + '/asm')) {
  const c = fs.readFileSync(p, 'utf8');
  for (const a of addrs) {
    if (c.includes('; $' + a)) { console.log('$' + a + ' → ' + p); break; }
  }
}
