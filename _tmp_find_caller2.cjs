const fs = require('fs');

// Search for JSR/JMP to $84E3 across all banks
console.log('=== Who calls $84E3 (interpreter main loop) ===');
for (let b = 0; b <= 15; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2,'0') + '.asm', 'utf8');
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('84E3') && !lines[i].startsWith('  0x') && !lines[i].includes('$84E3:')) {
        let ctx = '';
        for (let j = Math.max(0, i-8); j <= Math.min(lines.length-1, i+3); j++) {
          if (j === i) ctx += '>>> ';
          else ctx += '    ';
          ctx += (j+1) + ': ' + lines[j] + '\n';
        }
        console.log(`bank_${b.toString().padStart(2,'0')}:`, lines[i].trim());
        console.log(ctx + '---');
      }
    }
  } catch(e) {}
}

// Also search for JSR/JMP to $84B0 which might be the entry point  
console.log('\n=== Who calls $84B0 ===');
for (let b = 0; b <= 15; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2,'0') + '.asm', 'utf8');
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('84B0') && !lines[i].startsWith('  0x') && !lines[i].includes('$84B0:')) {
        let ctx = '';
        for (let j = Math.max(0, i-5); j <= Math.min(lines.length-1, i+3); j++) {
          ctx += '  ' + (j+1) + ': ' + lines[j] + '\n';
        }
        console.log(`bank_${b.toString().padStart(2,'0')}:`, lines[i].trim(), '\n' + ctx + '---');
      }
    }
  } catch(e) {}
}

// Search for $8862 or $8879 (bytecode dispatch/advance)
console.log('\n=== Who calls $8862 (parse next bytecode) ===');
for (let b = 0; b <= 15; b++) {
  try {
    const s = fs.readFileSync('_tmp_bzk_out/bank_' + b.toString().padStart(2,'0') + '.asm', 'utf8');
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('8862') && !lines[i].startsWith('  0x') && !lines[i].includes('$8862:')) {
        console.log(`bank_${b}:${i+1}: ${lines[i]}`);
      }
    }
  } catch(e) {}
}
