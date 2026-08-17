const fs = require('fs');

function searchCode(filename, searchAddr, contextLen) {
  const lines = fs.readFileSync(filename, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    // Match the address in format like "01:XXXX:" or "0F:XXXX:"
    if (lines[i].includes(':' + searchAddr + ':') && /^C/.test(lines[i])) {
      console.log('$' + searchAddr + ' at L' + (i+1) + ':');
      const start = Math.max(0, i - 2);
      const end = Math.min(lines.length, i + contextLen);
      for (let j = start; j < end; j++) {
        const prefix = (j === i) ? '>>>' : '   ';
        console.log(prefix + ' L' + (j+1).toString().padStart(6) + ': ' + lines[j].trim().substring(0, 115));
      }
      console.log('');
      return;
    }
  }
  console.log('$' + searchAddr + ' NOT FOUND\n');
}

// Bank 31: $8000 offset = $8000 (cpu $E000)
// 80DF = E0DF - 8000 + 8000? No... Let me use the actual CPU offset
// In Bank 31 asm: addresses are 01:8000 = cpu $E000 (starting from 0x3E010)
// So $E0DF cpu = $E0DF - $E000 + $8000 = $80DF

console.log('=== BANK 31: $80DF (cpu $E0DF) main loop ===');
searchCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm', '80DF', 25);

console.log('=== BANK 31: $A233 (cpu $E233) ===');
searchCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm', 'A233', 20);

console.log('=== BANK 02: $A21B (scene command dispatch) ===');
searchCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', 'A21B', 35);

console.log('=== BANK 02: $A1CB (sub call from NMI) ===');
searchCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', 'A1CB', 20);

console.log('=== BANK 02: $A200 area ===');
const lines02 = fs.readFileSync('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm', 'utf8').split('\n');
console.log('Searching $A200-$A240 in bank_02.asm:');
lines02.forEach((l, i) => {
  if (l.includes('01:A20') || l.includes('01:A21') || l.includes('01:A22') || l.includes('01:A23') || l.includes('01:A24')) {
    console.log((i+1) + ': ' + l.trim().substring(0, 115));
  }
});

console.log('\n=== BANK 30: $C503 (RESET handler, Bank 30) ===');
searchCode('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm', 'C503', 25);
