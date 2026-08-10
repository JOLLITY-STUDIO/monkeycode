const fs = require('fs');
const asm = fs.readFileSync('_tmp_bzk_out/bank_12.asm', 'utf-8');

// Find the command dispatch jump table
const lines = asm.split('\n');
let inJumpTable = false;
const entries = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('84C9') || line.includes('84CA')) {
        console.log(`Line ${i}: ${line}`);
        inJumpTable = true;
        continue;
    }
    if (inJumpTable) {
        // Look for .word or .addr entries
        if (line.match(/\.(word|addr|byte).*\$8[0-9A-F]{3}/)) {
            entries.push(line.trim());
        }
        if (entries.length >= 32) break;
    }
}

console.log('\nJump table entries:');
entries.forEach((e, i) => {
    const cmd = (0xE0 + i).toString(16).toUpperCase();
    console.log(`  ${cmd}: ${e}`);
});

// Also find the handler at the last entry
console.log('\nLooking for handler addresses...');
// Find handler addresses near the 0x1F entry
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Look for code near 8650-8670
    if (line.match(/86[45][0-9A-F]/)) {
        console.log(`Line ${i}: ${line}`);
    }
}
