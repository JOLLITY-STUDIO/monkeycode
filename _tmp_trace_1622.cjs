const fs = require('fs');
const lines = fs.readFileSync('src/nes/tsubasa/romdata/Captain Tsubasa II - Super Striker (Japan).log', 'utf8').split('\n');

// Line 1622 is where user found: Y=09, $06:8104, $8AB5=#$0B
// Let's trace what happens around there
const idx = 1622 - 1; // 0-indexed

// First find the real (non-skipped) lines around this area
console.log('=== Context around line 1622 ===');
for (let i = Math.max(0, idx - 5); i < Math.min(lines.length, idx + 30); i++) {
  console.log((i+1) + ': ' + lines[i]);
}

// Also look for the entire flow: what reads $8AB5, then what calls what
// Search for lines between frame 1632 and 1634 with $06:81xx addresses
console.log('\n=== All non-skipped $06:81xx lines ===');
for (let i = 0; i < lines.length; i++) {
  if (/\$06:81/.test(lines[i]) && !/skipped/.test(lines[i])) {
    console.log((i+1) + ': ' + lines[i]);
  }
}

// Also check what calls into $80FE/$8104
console.log('\n=== JSR to $80FE / $8104 area ===');
for (let i = 0; i < lines.length; i++) {
  if (/\$06:8[01]/.test(lines[i]) && /JSR|JMP/.test(lines[i]) && !/skipped/.test(lines[i])) {
    console.log((i+1) + ': ' + lines[i]);
  }
}
