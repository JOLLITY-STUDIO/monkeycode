const fs = require('fs');
const rom = fs.readFileSync('_pynasm_tool/nesrc/tsubasa2/tsubasa2.nes');

for (let b = 3; b <= 7; b++) {
    const off = 0x10 + b * 0x2000;
    console.log('=== Bank ' + b + ' (file 0x' + off.toString(16) + ') ===');
    let s = '';
    for (let i = 0; i < 64; i++) {
        s += rom[off + i].toString(16).padStart(2, '0').toUpperCase() + ' ';
    }
    console.log(s);
    console.log('');
}

// Also check bank 12 (code/data bank)
console.log('=== Bank 12 (file 0x' + (0x10 + 12 * 0x2000).toString(16) + ') ===');
const off12 = 0x10 + 12 * 0x2000;
let s12 = '';
for (let i = 0; i < 64; i++) {
    s12 += rom[off12 + i].toString(16).padStart(2, '0').toUpperCase() + ' ';
}
console.log(s12);

// Search for the opponent roster pattern in all data banks
const searchPattern = Buffer.from([0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x01, 0x0B]);
console.log('\n=== Searching for opponent roster pattern [02 03 04 05 06 07 08 09 0A 01 0B] in all banks ===');
for (let b = 0; b < 32; b++) {
    const off = 0x10 + b * 0x2000;
    for (let i = 0; i < 0x2000 - 11; i++) {
        let match = true;
        for (let j = 0; j < 11; j++) {
            if (rom[off + i + j] !== searchPattern[j]) { match = false; break; }
        }
        if (match) {
            const cpu = 0x8000 + i;
            console.log('Match in bank ' + b + ' CPU=$' + cpu.toString(16).toUpperCase() + ' file=0x' + (off + i).toString(16).toUpperCase());
        }
    }
}
