const fs = require('fs');

// Extract Bank 02 code - all lines marked C (code executed)
function bank02Code() {
  const lines = fs.readFileSync('../_tmp_bzk_out/bank_02.asm', 'utf8').split('\n');
  console.log('=== BANK 02 CODE ($8000-$9FFF) ===');
  let prevCode = false;
  let gap = false;
  lines.forEach((l, i) => {
    const isCode = /^C\s/.test(l.substring(0, 5)) && !l.includes('.byte');
    if (isCode) {
      if (!prevCode && i > 0 && gap) console.log('  ... [data gap] ...');
      console.log(`${i+1}: ${l.substring(0, 100).trim()}`);
      prevCode = true;
      gap = false;
    } else {
      if (prevCode) gap = true;
      prevCode = false;
    }
  });
}

// Extract Bank 31 boot code ($E0DF main loop and RESET)
function bank31Boot() {
  const lines = fs.readFileSync('../_tmp_bzk_out/bank_31.asm', 'utf8').split('\n');
  
  // Find $E0DF area
  console.log('\n=== BANK 31 RESET PATH & MAIN LOOP ===');
  lines.forEach((l, i) => {
    if (l.includes('0F:E0DF') || l.includes('0F:E000') || l.includes('0F:FFFA') || 
        l.includes('NMI') || l.includes('RESET') || l.includes('IRQ') ||
        l.includes('JMP $E0DF') || l.includes('STA $8000')) {
      // Print surrounding area
      const start = Math.max(0, i - 3);
      const end = Math.min(lines.length, i + 4);
      for (let j = start; j <= end; j++) {
        console.log(`${j+1}: ${lines[j].trim().substring(0, 100)}`);
      }
      console.log('---');
    }
  });
}

// Extract Bank 01 data (scene pointers, if relevant)
function bank02SceneArea() {
  const lines = fs.readFileSync('../_tmp_bzk_out/bank_02.asm', 'utf8').split('\n');
  console.log('\n=== BANK 02 $A000-$A2FF SCENE CONTROLLER AREA ===');
  lines.forEach((l, i) => {
    if (l.includes('01:A00') || l.includes('01:A10') || l.includes('01:A20') || 
        l.includes('01:A1C') || l.includes('01:A20')) {
      console.log(`${i+1}: ${l.substring(0, 100).trim()}`);
    }
  });
}

bank02Code();
bank31Boot();
bank02SceneArea();
