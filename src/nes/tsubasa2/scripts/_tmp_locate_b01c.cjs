const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', '_tmp_bzk_out', 'bank_01');
const targets = ['00:8231', '00:8402', '00:8438', '00:8474', '00:84D8', '00:84EB', '00:864C', '00:86D2', '00:88CA', '00:90C0', '00:9DEE'];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.asm')).sort();
for (const f of files) {
  const lines = fs.readFileSync(path.join(dir, f), 'utf8').split(/\r?\n/);
  let blockLines = [];
  let blockTarget = null;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/(\d\d:[0-9A-F]{4}):/);
    if (m && targets.includes(m[1])) {
      blockTarget = m[1];
      blockLines = [];
      console.log(`\n=== ${f} line ${i + 1}: ${m[1]} ===`);
    }
    if (blockTarget) {
      blockLines.push(lines[i]);
      if (lines[i].includes('RTS') || lines[i].includes('JMP') || lines[i].includes('.byte') && blockLines.length > 60) {
        // flush when a decent chunk gathered
      }
      if (lines[i].includes('RTS') && !lines[i].includes('JSR')) {
        blockLines.forEach(l => console.log(l));
        blockTarget = null;
      }
    }
  }
}
