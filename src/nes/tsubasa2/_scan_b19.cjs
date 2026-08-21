// 扫描 src 下所有 PRG_BANK / prg-bank-XX 残留引用
const fs = require('fs');
const path = require('path');
const root = 'src';
const hits = [];
function walk(p) {
  for (const f of fs.readdirSync(p)) {
    const fp = path.join(p, f);
    if (fs.statSync(fp).isDirectory()) walk(fp);
    else if (/\.ts$/.test(f)) {
      const c = fs.readFileSync(fp, 'utf8');
      c.split(/\r?\n/).forEach((l, i) => {
        if (/PRG_BANK|prg-bank-|readMem|bankSwitch|mmc3Map|readByte\(|readU16\(|_readBank/.test(l) && !l.trim().startsWith('*') && !l.trim().startsWith('//')) {
          hits.push(fp + ':' + (i + 1) + ': ' + l.trim());
        }
      });
    }
  }
}
walk(root);
console.log('TOTAL HITS: ' + hits.length);
hits.forEach(h => console.log(h));
