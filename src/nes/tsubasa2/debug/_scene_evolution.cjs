// temp: read emu-reference state.json scene evolution
const fs = require('fs');
const path = require('path');
const d = 'output/emu-reference';
const dirs = fs.readdirSync(d).filter(x => x.startsWith('frame-'))
  .sort((a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]));
let prev = null;
for (const f of dirs) {
  const p = path.join(d, f, 'state.json');
  if (!fs.existsSync(p)) continue;
  try {
    const s = JSON.parse(fs.readFileSync(p));
    const rec = {
      sceneId: s.sceneId,
      pc: '0x' + ((s.pc || 0) & 0xffff).toString(16),
      ram001B: s.ram001B,
      nTbl: s.nTblAddress,
      ram0628: s.ram0628,
    };
    if (JSON.stringify(rec) !== JSON.stringify(prev)) {
      console.log(f.padEnd(12), JSON.stringify(rec));
      prev = rec;
    }
  } catch (e) { /* skip */ }
}
