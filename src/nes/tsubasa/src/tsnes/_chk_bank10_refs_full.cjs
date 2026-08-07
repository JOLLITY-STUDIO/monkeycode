const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';
const files = fs.readdirSync(dir).filter(f => f.startsWith('bank_') && f.endsWith('.asm'));
const allResults = {};

for (const file of files) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  const refs = [];

  // Search for LDA #$0A or LDA #$10 before JSR $9FA8 or JSR $C4B9
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if ((l.includes('JSR $9FA8') || l.includes('JSR $C4B9') || l.includes('JMP $9FA8') || l.includes('JMP $C4B9')) 
         && (l.includes('JSR') || l.includes('JMP'))) {
      for (let j = i - 1; j >= Math.max(0, i - 6); j--) {
        const pl = lines[j].trim();
        const mL = pl.match(/LDA #\$0A\b/);
        const mX = pl.match(/LDX #\$0A\b/);
        const mY = pl.match(/LDY #\$0A\b/);
        if (mL || mX || mY) {
          refs.push({ line: i + 1, reg: (mL || mX || mY)[0], ctx: l.substring(0, 60) });
          break;
        }
      }
    }
    // Also check LDA #$0A followed by STA somewhere that becomes bank switch
    if (l.includes('LDA #$0A') || l.includes('LDA #$10')) {
      const ctx = lines.slice(Math.max(0, i - 2), Math.min(lines.length, i + 4)).join(' \\ ');
      // Only report if near a bank-related operation
      if (ctx.includes('9FA8') || ctx.includes('C4B9') || ctx.includes('A000') || ctx.includes('8000') || ctx.includes('E000')) {
        refs.push({ line: i + 1, reg: l.match(/LDA #\$(0A|10)/)[0], ctx: 'CTX=\'' + ctx.substring(0, 120) + '\'' });
      }
    }
  }

  // Search for $0A in data tables that might be bank indices
  let bankDataRefs = [];
  const searchBank0A = /\.byte\s+.*\$0[Aa]\b.*$/gi;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(searchBank0A)) {
      // Only report if within a structured data table (has '.byte' with multiple values)
      const context = lines.slice(Math.max(0, i - 1), Math.min(lines.length, i + 2)).join(' | ');
      if (context.includes('.byte') && !context.includes('$0A,')) continue; // skip single $0A values
      bankDataRefs.push({ line: i + 1, text: lines[i].trim().substring(0, 100) });
    }
  }
  if (bankDataRefs.length > 0 && bankDataRefs.length <= 20) {
    // Only report if there's a plausible bank-index table
    allResults[bn] = { bankSwitches: refs, dataTables: bankDataRefs };
  } else if (refs.length > 0) {
    allResults[bn] = { bankSwitches: refs };
  }
}

console.log('=== Banks with LDA/LDX/LDY #$0A before bank switch ===');
for (const [bn, r] of Object.entries(allResults)) {
  if (r.bankSwitches && r.bankSwitches.length > 0) {
    console.log(`\n--- Bank ${bn} ---`);
    r.bankSwitches.forEach(x => console.log(`  L${x.line}: ${x.reg} | ${x.ctx}`));
  }
}

console.log('\n=== Banks with $0A in potential bank-index tables ===');
for (const [bn, r] of Object.entries(allResults)) {
  if (r.dataTables && r.dataTables.length > 0) {
    console.log(`\n--- Bank ${bn} (${r.dataTables.length} entries) ---`);
    r.dataTables.forEach(x => console.log(`  L${x.line}: ${x.text}`));
  }
}

// Also check Bank 30 for any indirect bank switching mechanism
console.log('\n=== Bank 30: searching for bank-switch tables/vectors ===');
const bank30 = fs.readFileSync(dir + '/bank_30.asm', 'utf8');
const b30lines = bank30.split('\n');
// Look for LDA #$0A in bank 30 context
let b30Context = [];
for (let i = 0; i < b30lines.length; i++) {
  if (b30lines[i].includes('LDA #$0A') || b30lines[i].includes('LDX #$0A') || b30lines[i].includes('LDY #$0A')) {
    const ctx = b30lines.slice(Math.max(0, i - 2), Math.min(b30lines.length, i + 4)).join('\\n');
    b30Context.push({ line: i + 1, ctx: ctx.substring(0, 200) });
  }
}
if (b30Context.length > 0) {
  b30Context.forEach(x => console.log(`  L${x.line}: ${x.ctx}`));
} else {
  console.log('  NO LDA/LDX/LDY #$0A found in Bank 30');
}

// Check Bank 31 too
console.log('\n=== Bank 31: searching for $0A ===');
const bank31 = fs.readFileSync(dir + '/bank_31.asm', 'utf8');
const b31lines = bank31.split('\n');
let b31Context = [];
for (let i = 0; i < b31lines.length; i++) {
  if (b31lines[i].includes('LDA #$0A') || b31lines[i].includes('LDX #$0A') || b31lines[i].includes('LDY #$0A')) {
    const ctx = b31lines.slice(Math.max(0, i - 2), Math.min(b31lines.length, i + 4)).join(' | ');
    b31Context.push({ line: i + 1, ctx: ctx.substring(0, 200) });
  }
}
if (b31Context.length > 0) {
  b31Context.forEach(x => console.log(`  L${x.line}: ${x.ctx}`));
} else {
  console.log('  NO LDA/LDX/LDY #$0A found');
}
