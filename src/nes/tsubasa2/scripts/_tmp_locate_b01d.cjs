const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', '_tmp_bzk_out', 'bank_01');
const targets = ['00:84D8', '00:9DEE', '00:863C', '00:8611', '00:9D27', '00:9D50', '00:98EA', '00:98DF', '00:9B6F', '00:9B74', '00:9B7F', '00:97AB', '00:97B6', '00:97B8', '00:97AD', '00:9BA0', '00:98A0', '00:9D08', '00:AF67', '00:AEAC', '00:AEBE', '00:AE01', '00:A719', '00:AE77', '00:9C3A', '00:997A', '00:9CD3', '00:9CC9', '00:98E8', '00:B0A1', '00:AA7F', '00:AABF', '00:B1C9', '00:B1D3', '00:B1DE', '00:B1BB'];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/(\d\d:[0-9A-F]{4}):/);
    if (m && targets.includes(m[1])) {
      console.log(`\n=== ${f} line ${i + 1}: ${m[1]} ===`);
      for (let j = Math.max(0, i); j < Math.min(lines.length, i + 20); j++) console.log(lines[j]);
      i = Math.min(lines.length, i + 20) - 1;
    }
  }
}
