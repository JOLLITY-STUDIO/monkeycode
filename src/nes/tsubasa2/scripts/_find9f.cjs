const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'src', 'asm', 'bank00', 'code_sub.s');
const c = fs.readFileSync(p, 'utf8').split('\n');
c.forEach((l, i) => {
  if (/\$9F69|\$9FA8|\$9FB8|\$9F73|\$9F76/.test(l)) {
    console.log((i + 1) + ': ' + l.trim());
  }
});
