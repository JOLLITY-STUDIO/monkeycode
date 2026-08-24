// _oam_diff.cjs - 量化 H5 vs emu OAM 在每一条 sprite 上的差异
const fs = require('fs');
const path = require('path');

const FRAMES = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
const EMU = path.join(__dirname, '..', 'output', 'emu-reference');
const H5  = path.join(__dirname, '..', 'output', 'ppu-trace');

for (const f of FRAMES) {
  const emuDir = path.join(EMU, `frame-${String(f).padStart(3, '0')}`);
  const h5Dir  = path.join(H5,  `frame-${String(f).padStart(3, '0')}`);
  if (!fs.existsSync(emuDir) || !fs.existsSync(h5Dir)) continue;

  const emu = JSON.parse(fs.readFileSync(path.join(emuDir, 'oam.json')));
  const h5  = JSON.parse(fs.readFileSync(path.join(h5Dir,  'oam.json')));

  let same4B = 0, sameY = 0, sameTile = 0, sameAttr = 0, sameX = 0;
  let emuActive = 0, h5Active = 0;
  const diffs = [];
  for (let i = 0; i < 64; i++) {
    const e = emu[i], h = h5[i];
    if (!e || !h) continue;
    const eActive = (e.y || e.tile || e.attr || e.x);
    const hActive = (h.y || h.tile || h.attr || h.x);
    if (eActive) emuActive++;
    if (hActive) h5Active++;
    if (e.y === h.y && e.tile === h.tile && e.attr === h.attr && e.x === h.x) same4B++;
    if (e.y === h.y) sameY++;
    if (e.tile === h.tile) sameTile++;
    if (e.attr === h.attr) sameAttr++;
    if (e.x === h.x) sameX++;
    if (eActive && !hActive) diffs.push({ i, kind: 'h5-missing', emu: e });
    else if (!eActive && hActive) diffs.push({ i, kind: 'h5-extra',  h5: h });
    else if (e.tile !== h.tile || e.x !== h.x) diffs.push({ i, kind: 'mismatch', emu: e, h5: h });
  }
  console.log(`── frame ${f}  ─ emu-active=${emuActive}  h5-active=${h5Active}  same(4B)=${same4B}/64  sameY=${sameY} sameTile=${sameTile} sameAttr=${sameAttr} sameX=${sameX}`);
  if (diffs.length && f === 30) {
    console.log(`   diffs at frame 30 (first 25):`);
    diffs.slice(0, 25).forEach(d => {
      if (d.kind === 'h5-missing') console.log(`     i=${String(d.i).padStart(2)}  EMU active, H5 zero  emu={y=${d.emu.y},t=${d.emu.tile},a=${d.emu.attr},x=${d.emu.x}}`);
      else if (d.kind === 'h5-extra') console.log(`     i=${String(d.i).padStart(2)}  H5 active, EMU zero  h5={y=${d.h5.y},t=${d.h5.tile},a=${d.h5.attr},x=${d.h5.x}}`);
      else console.log(`     i=${String(d.i).padStart(2)}  MISMATCH  emu={y=${d.emu.y},t=${d.emu.tile},a=${d.emu.attr},x=${d.emu.x}} h5={y=${d.h5.y},t=${d.h5.tile},a=${d.h5.attr},x=${d.h5.x}}`);
    });
  }
}
