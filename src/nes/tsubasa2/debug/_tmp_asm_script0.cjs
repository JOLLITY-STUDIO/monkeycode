const fs = require('fs');
const c = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa2/asm/bank03/data_tables.s', 'utf8');
const lines = c.split('\n');
console.log('total lines:', lines.length);
// find label lines (labels look like "name:" at col 0)
const labels = [];
lines.forEach((l, i) => {
  const m = l.match(/^([A-Za-z_][\w]*):/);
  if (m) labels.push({ i, name: m[1], line: l.trim().slice(0, 100) });
});
console.log('labels:', labels.length);
labels.slice(0, 40).forEach(x => console.log('  ' + x.i + ': ' + x.name));
