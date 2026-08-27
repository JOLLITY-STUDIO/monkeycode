// dump NT tile indices for a given emu-full frame
const fs = require('fs');
const f = process.argv[2] || '3780';
const p = `output/emu-full/frame-${f}/nt.json`;
const nt = JSON.parse(fs.readFileSync(p, 'utf8'));
for (let i = 0; i < 4; i++) {
  console.log('=== NT' + i + ' ===');
  for (let r = 0; r < 30; r++) {
    let line = `r${String(r).padStart(2,'0')} `;
    for (let c = 0; c < 32; c++) {
      const t = nt[i].tile[r * 32 + c];
      line += (t === 0 ? '..' : t.toString(16).padStart(2,'0')) + ' ';
    }
    console.log(line);
  }
}
