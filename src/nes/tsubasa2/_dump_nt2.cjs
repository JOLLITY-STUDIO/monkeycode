// dump non-empty NT rows for a given frame
const fs = require('fs');
const f = process.argv[2] || '3780';
const p = `output/emu-full/frame-${f}/nt.json`;
const nt = JSON.parse(fs.readFileSync(p, 'utf8'));
for (let i = 0; i < 4; i++) {
  const rows = [];
  for (let r = 0; r < 30; r++) {
    const tiles = [];
    for (let c = 0; c < 32; c++) tiles.push(nt[i].tile[r * 32 + c]);
    if (tiles.some(t => t !== 0)) {
      rows.push(`  r${String(r).padStart(2,'0')} ` + tiles.map(t => t === 0 ? '..' : t.toString(16).padStart(2,'0')).join(' '));
    }
  }
  if (rows.length) {
    console.log(`=== NT${i} (${rows.length} non-empty rows) ===`);
    console.log(rows.join('\n'));
  }
}
