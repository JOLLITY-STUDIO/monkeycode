const fs = require('fs');
const path = require('path');
function grep(dir, patterns) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
  for (const f of files) {
    const txt = fs.readFileSync(path.join(dir, f), 'utf8');
    const lines = txt.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      for (const p of patterns) {
        if (line.toUpperCase().includes(p)) {
          console.log(`${f}:${i + 1}: ${line}`);
          break;
        }
      }
    }
  }
}
grep('asm/bank28', ['8C3B', '8C84', '8D58', '868E', '875D', '8A3F', '8DE2', '8E11', '8DC9', '8D9D', '86AC', '87BA', '8933', '8927', '8D41', '8D4E', '8D55']);
