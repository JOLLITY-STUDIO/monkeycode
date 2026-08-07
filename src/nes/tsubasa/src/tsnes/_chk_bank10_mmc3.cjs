const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const allFiles = fs.readdirSync(dir).filter(f => f.startsWith('bank_') && f.endsWith('.asm'));

// Strategy 1: Search for ANY code that writes bank number to MMC3 registers ($A000/$A001/$C000/$C001/$E000/$E001)
// These are STA $8000 / STA $8001 / STA $A000 / STA $A001 / STA $C000 / STA $C001 / STA $E000 / STA $E001
// But in ASM they might use symbolic names. Let's search for patterns.

// Strategy 2: Search for .byte data that contains $0A as a potential bank index
// In bank table initialization patterns

// Strategy 3: Look for the actual MMC3 PRG bank register writes
// MMC3: $A000=$A001 controls $8000-$9FFF bank (R6), this is how Bank 00/10 are mapped

console.log('=== Strategy: Search for MMC3 register writes + bank index patterns ===\n');

for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  // Look for patterns where $0A is stored as data that could be a bank number
  let found = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    
    // MMC3 register writes for PRG banks (R6=$A000=$8000 window)
    // Bank 10 maps to $8000-$9FFF, so it would be written to $A001 (R6)
    if ((l.includes('STA $A001') || l.includes('STA $8001') || l.includes('STA $C001') || l.includes('STA $E001')) 
        || (l.includes('STX $A001') || l.includes('STX $8001'))
        || (l.includes('STY $A001') || l.includes('STY $8001'))) {
      // Check context for LDA #$0A or similar
      for (let j = i - 1; j >= Math.max(0, i - 8); j--) {
        const ctxL = lines[j].trim();
        if (ctxL.match(/(LDA|LDX|LDY) #\$0A\b/)) {
          found.push(`  L${i+1}: WRITE ${l.substring(0,50)} <- L${j+1}: ${ctxL.substring(0,50)}`);
          break;
        }
      }
    }
    // Also check STA to R6 direct: $A001 or sometimes stored via indirect addresses
  }
  if (found.length > 0) {
    console.log(`--- Bank ${bn} (MMC3 register write) ---`);
    found.forEach(f => console.log(f));
  }
}

// Strategy 4: Check Bank 30 - it's the boot/reset bank. It should have MMC3 init code
console.log('\n=== Bank 30: Full MMC3 initialization analysis ===');
const bank30 = fs.readFileSync(dir + '/bank_30.asm', 'utf8');
const b30lines = bank30.split('\n');

// Find all LDA #$XX before STA $A001 / $8001 (bank register writes)
console.log('MMC3 bank register writes in Bank 30:');
for (let i = 0; i < b30lines.length; i++) {
  const l = b30lines[i].trim();
  if (l.includes('STA $8001') || l.includes('STA $A001')) {
    const ctx = b30lines.slice(Math.max(0, i - 6), i + 1).map((x, idx) => 
      `  L${Math.max(0, i - 6) + idx + 1}: ${x.trim().substring(0, 80)}`).join('\n');
    console.log(`\nMMC3 write at L${i+1}:\n${ctx}`);
  }
}

// Strategy 5: In Bank 30, find function $C4B9 and $CD7C (bank switch functions)
// These likely switch banks by writing to MMC3 registers
console.log('\n=== Bank 30: $C4B9 and $CD7C analysis ===');
for (const target of ['C4B9:', 'CD7C:', 'CD77:', 'CE08:']) {
  for (let i = 0; i < b30lines.length; i++) {
    if (b30lines[i].includes(target)) {
      console.log(`\nFound ${target} at L${i+1}:`);
      console.log(b30lines.slice(i, i + 15).map((x, idx) => `  L${i+idx+1}: ${x.trim().substring(0, 80)}`).join('\n'));
      break;
    }
  }
}

// Strategy 6: Look in the ROM data files for bank 10 mapping information
console.log('\n=== Searching rom-data for bank 10 mapping ===');
const romDataDir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/rom-data';
if (fs.existsSync(romDataDir)) {
  const romFiles = fs.readdirSync(romDataDir);
  for (const rf of romFiles) {
    if (rf.includes('10') || rf.includes('index')) {
      console.log(`  ${rf}`);
    }
  }
}

// Strategy 7: Check ROM index/bank mapping files
const prgBanksDir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/tsubasa-2asm/tsubasa-hex2asm/prg_banks';
if (fs.existsSync(prgBanksDir)) {
  const prgFiles = fs.readdirSync(prgBanksDir);
  const b10 = prgFiles.find(f => f.includes('bank_10'));
  if (b10) {
    console.log(`\nFound prg_bank_10 file: ${b10}`);
  }
}
