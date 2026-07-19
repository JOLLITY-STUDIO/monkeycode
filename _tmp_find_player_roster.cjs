const fs = require('fs');
const rom = fs.readFileSync('_pynasm_tool/nesrc/tsubasa2/tsubasa2.nes');

// $88D2 is CODE, not data. Need to trace properly.
// Let me look at the full loop at bank_00::$8734:
// $8734: LDY #$FC
// $8736: LDA $88D2,Y   ; abs indexed: $88D2 + Y
// $8739: STA $0468,Y
// $873C: INY
// $873D: BNE $8736     ; loop until Y wraps (only 4 bytes: Y=$FC,$FD,$FE,$FF)

// So this is NOT loading 11 players, just 4 bytes from $89CE-$89D1
// This is likely a single field update, not roster init.

// Bank 01::$8761 similarly: LDY #$FC; LDA $ACA2,Y; STA $0468,Y
// Only copies 4 bytes from $ACA2+$FC = $AD9E to $AD9F... etc.

// Now let me search ALL banks for where full $0468 area gets populated
// Search for sequences that write to $0468-$0493 (11 players * 4 bytes = 44 bytes)
console.log('=== Searching for full $0468 area writes in bank_02.asm ===');
const asm2 = fs.readFileSync('_tmp_bzk_out/bank_02.asm', 'utf8');
const lines2 = asm2.split('\n');

// Search for any loops that write multiple entries to $0468 area
for (let i = 0; i < lines2.length; i++) {
    const l = lines2[i];
    if (l.includes('$0468') && !l.startsWith('0x0047')) {
        // Show context
        const start = Math.max(0, i - 5);
        const end = Math.min(lines2.length, i + 10);
        const ctx = lines2.slice(start, end).join('\n');
        // Only print if it looks like it's loading from a ROM source (has LDA with long addr)
        if (ctx.includes('LDA') && ctx.includes('STA') && !ctx.includes('$0468') > 2) continue;
        console.log(`\n--- line ${i} ---`);
        console.log(ctx);
    }
}

// Let me also search bank_00.asm for roster-related initialization
console.log('\n\n=== Searching bank_00.asm for $0468 writes in loops ===');
const asm0 = fs.readFileSync('_tmp_bzk_out/bank_00.asm', 'utf8');
const lines0 = asm0.split('\n');

for (let i = 0; i < lines0.length; i++) {
    const l = lines0[i];
    if (l.includes('$0468') || l.includes('$0469') || l.includes('$046A') || l.includes('$046B')) {
        const start = Math.max(0, i - 3);
        const end = Math.min(lines0.length, i + 5);
        const ctx = lines0.slice(start, end).join('\n');
        console.log(`\nline ${i}: ${l.trim()}`);
    }
}
