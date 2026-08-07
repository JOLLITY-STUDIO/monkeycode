const fs = require('fs');
const lines = fs.readFileSync('bank_02.asm', 'utf8').split('\n');

// Find code sections with CDL markers
let codeCount = 0;
lines.forEach((l, i) => {
  const trimmed = l.trim();
  if (/^C\s+[DC\s]\s*-[^F]/.test(trimmed.substring(0, 20)) && !trimmed.includes('.byte') && !trimmed.includes('JSR $A1CB')) {
    codeCount++;
    if (codeCount <= 200) {
      console.log(`L${i+1}: ${trimmed.substring(0, 100)}`);
    }
  }
});
console.log(`\nTotal code lines: ${codeCount}`);
