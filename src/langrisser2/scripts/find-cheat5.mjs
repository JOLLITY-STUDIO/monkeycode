import { readFileSync } from 'fs';

const lines = readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8').split('\n');

// Find code that references $FFFFD1BE and has comparisons (state machine pattern)
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.includes('D1BE') && (l.includes('cmp') || l.includes('subq') || l.includes('addq'))) {
    const s = Math.max(0, i - 5);
    const e = Math.min(lines.length - 1, i + 5);
    console.log(`\n--- Line ${i+1} ---`);
    for (let j = s; j <= e; j++) {
      console.log(`${(j+1).toString().padStart(7)}: ${lines[j].substring(0, 140)}`);
    }
  }
}
