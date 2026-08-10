// Find and patch BGM start byte in prg-bank-15.ts
const fs = require('fs');
const f = 'rom-data/prg-bank-15.ts';
const c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Look for the pattern near BGM start (0x17AD)
// Expected: ... 0x05, 0xea, 0x04, 0xba, 0xb7, 0x05, ...
lines.forEach((l, i) => {
  if (l.includes('0xea') && l.includes('0xba') && l.includes('0xb7')) {
    console.log('L' + (i + 1) + ': ' + l.trim());
  }
});
