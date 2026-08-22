const fs = require('fs');
const p = 'docs/trace/Captain Tsubasa II - Super Striker (Japan)-openning4.log';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(l => l.trim().length > 0);
const frames = new Map();
let cur = null;
for (const l of lines) {
  const mf = l.match(/^f(\d+)/);
  if (mf) {
    cur = parseInt(mf[1], 10);
    if (!frames.has(cur)) frames.set(cur, []);
  }
  if (cur !== null) frames.get(cur).push(l.trim());
}
// frame sequence around 300
const seq = [...frames.keys()].sort((a, b) => a - b);
console.log('FRAMES around 300:', seq.filter(f => f >= 280 && f <= 330).join(','));
// scene-change watch: writes to $00ED (scene idx), $2005/$2006 scroll & vram addr, $4014 (OAM DMA), $2000
const watch = ['STA $00ED', 'STA $2000', 'STA $2005', 'STA $2006', 'STA $4014', 'STA $8000'];
console.log('\n=== SCENE/PPU/OAM WATCH (f280-f340) ===');
for (const f of seq) {
  if (f < 280 || f > 340) continue;
  const arr = frames.get(f);
  for (const l of arr) {
    const ll = l.replace(/^f\d+\s+/, '');
    if (watch.some(w => ll.includes(w))) {
      console.log('f' + f + ': ' + ll);
    }
  }
}
// what bank0 coroutine-related addresses appear in f300-f310?
console.log('\n=== BANK0 CODE ADDRS in f295-f320 (unique PCs) ===');
const pcSet = new Set();
for (const f of seq) {
  if (f < 295 || f > 320) continue;
  for (const l of frames.get(f)) {
    const m = l.match(/\$00:([0-9A-F]{4}):/);
    if (m) pcSet.add(m[1]);
  }
}
console.log([...pcSet].sort().join(' '));
