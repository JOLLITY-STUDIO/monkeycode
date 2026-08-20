const fs = require('fs');
const path = require('path');
const d = 'd:/studio/github/monkeycode/src/nes/tsubasa2/_tmp_bzk_out/bank_00';
const src = [];
for (const f of fs.readdirSync(d).filter(x => /\.asm$/.test(x))) {
  const ls = fs.readFileSync(path.join(d, f), 'utf8').split('\n');
  ls.forEach((l, i) => {
    if (/JSR \$8A|JMP \$8A|JSR \$8B|JMP \$8B|JSR \$88|JSR \$9A/.test(l)) {
      src.push(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 95));
    }
  });
}
console.log(src.slice(0, 80).join('\n'));
