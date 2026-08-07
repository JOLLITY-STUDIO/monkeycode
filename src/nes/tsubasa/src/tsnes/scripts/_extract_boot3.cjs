const fs = require('fs');

function findBlock(filename, addrList, contextLines) {
  const lines = fs.readFileSync(filename, 'utf8').split('\n');
  addrList.forEach(addr => {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(':') && lines[i].includes(':' + addr + ':') && /^C/.test(lines[i])) {
        console.log('>>> $' + addr + ' at L' + (i+1) + ' <<<');
        const start = Math.max(0, i - 2);
        const end = Math.min(lines.length, i + contextLines);
        for (let j = start; j < end; j++) {
          console.log('  L' + (j+1).toString().padStart(6) + ': ' + lines[j].trim().substring(0, 110));
        }
        console.log('');
        break;
      }
    }
  });
}

// Bank 31: $E0DF main loop
console.log('=============== BANK 31: $E0DF MAIN LOOP ===============');
findBlock('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm',
  ['E0DF', 'E100'], 40);

// Bank 31: $C503 RESET handler (Bank 30)
console.log('=============== BANK 30: $C503 RESET handler ===============');
findBlock('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_30.asm',
  ['C503', 'C500', '8003', '800C', '8017', '801E'], 30);

// Bank 02: $A200 scene dispatch area
console.log('=============== BANK 02: $A000-$A210 SCENE AREA ===============');
findBlock('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm',
  ['A200', 'A203', 'A20C', 'A20F', 'A215', 'A218', 'A21B', 'A21E'], 25);

// Bank 02: $A000 data table (scene pointers)
console.log('=============== BANK 02: $A000-$A04F POINTER TABLE ===============');
findBlock('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm',
  ['A000', 'A010', 'A020', 'A030', 'A040', 'A00C', 'A00F', 'A006', 'A009'], 10);

// Bank 02: $8003/$800C entries
console.log('=============== BANK 02: $8000-$8020 ENTRIES ===============');
findBlock('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm',
  ['8003', '800C', '8017', '801E', '8026', '8030'], 20);
