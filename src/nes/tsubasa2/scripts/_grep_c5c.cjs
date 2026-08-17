const fs = require('fs');
const path = require('path');
const DIR = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const files = fs.readdirSync(DIR).filter(f => /^bank_(\d+)\.asm$/.test(f));
for (const pat of ['C50C', 'C515', 'C527', 'C536', 'C539', 'CD7C', 'CD89']) {
  console.log('=== $' + pat + ' ===');
  for (const f of files) {
    const c = fs.readFileSync(path.join(DIR, f), 'utf8');
    const lines = c.split(/\r?\n/);
    lines.forEach((l, i) => {
      if (l.includes('0D:' + pat + ':')) {
        console.log(f + ':' + (i + 1) + ': ' + l.trim());
      }
    });
  }
}
