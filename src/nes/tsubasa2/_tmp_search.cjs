const fs = require('fs');
const file = process.argv[2];
const pat = new RegExp(process.argv[3], 'i');
const t = fs.readFileSync(file, 'utf8');
const lines = t.split(/\r?\n/);
lines.forEach((l, i) => {
  if (pat.test(l)) console.log((i + 1) + ': ' + l);
});
