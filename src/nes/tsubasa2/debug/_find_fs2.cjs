const fs = require('fs');
const s = fs.readFileSync('debug/_emu_ref13_bundle.cjs', 'utf8');
const lines = s.split(/\r?\n/);
lines.forEach((l, i) => {
  if ((l.indexOf('fs2') >= 0 || l.indexOf('require') >= 0 || l.indexOf('var path') >= 0 || l.indexOf('const path') >= 0) && i < 8360) {
    console.log(i + ':' + l);
  }
});
