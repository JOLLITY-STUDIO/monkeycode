// compare emu nt[0] vs nt[1] vs nt[2] vs nt[3] at several frames
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'output', 'emu-full');
function diffCount(a, b) {
  let n = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) n++;
  return n;
}
for (const f of [10, 100, 347, 800, 1500, 2000, 2500, 3000, 3600, 3800, 4000]) {
  const file = path.join(dir, 'frame-' + String(f).padStart(4, '0'), 'nt.json');
  if (!fs.existsSync(file)) continue;
  const nt = JSON.parse(fs.readFileSync(file, 'utf8'));
  const d01 = diffCount(nt[0].tile, nt[1].tile);
  const d23 = diffCount(nt[2].tile, nt[3].tile);
  const d02 = diffCount(nt[0].tile, nt[2].tile);
  const d03 = diffCount(nt[0].tile, nt[3].tile);
  console.log(`f${f}: nt0vs1=${d01} nt2vs3=${d23} nt0vs2=${d02} nt0vs3=${d03} | scroll=${JSON.stringify({ cntV: nt[0] ? '?' : '' })}`);
  // state scroll
  const stFile = path.join(dir, 'frame-' + String(f).padStart(4, '0'), 'state.json');
  if (fs.existsSync(stFile)) {
    const st = JSON.parse(fs.readFileSync(stFile, 'utf8'));
    console.log(`   state scroll: regV=${st.scroll.regV} regH=${st.scroll.regH} cntV=${st.scroll.cntV} cntH=${st.scroll.cntH} cntVT=${st.scroll.cntVT} cntHT=${st.scroll.cntHT}`);
  }
}
