const fs = require('fs');
const s = fs.readFileSync('src/asm/bank02/_full.s', 'utf8').split(/\r?\n/);
for (const pat of ['A855', 'A86E', 'A8CE', 'A484', 'A491', 'A677', 'A72C', 'A767', 'A82F']) {
  const idxs = [];
  s.forEach((l, i) => { if (l.includes(pat)) idxs.push(i + 1); });
  console.log(pat, '->', idxs.join(','));
}
