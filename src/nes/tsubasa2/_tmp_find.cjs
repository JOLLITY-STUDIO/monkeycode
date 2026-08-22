const fs = require('fs');
function walk(d, out, dep = 0) {
  if (dep > 7) return;
  let it;
  try { it = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
  for (const x of it) {
    const p = d + '/' + x.name;
    if (x.isDirectory()) walk(p, out, dep + 1);
    else if (x.name.endsWith('.ts')) out.push(p);
  }
}
const files = [];
walk('src/game', files);
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  if (/controller_1|controller_2|input_mask|_readInput|readInput|ram_001E|ram_001F/.test(c)) {
    console.log('=== ' + f);
    const lines = c.split('\n');
    lines.forEach((l, i) => {
      if (/controller_1|controller_2|input_mask|_readInput|readInput|ram_001E|ram_001F/.test(l)) {
        console.log((i + 1) + ': ' + l.trim());
      }
    });
  }
}
