// 探测 f440-f470: prerender / mid-frame scan / state.scrollEnd 三者对照
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const prerender = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/scroll-prerender.json'), 'utf8'));
const scan = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/scroll-scan.json'), 'utf8'));

for (let f = 440; f <= 470; f++) {
  const key = String(f);
  const pr = prerender[key];
  const sc = scan[key] || null;
  let st = null;
  try {
    st = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/frame-' + String(f).padStart(4, '0') + '/state.json'), 'utf8'));
  } catch (e) {}
  const prTxt = pr ? `vt:${pr.regVT} fv:${pr.regFV} fh:${pr.regFH} v:${pr.regV} h:${pr.regH}` : 'NONE';
  const end = st ? `endV:${st.scrollEnd.cntV} endVT:${st.scrollEnd.cntVT} endFV:${st.scrollEnd.regFV}` : '';
  let scTxt = 'NO-SCAN';
  if (sc) {
    const arr = Array.isArray(sc) ? sc : [sc];
    scTxt = arr.map((o) => `s:${o.s} v:${o.v} vt:${o.vt} fv:${o.fv} h:${o.h} ht:${o.ht} fh:${o.fh}`).join(' | ');
  }
  console.log(`f${f} PR=${prTxt} | SCAN[${scTxt}] | ${end}`);
}
