const fs = require('fs');

function findAndPrint(filename, addrList) {
  const lines = fs.readFileSync(filename, 'utf8').split('\n');
  addrList.forEach(addr => {
    for (let i = 0; i < lines.length; i++) {
      const match = new RegExp('0F:' + addr + ':').test(lines[i]);
      if (match && /^C/.test(lines[i])) {
        console.log('$' + addr + ' at L' + (i+1) + ':');
        const start = Math.max(0, i - 2);
        const end = Math.min(lines.length, i + 30);
        for (let j = start; j < end; j++) {
          const ln = (j+1).toString().padStart(6);
          console.log('  ' + ln + ': ' + lines[j].trim().substring(0, 100));
        }
        console.log('');
        break;
      }
    }
  });
}

// Bank 31: boot and RESET
console.log('=== BANK 31: RESET & MAIN LOOP ===');
findAndPrint('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_31.asm',
  ['E0DF', 'C503', 'CBB0', '9FF0', '9FFA', '858D', '8593']);

// Bank 02: NMI and scene controller
console.log('\n=== BANK 02: NMI HANDLER & SCENE AREA ===');
findAndPrint('d:/studio/github/monkeycode/src/nes/tsubasa/src/tsnes/_tmp_bzk_out/bank_02.asm',
  ['8017', '8003', 'A1CB', 'A200', 'A203', 'A20C', 'A20F', 'A215']);
