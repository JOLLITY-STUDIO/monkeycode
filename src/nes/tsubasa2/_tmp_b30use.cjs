const fs = require('fs');
const path = require('path');
const dir = 'src/game/service';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));
// bank30 API 入口 (跳转表 + 已知入口)
const apis = ['$C500','$C506','$C509','$C50F','$C515','$C51B','$C51E','$C521','$C524','$C527','$C530','$C533','$C536','$C539','$C542','$C545','$C548','$C54B','$C54E','$C551','$C554','$C55A','$C55D','$C560','$C563','$C569','$C56C','$C56F','$C572','$C578','$C57B',
'$C400','$C401','$C557','$C64E','$CBB0','$CD3C','$CE08','$CD77','$CBC2','$CB0F','$CB02','$CB35','$CB99','$CAE7','$CC02','$CCD2','$CDC9','$CDE2','$CE4D','$CE4A','$CE99','$CE6E','$CEFE','$CF4F','$CBF1','$CF72','$CF8F','$D022','$D093','$DB62','$D0D1','$C6BE','$C821','$C76E'];
for (const f of files) {
  const s = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = s.split('\n');
  for (const a of apis) {
    const hits = [];
    lines.forEach((l, i) => { if (l.includes(a)) hits.push((i + 1) + ':' + l.trim().slice(0, 80)); });
    if (hits.length) {
      console.log(f + '  [' + a + ']');
      hits.forEach(h => console.log('    ' + h));
    }
  }
}
