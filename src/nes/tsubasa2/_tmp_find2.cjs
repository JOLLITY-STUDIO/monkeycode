// Search bank_02 asm for key data regions
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '_tmp_bzk_out', 'bank_02');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();

const patterns = ['6C 00 04 FC', 'B9 77 A6', 'B9 7B A6', 'D9 1F AB', '79 21 AB', '79 22 AB'];

for (const file of files) {
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const p of patterns) {
      if (line.includes(p)) {
        const ctx = lines.slice(Math.max(0, i - 3), i + 4).join('\n');
        console.log(`=== ${file}:L${i + 1} pattern[${p}] ===\n${ctx}\n`);
      }
    }
  }
}

// Also dump all `.byte` data lines between local 0x8670 and 0x8780, and around 0x8A00-0x8C00
console.log('===== data lines 0x8670-0x8780 =====');
for (const file of files) {
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/0x[0-9A-F]{4,6} 01:8([0-9A-F]{3}):\s+((?:[0-9A-F]{2}\s)+)/);
    if (m) {
      const addr = parseInt(m[1], 16);
      if ((addr >= 0x670 && addr <= 0x780) || (addr >= 0xA00 && addr <= 0xC00)) {
        console.log(`${file}:L${i + 1}: ${lines[i].trim()}`);
      }
    }
  }
}
