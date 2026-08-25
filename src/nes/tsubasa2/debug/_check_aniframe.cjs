const fs = require('fs');
for (const f of [5, 13, 30, 60, 120, 300]) {
  const d = 'output/emu-reference/frame-' + String(f).padStart(3, '0');
  const p = JSON.parse(fs.readFileSync(d + '/palette.json', 'utf8'));
  const nt = JSON.parse(fs.readFileSync(d + '/nt.json', 'utf8'));
  let ntCnt = 0;
  for (const k in nt) { if (nt[k].tile !== 0) ntCnt++; }
  const oam = JSON.parse(fs.readFileSync(d + '/oam.json', 'utf8'));
  let oamCnt = 0;
  for (const s of oam) { if (s && s.y < 240) oamCnt++; }
  console.log('f' + f, 'bgpal=' + JSON.stringify((p.bg || []).slice(0, 8)),
    'sprpal=' + JSON.stringify((p.sp || []).slice(0, 8)),
    'ntTiles=' + ntCnt, 'oamVisible=' + oamCnt);
}
