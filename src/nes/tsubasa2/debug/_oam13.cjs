const fs = require('fs');
const d = JSON.parse(fs.readFileSync('debug/_emu_frames.json', 'utf8'));
const f13 = d.find(f => f.frame === 13);
if (!f13) { console.log('no f13'); process.exit(0); }
const oam = f13.oam;
let visible = [];
for (let i = 0; i < 64; i++) {
  const p = oam[i].split(',');
  const y = +p[0], tile = +p[1], attr = +p[2], x = +p[3];
  if (y < 239) visible.push(i + ':[' + y + ',' + tile + ',' + attr + ',' + x + ']');
}
console.log('f13 visible(' + visible.length + '):', visible.join(' '));
const f25 = d.find(f => f.frame === 25);
if (f25) {
  const o2 = f25.oam;
  let v2 = [];
  for (let i = 0; i < 64; i++) {
    const p = o2[i].split(',');
    const y = +p[0], tile = +p[1], attr = +p[2], x = +p[3];
    if (y < 239 && y !== 0) v2.push(i + ':[' + y + ',' + tile + ',' + attr + ',' + x + ']');
  }
  console.log('f25 on-screen(y!=0)(' + v2.length + '):', v2.join(' '));
}
