const fs = require('fs');
const p = '_tmp_bzk_out/Captain Tsubasa II - Super Striker (Japan).cdl';
const s = fs.readFileSync(p, 'utf8');
const lines = s.split('\n');
let out = [];
lines.forEach((l, i) => {
  if (l.includes('A8CE')) out.push((i + 1) + ': ' + l.trim().slice(0, 160));
});
console.log(out.slice(0, 20).join('\n') || '(no A8CE)');
