const fs = require('fs');
const path = require('path');
const dir = 'src/asm/bank00';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.s'));
const want = [0x8976, 0x88CA, 0xA82F, 0x9A35];
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = /;\s*\$([0-9A-Fa-f]{4})/.exec(lines[i]);
    if (m) {
      const a = parseInt(m[1], 16);
      if (want.includes(a)) {
        console.log(`=== ${f} line ${i + 1}: $${a.toString(16)} ===`);
        for (let j = Math.max(0, i); j < Math.min(lines.length, i + 60); j++) {
          console.log(lines[j]);
        }
        console.log('---');
      }
    }
  }
}
