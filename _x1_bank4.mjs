import { readFileSync } from 'fs';

// Read the annotated disassembly
const text = readFileSync('src/nes/tsubasa/disasm/prg_annotated.txt', 'utf8');
const lines = text.split('\n');

// Find Bank $04 lines
const bank4 = [];
let inBank = false;
for (const line of lines) {
  if (/^;\s*Bank\s*\$?04/i.test(line) || /^\$04:/.test(line) || line.includes('Bank $04')) {
    inBank = true;
  }
  if (inBank) {
    bank4.push(line);
    if (bank4.length > 2000) break;
  }
}

if (bank4.length === 0) {
  console.log("Bank $04 NOT FOUND with simple patterns. Let me search differently...");
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Bank $04') || lines[i].includes('bank 04') || lines[i].startsWith('$04:')) {
      const start = Math.max(0, i - 5);
      for (let j = start; j < Math.min(start + 1500, lines.length); j++) {
        bank4.push(lines[j]);
      }
      break;
    }
  }
}

console.log(`Total Bank $04 lines extracted: ${bank4.length}`);

// Print first 300 lines
for (let i = 0; i < Math.min(300, bank4.length); i++) {
  console.log(bank4[i].substring(0, 150));
}

// Also search for key data patterns in Bank $04
console.log("\n=== Searching for player-related data references in Bank $04 ===");
for (let i = 0; i < bank4.length; i++) {
  const l = bank4[i];
  if (l.includes('球员') || l.includes('player') || l.includes('B016') || l.includes('B02E') || l.includes('B045') || 
      l.includes('队员') || l.includes('属性') || l.includes('team')) {
    console.log(`Line ${i}: ${l.substring(0, 150)}`);
  }
}
