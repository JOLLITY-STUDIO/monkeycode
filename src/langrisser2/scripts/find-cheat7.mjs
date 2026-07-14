import { readFileSync } from 'fs';

const asm = readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

// Find ALL uses of $FFFFD1BE
let found = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('D1BE')) {
    found.push({line: i+1, text: lines[i].trimStart()});
  }
}

console.log(`Total D1BE references: ${found.length}`);
found.forEach(f => console.log(`${f.line.toString().padStart(7)}: ${f.text.substring(0, 130)}`));
