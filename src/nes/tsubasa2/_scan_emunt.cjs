// scan emu-full frames: which nametable indices have non-zero tile data
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'output', 'emu-full');
const entries = fs.readdirSync(dir).filter(n => /^frame-\d{4}$/.test(n)).sort();
let counts = [0, 0, 0, 0];
let firstNonZero = [null, null, null, null];
let sampleFrames = [];
let lastNonZero = [null, null, null, null];
for (const e of entries) {
  const ntFile = path.join(dir, e, 'nt.json');
  if (!fs.existsSync(ntFile)) continue;
  const nt = JSON.parse(fs.readFileSync(ntFile, 'utf8'));
  for (let ni = 0; ni < 4; ni++) {
    const t = nt[ni] && nt[ni].tile;
    if (!t) continue;
    let nz = 0;
    for (let i = 0; i < t.length; i++) if (t[i] !== 0) nz++;
    if (nz > 0) {
      counts[ni]++;
      if (!firstNonZero[ni]) firstNonZero[ni] = e + ' (nz=' + nz + ')';
      lastNonZero[ni] = e + ' (nz=' + nz + ')';
    }
  }
}
console.log('frames scanned:', entries.length);
for (let ni = 0; ni < 4; ni++) {
  console.log(`NT${ni}: ${counts[ni]} frames with data; first=${firstNonZero[ni]}; last=${lastNonZero[ni]}`);
}
// find a frame with NT1 data to inspect
for (const e of entries) {
  const ntFile = path.join(dir, e, 'nt.json');
  if (!fs.existsSync(ntFile)) continue;
  const nt = JSON.parse(fs.readFileSync(ntFile, 'utf8'));
  if (nt[1] && nt[1].tile && nt[1].tile.some(v => v !== 0)) {
    console.log('sample NT1 frame:', e);
    break;
  }
}
