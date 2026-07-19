import { readFileSync } from 'fs';

// Search disassembly for key code that handles player data
const text = readFileSync('src/nes/tsubasa/disasm/prg_annotated.txt', 'utf8');
const lines = text.split('\n');

// 1. Search for $B016 / $B02E / $B045 references  
// 2. Search for $A212 (match entry)
// 3. Search for code loading data into player stat area ($60-$6F)
// 4. Search for "球员" (player) annotations

console.log('=== Searching for B016/B02E/B045 references ===');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (l.match(/\$B016|\$B02E|\$B045/) || l.match(/B016|B02E|B045/)) {
    const start = Math.max(0, i - 2);
    const end = Math.min(lines.length, i + 3);
    for (let j = start; j < end; j++) {
      console.log(`${j}: ${lines[j].substring(0, 200)}`);
    }
    console.log('---');
    if (i > 5000) break; // enough
  }
}

console.log('\n\n=== Searching for $A212 (match entry) ===');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('$A212') || lines[i].includes('A212')) {
    const start = Math.max(0, i - 2);
    const end = Math.min(lines.length, i + 3);
    console.log(`\n[${i}]:`);
    for (let j = start; j < end; j++) {
      console.log(`  ${lines[j].substring(0, 200)}`);
    }
  }
}

console.log('\n\n=== Searching for A64C (match init) ===');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('$A64C') || lines[i].includes('A64C')) {
    const start = Math.max(0, i - 2);
    const end = Math.min(lines.length, i + 5);
    console.log(`\n[${i}]:`);
    for (let j = start; j < end; j++) {
      console.log(`  ${lines[j].substring(0, 200)}`);
    }
  }
}

console.log('\n\n=== Searching for BANK 02 / Bank $02 area near $A212 ===');
let foundBank2 = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('Bank $02') || lines[i].includes('bank 02') || lines[i].match(/^Bank \$02/)) {
    foundBank2 = true;
    console.log(`\n[${i}]: ${lines[i].substring(0, 200)}`);
    // Print surrounding context
    for (let j = i + 1; j < Math.min(lines.length, i + 200); j++) {
      const l = lines[j];
      if (l.includes('Bank $03') || l.includes('bank 03') || l.includes('$03:')) break;
      // Look for player-related data
      if (l.includes('$60') || l.includes('$61') || l.includes('$5E') || 
          l.includes('$62') || l.includes('$63') || l.includes('$64') ||
          l.includes('$65') || l.includes('$66') || l.includes('$67') ||
          l.includes('$68') || l.includes('player') || l.includes('球员') ||
          l.includes('JSR') || l.includes('JMP') || l.includes('LDY') || l.includes('LDX') ||
          l.includes('$A212') || l.includes('$A64C')) {
        console.log(`  [${j}]: ${l.substring(0, 200)}`);
      }
    }
    break;
  }
}
