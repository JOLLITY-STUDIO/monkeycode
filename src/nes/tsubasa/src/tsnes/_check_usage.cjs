const fs = require('fs');
const c = fs.readFileSync('game-engine/native-game/tsubasa/banks/prg/bank-01-code.ts', 'utf8');

// Find where each table is actually used in code
[0x943D, 0x96DB, 0x9DF2, 0x9F15].forEach(a => {
  const h = a.toString(16);
  console.log('=== searching DATA_0x' + h + ' ===');
  // Find all references
  let i = 0;
  const search = 'DATA_$' + h;
  while (i < c.length) {
    i = c.indexOf(search, i);
    if (i < 0) break;
    const ctx = c.substring(Math.max(0, i - 100), i + 400);
    console.log('---');
    console.log(ctx);
    console.log();
    i += 10;
  }
});

// Also find function that references these - look for function names near them
console.log('=== functions containing DATA_$9 ===');
const lines = c.split('\n');
lines.forEach((l, n) => {
  if (l.includes('DATA_$9') && !l.includes('import')) {
    console.log(n + ':' + l.trim().substring(0, 150));
    // Show 5 lines before and after
    for (let j = Math.max(0, n - 5); j <= Math.min(lines.length - 1, n + 5); j++) {
      if (j !== n) console.log('  ' + j + ': ' + lines[j].trim().substring(0, 150));
    }
    console.log();
  }
});
