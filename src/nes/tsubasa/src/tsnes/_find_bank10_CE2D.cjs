const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const allFiles = fs.readdirSync(dir).filter(f => f.startsWith('bank_') && f.endsWith('.asm'));

// The actual MMC3 bank switch function: Bank 30 $CE2D (L2439-2451)
// ram_0024 → MMC3 R6 ($8000-$9FFF), ram_0025 → R7($A000-$BFFF)
// So we search for: LDA #$0A → STA ram_0024 → JSR $CE2D pattern
// OR any path that puts $0A into ram_0024

console.log('=== ALL banks: LDA/LDX/LDY #$0A → STA/STX/STY ram_0024 or ram_0025 ===');
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('STA ram_0024') || lines[i].includes('STA ram_0025') || lines[i].includes('STX ram_0024') || lines[i].includes('STX ram_0025')) {
      // Check 1-6 lines before for LDA/LDX/LDY #$0A
      let found = false;
      for (let j = Math.max(0, i - 6); j < i; j++) {
        if (lines[j].match(/(LDA|LDX|LDY) #\$0[Aa]\b/)) {
          console.log(`\nBank ${bn} L${i+1}: ${lines[i].trim().substring(0,60)}`);
          console.log(`  ← L${j+1}: ${lines[j].trim().substring(0,60)}`);
          lines.slice(Math.max(0, j - 2), i + 3).forEach(l => console.log(`    ${l.trim().substring(0,80)}`));
          found = true;
          break;
        }
      }
      if (!found) {
        // Show what sets ram_0024
        for (let j = Math.max(0, i - 6); j < i; j++) {
          if (lines[j].includes('LDA #$') || lines[j].includes('LDX #$') || lines[j].includes('LDY #$') || 
              lines[j].includes('LDA ram_') || lines[j].includes('PLA')) {
            console.log(`\nBank ${bn} L${i+1}: ${lines[i].trim().substring(0,60)}`);
            console.log(`  ← L${j+1}: ${lines[j].trim().substring(0,55)}`);
            break;
          }
        }
      }
    }
  }
}

// Also search for indirect writes: TAX → LDX #$0A → STX ram_0024
// Or calculated values: ADC → ram_0024

// And search specifically in Bank 30 for what calls CE2D with Bank 10
console.log('\n\n=== Bank 30: who calls $CE2D and with what ram_0024 values? ===');
const bank30 = fs.readFileSync(dir + '/bank_30.asm', 'utf8');
const b30l = bank30.split('\n');

// Find all JSR $CE2D / JMP $CE2D calls
let ce2dCallers = [];
for (let i = 0; i < b30l.length; i++) {
  if (b30l[i].includes('JSR $CE2D') || b30l[i].includes('JMP $CE2D')) {
    // Get context: what value is in ram_0024?
    let ram24Val = null;
    for (let j = i - 1; j >= Math.max(0, i - 15); j--) {
      if (b30l[j].includes('STA ram_0024') || b30l[j].includes('STX ram_0024')) {
        // Find what was loaded
        for (let k = j - 1; k >= Math.max(0, j - 4); k--) {
          const m = b30l[k].match(/LDA #\$([0-9A-Fa-f]{2})/);
          if (m) { ram24Val = m[1]; break; }
          const n = b30l[k].match(/LDA ram_00([0-9A-Fa-f]{2})/);
          if (n) { ram24Val = 'ram_00' + n[1].toLowerCase(); break; }
        }
        break;
      }
    }
    ce2dCallers.push({ line: i+1, ram24: ram24Val || 'unknown', ctx: b30l.slice(Math.max(0,i-5), i+2).map(l => l.trim().substring(0,80)).join(' | ') });
  }
}
console.log(`Found ${ce2dCallers.length} calls to $CE2D:`);
ce2dCallers.forEach(c => {
  console.log(`\nL${c.line}: ram_0024=${c.ram24}`);
  console.log(`  ${c.ctx.substring(0, 200)}`);
});

// Also look for $C4B9 calls — these are the "bank switch proxy" calls from Bank 00
console.log('\n\n=== ALL banks: who calls $C4B9? ===');
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('JSR $C4B9') || lines[i].includes('JMP $C4B9')) {
      let xVal = null;
      for (let j = i - 1; j >= Math.max(0, i - 3); j--) {
        const m = lines[j].match(/LDX #\$([0-9A-Fa-f]{2})/);
        if (m) { xVal = m[1]; break; }
      }
      if (xVal === '0A') {
        console.log(`\n!! Bank ${bn} L${i+1}: JSR $C4B9 with X=$0A !!`);
        lines.slice(Math.max(0,i-3), i+2).forEach(l => console.log(`  ${l.trim().substring(0,80)}`));
      }
    }
  }
}
