const fs = require('fs');

// Search for digit decomposition: subtract 100 loop
// Pattern: SBC #100 / SBC #$64
console.log('=== Search for division-by-100 patterns ===');

for (let b = 0; b <= 15; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2, '0') + '.asm', 'utf8');
    const lines = s.split('\n');
    
    // Look for SBC #$64 (100 in hex) or CMP #$64
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('#$64') && 
          (lines[i].includes('SBC') || lines[i].includes('CMP') || lines[i].includes('ADC'))) {
        // Show block of code
        let start = Math.max(0, i - 10);
        let end = Math.min(lines.length - 1, i + 15);
        console.log(`bank_${b.toString().padStart(2,'0')}.asm:${i+1}: ${lines[i]}`);
        for (let j = start; j <= end; j++) {
          let prefix = j === i ? '>>> ' : '    ';
          console.log(prefix + (j+1) + ': ' + lines[j]);
        }
        console.log('---');
      }
    }
  } catch(e) {}
}
