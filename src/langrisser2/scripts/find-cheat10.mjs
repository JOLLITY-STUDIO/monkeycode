import { readFileSync } from 'fs';

const asm = readFileSync('src/langrisser2/20260713/asm/m68k/rom.asm', 'utf8');
const lines = asm.split('\n');

// Find ALL lines referencing key RAM addresses
const targets = ['FFFFAA11', 'FFFF81A7', 'FFFFA4A9', 'FFFF8178'];
const foundMap = {};

for (const target of targets) {
  foundMap[target] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(target)) {
      foundMap[target].push({ line: i + 1, text: lines[i].trimStart().substring(0, 140) });
    }
  }
}

for (const [target, found] of Object.entries(foundMap)) {
  console.log(`\n=== ${target}: ${found.length} references ===`);
  found.forEach(f => console.log(`  ${f.line.toString().padStart(7)}: ${f.text}`));
}
