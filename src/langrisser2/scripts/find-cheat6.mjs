import { readFileSync } from 'fs';

const asm = readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');
const rom = readFileSync('src/langrisser2/20260713/Langrisser II (Japan).md');

// Strategy: Look for code that uses $FFFF8178 (button input) AND has a table
// of expected button values, or checks against a sequence counter.

// First, find all references to $FFFF8178
const refs8178 = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('FF8178') || lines[i].includes('FFFF8178')) {
    refs8178.push(i);
  }
}
console.log(`Found ${refs8178.length} references to $FFFF8178`);
// Show them with context
for (const idx of refs8178) {
  const s = Math.max(0, idx - 8);
  const e = Math.min(lines.length - 1, idx + 12);
  console.log(`\n=== Ref at line ${idx+1} ===`);
  for (let j = s; j <= e; j++) {
    console.log(`${(j+1).toString().padStart(7)}: ${lines[j].substring(0, 140)}`);
  }
}
