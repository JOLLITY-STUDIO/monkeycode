const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const allFiles = fs.readdirSync(dir).filter(f => f.startsWith('bank_') && f.endsWith('.asm'));

// KEY: ram_0490-ram_0497 are populated by copying from ram_0526-ram_0529 area
// Find where ram_0526-ram_052D get written (the bank config table)

console.log('=== Search: STA ram_0526-ram_052D (bank config init) ===');
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/(STA|STX|STY)\s+ram_052[6789ABCD]/i)) {
      console.log(`\nBank ${bn} L${i+1}:`);
      lines.slice(Math.max(0, i - 4), i + 5).forEach(l => console.log(`  ${l.substring(0, 95).trim()}`));
    }
  }
}

// Also search for .byte data tables that fill ram_052x
console.log('\n\n=== Search: LDA #$XX followed by STA ram_052x near bank init ===');
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  for (let i = 1; i < lines.length; i++) {
    // Look for LDX/LDA/LDY with immediate, then STA to ram_052x
    if (lines[i].match(/(LDA|STA)\s+ram_052[6789]/i)) {
      // Check if previous line has LDA #$XX
      if (lines[i-1].match(/LDA #\$/i)) {
        console.log(`Bank ${bn} L${i}: ${lines[i-1].trim().substring(0,50)} | ${lines[i].trim().substring(0,50)}`);
      }
    }
  }
}

// Also check Bank 31 more carefully - it may have the reset/boot init
console.log('\n\n=== Bank 31: MMC3 boot init (reset vector) ===');
const bank31 = fs.readFileSync(dir + '/bank_31.asm', 'utf8');
const b31l = bank31.split('\n');
// Find the reset vector (usually at $FFFC-$FFFD)
for (let i = b31l.length - 1; i >= 0; i--) {
  if (b31l[i].includes('FFFC') || b31l[i].includes('FFFD')) {
    console.log(`Reset vector near L${i+1}: ${b31l[i].trim().substring(0,80)}`);
  }
}
// Also search for the boot init code that sets up initial bank config
let foundInit = false;
for (let i = 0; i < b31l.length && !foundInit; i++) {
  // Look for consecutive LDA #$XX; STA ram_0526 patterns
  if (b31l[i].includes('STA ram_0526')) {
    console.log(`\nL${i+1}: Bank 31 ram_0526 init:`);
    b31l.slice(Math.max(0, i - 8), i + 8).forEach(l => console.log(`  ${l.substring(0, 95).trim()}`));
    foundInit = true;
  }
}

// Final search: look for ROM/PRG bank table initialization
// These are often data tables like: .byte bank0, bank1, bank2, ...
console.log('\n\n=== Search: .byte data tables with consecutive $xx values (bank config tables) ===');
for (const file of allFiles.slice(0, 5)) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  // Find .byte tables with 4-8 values that could be bank configs
  for (let i = 0; i < lines.length - 4; i++) {
    if (lines[i].includes('.byte') && lines[i+1].includes('.byte') && lines[i+2].includes('.byte')) {
      const vals = [lines[i], lines[i+1], lines[i+2], lines[i+3] || ''];
      const allBytes = vals.every(v => v.includes('.byte') && v.match(/\$[0-9A-F]{2}/));
      if (allBytes) {
        const bytes = vals.map(v => {
          const m = v.match(/\$([0-9A-F]{2})/g);
          return m ? m : [];
        });
        // Check if values look like bank numbers (ascending-ish, 0x00-0x1F range)
        const flat = bytes.flat();
        const nums = flat.map(v => parseInt(v.slice(1), 16));
        if (nums.every(n => n >= 0 && n <= 0x20) && nums.length >= 4) {
          console.log(`Bank ${bn} L${i+1}:`);
          vals.forEach((v, idx) => console.log(`  ${v.substring(0, 90).trim()}`));
          i += 4;
        }
      }
    }
  }
}
