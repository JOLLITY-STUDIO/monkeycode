import fs from 'fs';

const asm = fs.readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

// Find title screen entry point
console.log('=== Title screen entry (loc_00C914) ===');
let titleIdx = -1;
lines.forEach((l, i) => {
  if (l.includes('loc_00C914') || l.includes('loc_00c914')) {
    titleIdx = i;
    console.log(`L${i+1}: ${l}`);
  }
});

// Read title screen code
if (titleIdx >= 0) {
  console.log('\n=== Title screen code (loc_00C914 area) ===');
  for (let i = titleIdx; i < Math.min(titleIdx + 200, lines.length); i++) {
    const l = lines[i];
    // Show jsr/bsr calls (subroutine calls)
    if (/\b(jsr|bsr|jmp|bra)\b/.test(l)) {
      console.log(`L${i+1}: ${l.trim().substring(0, 150)}`);
    }
  }
}

// Search for controller input reads in title screen area ($C900-$D000)
console.log('\n=== Controller reads near title screen ===');
for (let i = titleIdx; i < Math.min(titleIdx + 500, lines.length); i++) {
  const l = lines[i];
  if (/move\.w.*\(\$(?:A1000[0-9A-Fa-f]{2}|A1000[0-9A-Fa-f]{2})/.test(l) ||
      /\$A1000[0-9A-Fa-f]/.test(l) ||
      /START|start/.test(l) && /btst|andi|move/.test(l)) {
    console.log(`L${i+1}: ${l.trim().substring(0, 150)}`);
  }
}
