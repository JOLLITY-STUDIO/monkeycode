const fs = require('fs');

// Read bank_06 disassembly
const lines = fs.readFileSync('_tmp_bzk_out/bank_06.asm', 'utf8').split('\n');

console.log('=== Lines with 80FE or 8104 or 8AB0 ===');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('80FE') || lines[i].includes('8104') || lines[i].includes('8AB0')) {
    console.log((i+1) + ': ' + lines[i]);
  }
}

// Also read the context around 80FE/8104
console.log('\n=== Context around 80FE/8104 addresses ===');
const codeLines = fs.readFileSync('_tmp_bzk_out/bank_06.asm', 'utf8').split('\n');
for (let i = 0; i < codeLines.length; i++) {
  if (codeLines[i].includes('$80FE') || codeLines[i].includes('$8104') || codeLines[i].includes('$80F')) {
    const start = Math.max(0, i - 5);
    const end = Math.min(codeLines.length, i + 10);
    console.log(`\n--- Around line ${i+1} ---`);
    for (let j = start; j < end; j++) {
      console.log((j+1) + ': ' + codeLines[j]);
    }
  }
}
