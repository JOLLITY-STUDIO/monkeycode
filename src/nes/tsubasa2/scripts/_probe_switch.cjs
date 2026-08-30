// 扫描 f130-f440 找 pre-render 行为切换点 (帧末 v=1/vt=0 vs v=0/vt=29)
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const prerender = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/scroll-prerender.json'), 'utf8'));

let prevEnd = '';
for (let f = 130; f <= 445; f++) {
  const key = String(f);
  const pr = prerender[key];
  let st = null;
  try {
    st = JSON.parse(fs.readFileSync(path.join(ROOT, 'output/emu-full/frame-' + String(f).padStart(4, '0') + '/state.json'), 'utf8'));
  } catch (e) {}
  const prTxt = pr ? `v:${pr.regV} vt:${pr.regVT} fv:${pr.regFV} fh:${pr.regFH}` : 'NONE';
  const end = st ? `${st.scrollEnd.cntV}/${st.scrollEnd.cntVT}` : '??';
  if (end !== prevEnd) {
    console.log(`== 切换到 end=${end} @ f${f}`);
    prevEnd = end;
  }
  if (f % 5 === 0 || end !== (st ? `${st.scrollEnd.cntV}/${st.scrollEnd.cntVT}` : '??') || pr && pr.regVT !== 31) {
    console.log(`f${f} PR=${prTxt} endV/VT=${end}`);
  }
}
