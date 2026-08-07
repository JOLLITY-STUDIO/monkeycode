const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';

// Strategy: Find the function that handles bank switching - look for the pattern
// that writes to $8000 then $8001 with data from ram_0490,X
// Also search for ALL writes to ram_0490-ram_049F range

console.log('=== ALL banks: Who initializes ram_0490-ram_049F? ===');
const allFiles = fs.readdirSync(dir).filter(f => f.startsWith('bank_') && f.endsWith('.asm'));

// First: find the MMC3 write function (the reusable bank switch routine)
// Pattern: ORA #$06; STA $8000; LDA ram_0490,X; STA $8001
console.log('\n--- MMC3 bank-switch functions (STA $8000 + STA $8001) ---');
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  // Find consecutive STA $8000 + STA $8001 patterns
  for (let i = 0; i < lines.length - 3; i++) {
    const l0 = lines[i].trim();   // STA $8000
    const l1 = lines[i+1] ? lines[i+1].trim() : '';
    const l2 = lines[i+2] ? lines[i+2].trim() : '';
    const l3 = lines[i+3] ? lines[i+3].trim() : '';
    
    if (l0.includes('STA $8000') && 
        (l1.includes('STA $8001') || l2.includes('STA $8001') || l3.includes('STA $8001'))) {
      // Found a pair - show context
      console.log(`\nBank ${bn} at L${i+1}:`);
      lines.slice(Math.max(0, i - 5), i + 5).forEach((l, idx) => 
        console.log(`  ${l.substring(0, 90).trim()}`));
      i += 3;
    }
  }
}

// Second: Search for writes INTO ram_0490-ram_049F (initialization)
console.log('\n\n=== ALL banks: STA/STX/STY ram_0490-ram_049F (RAM array init) ===');
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.match(/(STA|STX|STY)\s+ram_049[0-9A-Fa-f]/i)) {
      console.log(`\nBank ${bn} L${i+1}:`);
      lines.slice(Math.max(0, i - 3), i + 4).forEach((l2, idx) => 
        console.log(`  ${l2.substring(0, 90).trim()}`));
    }
  }
}

// Third: Search for the bank switch entry point called via JSR - look for RTS after MMC3 writes
console.log('\n\n=== Bank 30: All MMC3 write sequences (complete routines) ===');
const bank30 = fs.readFileSync(dir + '/bank_30.asm', 'utf8');
const b30l = bank30.split('\n');
let inRoutine = false;
for (let i = 0; i < b30l.length; i++) {
  if (b30l[i].includes('STA $8000') && b30l[i].includes('C - - - -')) {
    // Find the nearest RTS after this
    let rtsLine = -1;
    for (let j = i + 1; j < Math.min(b30l.length, i + 30); j++) {
      if (b30l[j].includes('RTS') && b30l[j].includes('C')) { rtsLine = j; break; }
      if (b30l[j].includes('JMP') && b30l[j].includes('C')) { rtsLine = j; break; }
    }
    if (rtsLine > 0) {
      // Find the label/subroutine start
      let startLine = i;
      for (let j = i - 1; j >= Math.max(0, i - 40); j--) {
        if (b30l[j].includes('C D 0') || b30l[j].includes(':') && !b30l[j].includes('LDA') && !b30l[j].includes('STA') && !b30l[j].includes('JSR') && !b30l[j].includes('RTS') && b30l[j].match(/\w+:/)) {
          startLine = j;
          break;
        }
      }
      console.log(`\n--- Routine L${startLine+1}-L${rtsLine+1} ---`);
      b30l.slice(startLine, rtsLine + 2).forEach((l, idx) => 
        console.log(`  ${l.substring(0, 90).trim()}`));
      i = rtsLine;
    }
  }
}
