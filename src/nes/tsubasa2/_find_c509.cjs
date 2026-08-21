const fs = require('fs');
const path = require('path');
function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(p));
    else if (e.name.endsWith('.s')) out.push(p);
  }
  return out;
}
for (const f of walk('asm/bank30')) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((ln, i) => {
    if (/C509|\$C509/i.test(ln)) {
      const start = Math.max(0, i - 12);
      const end = Math.min(lines.length, i + 16);
      console.log(`=== ${f}:${i + 1} ===`);
      for (let j = start; j < end; j++) console.log(`${j + 1}|${lines[j]}`);
      console.log('');
    }
  });
}
