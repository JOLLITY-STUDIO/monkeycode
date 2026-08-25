const fs = require('fs');
const d = fs.readFileSync('tsc.full.log', 'utf8');
const lines = d.split(/\r?\n/);
const errs = lines.filter(x => /error TS/.test(x));
console.log('Total errors:', errs.length);

// Categorize
const byFile = {};
for (const e of errs) {
  const m = e.match(/^(.+?)\((\d+),(\d+)\):/);
  if (m) {
    const file = m[1];
    byFile[file] = (byFile[file] || 0) + 1;
  }
}
console.log('\n=== By file ===');
Object.entries(byFile).sort((a,b) => b[1]-a[1]).forEach(([f, n]) => {
  console.log(`${n.toString().padStart(3)}  ${f}`);
});
