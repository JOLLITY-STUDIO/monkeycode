const fs = require('fs');
const files = [
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/core/nes-ram.ts',
  'd:/studio/github/monkeycode/src/nes/tsubasa2/src/core/ram.ts',
];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  console.log('=== ' + f + ' ===');
  let found = false;
  lines.forEach((l, i) => {
    if (l.includes('nt0') || l.includes('writeNT') || l.includes('readNT') || l.includes('get nt')) {
      console.log((i+1) + ': ' + l.trim());
      found = true;
    }
  });
  if (!found) console.log('  (no match)');
}
