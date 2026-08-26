// dump f340-f820 的 scroll 序列, 找 NT1 显示期的非零 scroll
const fs = require('fs');
const path = require('path');
const IN = path.join(__dirname, '..', 'output', 'emu-full');
const interesting = [];
let lastKey = '';
for (let f = 340; f <= 820; f++) {
  const dir = path.join(IN, 'frame-' + String(f).padStart(4, '0'));
  const st = JSON.parse(fs.readFileSync(path.join(dir, 'state.json'), 'utf8'));
  const s = st.scroll;
  const key = [s.regV, s.regH, s.regVT, s.regHT, s.regFV, s.regFH].join(',');
  if (key !== lastKey) {
    interesting.push('f' + f + ' regV=' + s.regV + ' regH=' + s.regH + ' vt=' + s.regVT + ' ht=' + s.regHT + ' fv=' + s.regFV + ' fh=' + s.regFH + ' cntV=' + st.scroll.cntV + ' cntH=' + st.scroll.cntH + ' cntVT=' + st.scroll.cntVT + ' cntHT=' + st.scroll.cntHT);
    lastKey = key;
  }
}
console.log('scroll changes f340-f820 (' + interesting.length + '):');
console.log(interesting.join('\n'));
