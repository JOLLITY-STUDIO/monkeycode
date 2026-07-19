const fs = require('fs');
const text = fs.readFileSync('src/nes/tsubasa/disasm/prg_annotated.txt', 'utf8');
const lines = text.split('\n');

// First, find where Bank $02 code starts
let bank2Start = -1;
let bank3Start = -1;
for (let i = 0; i < lines.length; i++) {
  if (bank2Start === -1 && (lines[i].startsWith('; Bank $02') || lines[i].startsWith('Bank $02'))) {
    bank2Start = i;
  }
  if (bank3Start === -1 && bank2Start !== -1 && (lines[i].startsWith('; Bank $03') || lines[i].startsWith('Bank $03'))) {
    bank3Start = i;
    break;
  }
}

console.log('Bank $02 starts at line:', bank2Start);
console.log('Bank $03 starts at line:', bank3Start);
if (bank2Start >= 0 && bank3Start >= 0) {
  console.log('Bank $02 line count:', bank3Start - bank2Start);
}

// Print Bank $02 lines, looking for code that loads player data
if (bank2Start >= 0) {
  const end = bank3Start >= 0 ? bank3Start : Math.min(bank2Start + 500, lines.length);
  for (let i = bank2Start; i < end; i++) {
    const l = lines[i];
    // Print lines that reference player-related RAM or JSR
    if (l.includes('$60') || l.includes('$61') || l.includes('$5E') || 
        l.includes('$67') || l.includes('$68') || l.includes('$69') ||
        l.includes('$C4B9') || l.includes('bank') || l.includes('Bank') ||
        l.includes('JSR') || l.includes('JMP') || 
        l.match(/\$[89A-C][0-9A-F]{3}/)) {
      console.log(l.substring(0, 200));
    }
  }
}
