const fs = require('fs');
const path = require('path');
const out = 'output/ppu-trace';
if (!fs.existsSync(out)) { console.log('NO_OUT'); process.exit(0); }
const items = fs.readdirSync(out).filter(x => x.endsWith('.png') || x.endsWith('.json'));
console.log('All files:', items.length);
// Latest snapshots dir
const subdirs = fs.readdirSync(out).filter(x => !x.includes('.')).sort();
console.log('Frame dirs (latest 5):', subdirs.slice(-5).join(', '));
// Read snapshots.json
const snap = path.join(out, 'snapshots.json');
if (fs.existsSync(snap)) {
  const d = JSON.parse(fs.readFileSync(snap, 'utf8'));
  console.log('Snapshots:', d.length, 'samples:');
  for (const s of d.slice(0, 3)) {
    console.log('  frame', s.frame, 'scene', s.scene);
  }
  const last = d[d.length - 1];
  if (last) console.log('  Last:', JSON.stringify(last).substring(0, 300));
}
