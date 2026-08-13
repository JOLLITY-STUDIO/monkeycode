const fs = require('fs');
const lines = fs.readFileSync('src/cpu.ts', 'utf-8').split('\n');
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // reads of REG_PC_NEW (not assignments)
  if (l.includes('REG_PC_NEW') && !l.includes('this.REG_PC_NEW =') && !l.includes('REG_PC_NEW:')) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
}
