const fs = require('fs');

// Read the NES ROM
const rom = fs.readFileSync('_pynasm_tool/nesrc/tsubasa2/tsubasa2.nes');
const prgStart = 0x10; // 16-byte header

// bank_00: CPU $8000-$BFFF, PRG offset 0x0010
// bank_02: CPU $8000-$BFFF, PRG offset 0x8010 (two 16KB banks after)
// Actually MMC3: bank regs. Let me figure out the actual PRG layout.
// The banks in _tmp_bzk_out are numbered by 8KB chunks for bank switching.

// Let me first check the file size to determine PRG-ROM layout
const prgSize = rom.length - 16;
console.log('PRG-ROM size:', prgSize, 'bytes');

// Let me read bank_00.asm to find where $88D2 is
const asm0 = fs.readFileSync('_tmp_bzk_out/bank_00.asm', 'utf8');
const lines0 = asm0.split('\n');

let found88D2 = false;
for (let i = 0; i < lines0.length; i++) {
    if (lines0[i].includes('$88D2:') || lines0[i].includes(' 88D2:')) {
        console.log('\nFound $88D2 at line', i);
        for (let j = i; j < Math.min(i + 40, lines0.length); j++) {
            console.log(lines0[j]);
        }
        found88D2 = true;
        break;
    }
}
if (!found88D2) console.log('$88D2 not found in bank_00.asm');

// bank_01
const asm1 = fs.readFileSync('_tmp_bzk_out/bank_01.asm', 'utf8');
const lines1 = asm1.split('\n');

let foundACA2 = false;
for (let i = 0; i < lines1.length; i++) {
    if (lines1[i].includes('$ACA2:') || lines1[i].includes(' ACA2:')) {
        console.log('\nFound $ACA2 at line', i);
        for (let j = i; j < Math.min(i + 40, lines1.length); j++) {
            console.log(lines1[j]);
        }
        foundACA2 = true;
        break;
    }
}
if (!foundACA2) console.log('$ACA2 not found in bank_01.asm');

// Also look for the raw data by searching the code near the LDA
// The LDA at bank_00:8736 references $88D2 - let me see what data is there
console.log('\n\n=== Searching for data referenced by $88D2 ===');
let idx0 = lines0.findIndex(l => l.includes('$88D2'));
if (idx0 >= 0) console.log('Context around LDA $88D2:\n' + lines0.slice(Math.max(0, idx0 - 3), idx0 + 5).join('\n'));

const asm2 = fs.readFileSync('_tmp_bzk_out/bank_02.asm', 'utf8');
const lines2 = asm2.split('\n');
let found8A47 = false;
for (let i = 0; i < lines2.length; i++) {
    if (lines2[i].includes('$8A47:') || lines2[i].includes(' 8A47:')) {
        console.log('\nFound $8A47 at line', i);
        for (let j = i; j < Math.min(i + 40, lines2.length); j++) {
            console.log(lines2[j]);
        }
        found8A47 = true;
        break;
    }
}
if (!found8A47) {
    // Try to find data near AA47
    for (let i = 0; i < lines2.length; i++) {
        if (lines2[i].includes('$AA47:')) {
            console.log('\nFound $AA47 at line', i);
            for (let j = i; j < Math.min(i + 40, lines2.length); j++) {
                console.log(lines2[j]);
            }
            found8A47 = true;
            break;
        }
    }
}
if (!found8A47) console.log('Neither $8A47 nor $AA47 found in bank_02.asm');
