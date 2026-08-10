import b from './rom-data/prg-bank-30';

function hex(v: number) { return v.toString(16).toUpperCase().padStart(2, '0'); }

// Dump context around key MMC3 STA $8001 offsets
const keyOffsets = [
  0x432, 0x437,  // LDA #$02 -> STA $8001
  0x48E,          // LDA #$02 -> STA $8001
  0x8A2,          // LDA #$00 -> STA $8001
  0x8D8,          // LDA #$0c -> STA $8001 (bank 12)
];

for (const offset of keyOffsets) {
  console.log(`\n=== $C${offset.toString(16).toUpperCase()} (offset=$${offset.toString(16)}) ===`);
  // Show 16 bytes around
  for (let i = Math.max(0, offset - 8); i <= Math.min(b.length - 1, offset + 8); i++) {
    const marker = i === offset ? '>' : ' ';
    const pc = '$' + (0xC000 + i).toString(16).toUpperCase();
    if (i === offset + 1 && b[offset] === 0x8D) {
      // This is the addr lo byte
      console.log(`${marker}${pc}: ${hex(b[i])}  (STA addr lo)`);
    } else if (i === offset + 2 && b[offset] === 0x8D) {
      console.log(`${marker}${pc}: ${hex(b[i])}  (STA addr hi)`);
    } else if (i === offset - 1 && (b[i] === 0xA9 || b[i] === 0xA2 || b[i] === 0xA0)) {
      console.log(`${marker}${pc}: L${String.fromCharCode(0x44+b[i]-0xA0)} #$${hex(b[offset+1])}`);
    } else {
      console.log(`${marker}${pc}: ${hex(b[i])}`);
    }
  }
}

// Also show what happens around $C432-$C46A (first cluster)
console.log('\n=== $C430-$C470 full dump ===');
for (let i = 0x430; i <= 0x470; i++) {
  const pc = '$' + (0xC000 + i).toString(16).toUpperCase();
  console.log(`${pc}: ${hex(b[i])}`);
}
