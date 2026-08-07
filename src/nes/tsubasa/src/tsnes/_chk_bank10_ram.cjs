const fs = require('fs');
const dir = 'd:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out';

// Critical insight: MMC3 writes use ram_0490,X as bank number source.
// So we need to find WHO writes $0A into ram_0490/ram_0491/etc.

// First, find the bank switch function itself (the code at C4B9 or CD7C)
const bank30 = fs.readFileSync(dir + '/bank_30.asm', 'utf8');
const b30lines = bank30.split('\n');

console.log('=== Bank 30: Finding $C4B9 and $CD7C ===');
for (const addr of ['C4B9', 'CD7C', 'CD77']) {
  // Line format: something like "0xXXXXXX 0F:C4B9: xx xx ..."
  let found = false;
  for (let i = 0; i < b30lines.length; i++) {
    if (b30lines[i].includes('0F:' + addr.replace('$','') + ':')) {
      console.log(`\n$${addr} at line ${i+1}:`);
      b30lines.slice(i, i + 20).forEach((l, idx) => console.log(`  ${l.trim().substring(0, 90)}`));
      found = true;
      break;
    }
  }
  if (!found) console.log(`\n$${addr}: NOT FOUND in Bank 30`);
}

// Now search ALL banks for writes to ram_0490-ram_049F with value $0A
console.log('\n\n=== ALL banks: searching for STA ram_049x with LDA #$0A nearby ===');
const allFiles = fs.readdirSync(dir).filter(f => f.startsWith('bank_') && f.endsWith('.asm'));
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    // Match STA to ram_04XX range
    if (lines[i].includes('STA ram_04') || lines[i].includes('STX ram_04') || lines[i].includes('STY ram_04')) {
      // Check nearby for LDA/LDX/LDY #$0A
      let foundLoad = false;
      for (let j = Math.max(0, i - 6); j < i; j++) {
        if (lines[j].match(/(LDA|LDX|LDY) #\$0[Aa]\b/)) {
          foundLoad = j;
          break;
        }
      }
      if (foundLoad) {
        console.log(`Bank ${bn} L${i+1}: ${lines[i].trim().substring(0,60)}  <<  L${foundLoad+1}: ${lines[foundLoad].trim().substring(0,40)}`);
      }
    }
  }
}

// Also search for patterns like: write to ppu buffer area that contains bank numbers
// In some games, bank switch requests are queued in a buffer
console.log('\n\n=== ALL banks: .byte data containing $0A as potential bank index ===');
// Look for data tables that have structure like: [scene_id, bank_number, ...]
for (const file of allFiles) {
  const bn = file.match(/bank_(\d+)\.asm/)[1];
  const c = fs.readFileSync(dir + '/' + file, 'utf8');
  const lines = c.split('\n');
  
  // Find consecutive .byte lines that contain $0A in a meaningful position
  for (let i = 0; i < lines.length - 3; i++) {
    if (lines[i].trim().startsWith('.byte') && lines[i].includes('$0A')) {
      // Check if surrounded by other .byte entries that look like a table
      let tableLines = [];
      for (let j = i - 3; j <= i + 3; j++) {
        if (j >= 0 && j < lines.length) {
          const l = lines[j].trim();
          if (l.startsWith('.byte') || l.startsWith('.word') || l.startsWith(';')) {
            tableLines.push(`  L${j+1}: ${l.substring(0,70)}`);
          }
        }
      }
      if (tableLines.length >= 2) {
        console.log(`\nBank ${bn} table near L${i+1}:`);
        tableLines.forEach(x => console.log(x));
        i += 3; // skip ahead
      }
    }
  }
}
